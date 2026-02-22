/**
 * app.js — The Eternal Gallery (FIXED)
 * Fetches random paintings from Wikimedia Commons via their public API.
 * No API key needed; uses CORS-enabled origin=* parameter.
 */

const API = 'https://commons.wikimedia.org/w/api.php';

// ── State ──────────────────────────────────────────────────────────────────
let currentCategory = 'all';
let isLoading = false;

// ── DOM refs ───────────────────────────────────────────────────────────────
const randomBtn        = document.getElementById('randomBtn');
const paintingImg      = document.getElementById('paintingImg');
const loadingState     = document.getElementById('loadingState');
const descPlaceholder  = document.getElementById('descPlaceholder');
const descContent      = document.getElementById('descContent');
const sourceLink       = document.getElementById('sourceLink');

const descTitle         = document.getElementById('descTitle');
const descArtist        = document.getElementById('descArtist');
const descDate          = document.getElementById('descDate');
const descDescription   = document.getElementById('descDescription');
const descFilename      = document.getElementById('descFilename');
const descCategoryBadge = document.getElementById('descCategoryBadge');
const metaMedium        = document.getElementById('metaMedium');
const metaMediumVal     = document.getElementById('metaMediumVal');
const metaDimensions    = document.getElementById('metaDimensions');
const metaDimensionsVal = document.getElementById('metaDimensionsVal');
const metaInstitution   = document.getElementById('metaInstitution');
const metaInstitutionVal= document.getElementById('metaInstitutionVal');
const metaCategoryVal   = document.getElementById('metaCategoryVal');

// ── Helpers ────────────────────────────────────────────────────────────────
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function stripHtml(html) {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim();
}

/** Only JPG/PNG — browsers can't render TIF/TIFF; SVG/PDF/OGG are not paintings */
function isPaintingFile(title) {
  return /\.(jpg|jpeg|png)$/i.test(title);
}

// ── Loading / Error UI ─────────────────────────────────────────────────────

function showLoading() {
  paintingImg.classList.add('hidden');
  paintingImg.classList.remove('fade-in', 'loaded');
  // Always restore the spinner HTML (a previous error might have replaced it)
  loadingState.innerHTML = `
    <div class="loader-ring"></div>
    <p>Summoning from the archives…</p>
  `;
  loadingState.classList.remove('hidden');
}

function hideLoading() {
  loadingState.classList.add('hidden');
}

function showError(msg) {
  loadingState.innerHTML = `<p class="error-state">⚠ ${msg}</p>`;
  loadingState.classList.remove('hidden');
  paintingImg.classList.add('hidden');
}

function resetState() {
  isLoading = false;
  randomBtn.disabled = false;
}

// ── API calls ──────────────────────────────────────────────────────────────

/**
 * Fetch file members from a Commons category.
 * Randomises the starting sort-key prefix so we don't always get the same batch.
 */
async function fetchCategoryMembers(categoryTitle) {
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

  const params = new URLSearchParams({
    action:               'query',
    list:                 'categorymembers',
    cmtitle:              categoryTitle,
    cmtype:               'file',
    cmlimit:              '100',
    cmstartsortkeyprefix: randomLetter,
    format:               'json',
    origin:               '*'
  });

  try {
    const res     = await fetch(`${API}?${params}`);
    const data    = await res.json();
    let   members = data?.query?.categorymembers || [];

    // If that random letter returned nothing, fall back without the prefix
    if (members.length === 0) {
      const fallback = new URLSearchParams({
        action:  'query',
        list:    'categorymembers',
        cmtitle: categoryTitle,
        cmtype:  'file',
        cmlimit: '100',
        format:  'json',
        origin:  '*'
      });
      const res2  = await fetch(`${API}?${fallback}`);
      const data2 = await res2.json();
      members = data2?.query?.categorymembers || [];
    }

    return members;
  } catch (e) {
    console.warn('fetchCategoryMembers failed for', categoryTitle, e);
    return [];
  }
}

/**
 * Fetch image URL + metadata for a given file title.
 */
async function fetchImageInfo(fileTitle) {
  const params = new URLSearchParams({
    action:     'query',
    titles:     fileTitle,
    prop:       'imageinfo',
    iiprop:     'url|extmetadata|size',
    iiurlwidth: '1200',
    format:     'json',
    origin:     '*'
  });

  try {
    const res   = await fetch(`${API}?${params}`);
    const data  = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;
    const page = Object.values(pages)[0];
    return page?.imageinfo?.[0] || null;
  } catch (e) {
    console.warn('fetchImageInfo failed for', fileTitle, e);
    return null;
  }
}

/**
 * Returns a promise: true if the image loads, false on error or timeout.
 * Prevents broken images from appearing in the frame.
 */
function testImageLoad(url) {
  return new Promise(resolve => {
    const img   = new Image();
    img.onload  = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src     = url;
    setTimeout(() => resolve(false), 12000);
  });
}

// ── Main fetch flow ────────────────────────────────────────────────────────

async function loadRandomPainting() {
  if (isLoading) return;
  isLoading = true;
  randomBtn.disabled = true;

  showLoading();

  try {
    const pool    = CATEGORIES[currentCategory];
    let   success = false;

    for (let attempt = 0; attempt < 6; attempt++) {
      const entry   = pickRandom(pool);
      let   members = await fetchCategoryMembers(entry.category);
      members = members.filter(m => isPaintingFile(m.title));

      if (!members.length) continue;

      const file = pickRandom(members);
      const info = await fetchImageInfo(file.title);
      if (!info) continue;

      const imgUrl = info.thumburl || info.url;
      if (!imgUrl) continue;

      const loaded = await testImageLoad(imgUrl);
      if (!loaded) continue;

      displayPainting(file.title, info, entry, imgUrl);
      success = true;
      break;
    }

    if (!success) {
      showError("Couldn't load a painting right now. Please try again.");
    }

  } catch (err) {
    console.error('loadRandomPainting error:', err);
    showError("Connection error. Check your internet and try again.");
  } finally {
    // ALWAYS re-enable the button even if something went wrong
    resetState();
  }
}

// ── Display ────────────────────────────────────────────────────────────────

function displayPainting(fileTitle, info, categoryEntry, imgUrl) {
  const meta = info.extmetadata || {};

  hideLoading();
  paintingImg.src = imgUrl;
  paintingImg.alt = fileTitle.replace(/^File:/, '').replace(/\.[^.]+$/, '').replace(/_/g, ' ');
  paintingImg.classList.remove('hidden', 'fade-in', 'loaded');
  requestAnimationFrame(() => paintingImg.classList.add('loaded', 'fade-in'));

  sourceLink.href = `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle)}`;
  sourceLink.classList.add('visible');

  const theme = detectTheme(categoryEntry.category);
  descCategoryBadge.textContent = THEME_LABELS[theme] || '✦ Collection';

  const titleRaw = stripHtml(meta?.ObjectName?.value)
    || stripHtml(meta?.Title?.value)
    || fileTitle.replace(/^File:/, '').replace(/\.[^.]+$/, '').replace(/_/g, ' ');
  descTitle.textContent = titleRaw;

  const artist = stripHtml(meta?.Artist?.value);
  descArtist.textContent = artist || 'Artist Unknown';

  const date = stripHtml(meta?.DateTimeOriginal?.value) || stripHtml(meta?.DateTime?.value) || '';
  descDate.textContent = date;

  const medium = stripHtml(meta?.Medium?.value);
  if (medium) { metaMediumVal.textContent = medium; metaMedium.style.display = 'flex'; }
  else        { metaMedium.style.display = 'none'; }

  const dims = stripHtml(meta?.Dimensions?.value);
  if (dims) {
    metaDimensionsVal.textContent = dims;
    metaDimensions.style.display = 'flex';
  } else if (info.width && info.height) {
    metaDimensionsVal.textContent = `${info.width} × ${info.height} px`;
    metaDimensions.style.display = 'flex';
  } else {
    metaDimensions.style.display = 'none';
  }

  const institution = stripHtml(meta?.Credit?.value)
    || stripHtml(meta?.Institution?.value)
    || stripHtml(meta?.Source?.value);
  if (institution && institution.length < 140) {
    metaInstitutionVal.textContent = institution;
    metaInstitution.style.display = 'flex';
  } else {
    metaInstitution.style.display = 'none';
  }

  metaCategoryVal.textContent = categoryEntry.name;

  const desc = stripHtml(meta?.ImageDescription?.value);
  if (desc && desc.length > 12) {
    descDescription.textContent = desc;
    descDescription.style.display = 'block';
  } else {
    descDescription.style.display = 'none';
  }

  descFilename.textContent = fileTitle;
  descPlaceholder.classList.add('hidden');
  descContent.classList.remove('hidden');
}

function detectTheme(categoryStr) {
  for (const [theme, entries] of Object.entries(CATEGORIES)) {
    if (theme === 'all') continue;
    if (entries.some(e => e.category === categoryStr)) return theme;
  }
  return 'religious';
}

// ── Category nav ───────────────────────────────────────────────────────────
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (isLoading) return;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
    // Load a new painting from the selected category immediately
    loadRandomPainting();
  });
});

// ── Random button ──────────────────────────────────────────────────────────
randomBtn.addEventListener('click', loadRandomPainting);

// ── Auto-load on page start ────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(loadRandomPainting, 300);
});