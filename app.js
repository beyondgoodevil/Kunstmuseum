/**
 * app.js — The Eternal Gallery
 * Fetches random paintings from Wikimedia Commons via their public API.
 * No API key needed; uses CORS-enabled origin=* parameter.
 */

const API = 'https://commons.wikimedia.org/w/api.php';

// ── State ──────────────────────────────────────────────────────────────────
let currentCategory = 'all';
let isLoading = false;

// ── DOM refs ───────────────────────────────────────────────────────────────
const randomBtn       = document.getElementById('randomBtn');
const paintingImg     = document.getElementById('paintingImg');
const loadingState    = document.getElementById('loadingState');
const descPlaceholder = document.getElementById('descPlaceholder');
const descContent     = document.getElementById('descContent');
const sourceLink      = document.getElementById('sourceLink');

// Description fields
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
  return tmp.textContent || tmp.innerText || '';
}

function cleanMeta(val) {
  if (!val) return '';
  return stripHtml(val).replace(/\s+/g, ' ').trim();
}

// ── API calls ──────────────────────────────────────────────────────────────

/**
 * Fetch a list of file members from a Commons category.
 * We use a random cmcontinue offset by first getting a count
 * then picking a random page within that range.
 */
async function fetchCategoryMembers(categoryTitle) {
  // Step 1: get up to 500 file titles from the category, with a random starting point
  // We'll randomize by requesting with a random gcmstartsortkeyprefix isn't reliable,
  // so we fetch 100 members and pick randomly.
  const params = new URLSearchParams({
    action:  'query',
    list:    'categorymembers',
    cmtitle: categoryTitle,
    cmtype:  'file',
    cmlimit: '100',
    format:  'json',
    origin:  '*'
  });

  const res  = await fetch(`${API}?${params}`);
  const data = await res.json();
  return data?.query?.categorymembers || [];
}

/**
 * Fetch image URL + metadata for a given file title.
 */
async function fetchImageInfo(fileTitle) {
  const params = new URLSearchParams({
    action:   'query',
    titles:   fileTitle,
    prop:     'imageinfo',
    iiprop:   'url|extmetadata|size',
    iiurlwidth:'1200',
    format:   'json',
    origin:   '*'
  });

  const res  = await fetch(`${API}?${params}`);
  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return null;

  const page = Object.values(pages)[0];
  if (!page?.imageinfo?.[0]) return null;
  return page.imageinfo[0];
}

/**
 * Filter files to likely be paintings (JPG/PNG, not SVG/OGG/PDF).
 */
function isPaintingFile(title) {
  const lower = title.toLowerCase();
  return /\.(jpg|jpeg|png|tif|tiff)$/.test(lower);
}

// ── Main fetch flow ────────────────────────────────────────────────────────

async function loadRandomPainting() {
  if (isLoading) return;
  isLoading = true;
  randomBtn.disabled = true;

  // Show loading
  showLoading();

  try {
    // Pick a random category entry from the selected theme
    const pool = CATEGORIES[currentCategory];
    
    // Try up to 5 times in case a category is empty or images fail
    let attempts = 0;
    let success  = false;

    while (attempts < 5 && !success) {
      attempts++;
      const entry = pickRandom(pool);

      let members = await fetchCategoryMembers(entry.category);
      members = members.filter(m => isPaintingFile(m.title));

      if (!members.length) continue;

      // Pick a random file
      const file = pickRandom(members);
      const info = await fetchImageInfo(file.title);

      if (!info?.url) continue;

      // We have a valid image — display it
      displayPainting(file.title, info, entry);
      success = true;
    }

    if (!success) {
      showError("Couldn't find a suitable painting. Please try again.");
    }

  } catch (err) {
    console.error(err);
    showError("Network error fetching from Wikimedia Commons. Please try again.");
  }

  isLoading = false;
  randomBtn.disabled = false;
}

// ── Display helpers ────────────────────────────────────────────────────────

function showLoading() {
  paintingImg.classList.add('hidden');
  paintingImg.classList.remove('fade-in', 'loaded');
  loadingState.classList.remove('hidden');
}

function hideLoading() {
  loadingState.classList.add('hidden');
}

function showError(msg) {
  hideLoading();
  paintingImg.classList.add('hidden');
  loadingState.classList.remove('hidden');
  loadingState.innerHTML = `<p class="error-state">${msg}</p>`;
}

function displayPainting(fileTitle, info, categoryEntry) {
  const meta = info.extmetadata || {};

  // ── Determine image URL (prefer resized, fallback to original) ──
  const imgUrl = info.thumburl || info.url;

  // ── Load image ──
  const img = new Image();
  img.onload = () => {
    hideLoading();
    paintingImg.src = imgUrl;
    paintingImg.alt = fileTitle;
    paintingImg.classList.remove('hidden');
    // Small delay so the class swap triggers animation
    requestAnimationFrame(() => {
      paintingImg.classList.add('loaded', 'fade-in');
    });
  };
  img.onerror = () => {
    showError("Image failed to load. Please try another.");
    isLoading = false;
    randomBtn.disabled = false;
  };
  img.src = imgUrl;

  // ── Source link ──
  const pageUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle)}`;
  sourceLink.href = pageUrl;
  sourceLink.classList.add('visible');

  // ── Fill description panel ──

  // Category badge
  const theme = detectTheme(categoryEntry.category);
  descCategoryBadge.textContent = THEME_LABELS[theme] || '✦ Collection';

  // Title
  const titleRaw = cleanMeta(meta?.ObjectName?.value) || 
                   cleanMeta(meta?.Title?.value) || 
                   fileTitle.replace(/^File:/, '').replace(/\.[^.]+$/, '').replace(/_/g, ' ');
  descTitle.textContent = titleRaw;

  // Artist
  const artist = cleanMeta(meta?.Artist?.value);
  descArtist.textContent = artist ? artist : 'Artist Unknown';

  // Date
  const dateCreated = cleanMeta(meta?.DateTimeOriginal?.value) || 
                      cleanMeta(meta?.DateTime?.value) || '';
  descDate.textContent = dateCreated || '';

  // Medium
  const medium = cleanMeta(meta?.Medium?.value);
  if (medium) {
    metaMediumVal.textContent = medium;
    metaMedium.style.display = 'flex';
  } else {
    metaMedium.style.display = 'none';
  }

  // Dimensions
  const dims = cleanMeta(meta?.Dimensions?.value);
  if (dims) {
    metaDimensionsVal.textContent = dims;
    metaDimensions.style.display = 'flex';
  } else if (info.width && info.height) {
    metaDimensionsVal.textContent = `${info.width} × ${info.height} px (digital)`;
    metaDimensions.style.display = 'flex';
  } else {
    metaDimensions.style.display = 'none';
  }

  // Institution / Collection
  const institution = cleanMeta(meta?.Credit?.value) || 
                      cleanMeta(meta?.Institution?.value) || 
                      cleanMeta(meta?.Source?.value);
  if (institution && institution.length < 120) {
    metaInstitutionVal.textContent = institution;
    metaInstitution.style.display = 'flex';
  } else {
    metaInstitution.style.display = 'none';
  }

  // Theme category
  metaCategoryVal.textContent = categoryEntry.name;

  // Description
  const desc = cleanMeta(meta?.ImageDescription?.value);
  if (desc && desc.length > 10) {
    descDescription.textContent = desc;
    descDescription.style.display = 'block';
  } else {
    descDescription.style.display = 'none';
  }

  // Filename
  descFilename.textContent = fileTitle;

  // Show panel
  descPlaceholder.classList.add('hidden');
  descContent.classList.remove('hidden');
}

function detectTheme(categoryStr) {
  const lower = categoryStr.toLowerCase();
  // Check which pool contains this category
  for (const [theme, entries] of Object.entries(CATEGORIES)) {
    if (theme === 'all') continue;
    if (entries.some(e => e.category === categoryStr)) return theme;
  }
  return 'religious';
}

// ── Category nav ───────────────────────────────────────────────────────────
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
  });
});

// ── Random button ──────────────────────────────────────────────────────────
randomBtn.addEventListener('click', loadRandomPainting);

// ── Auto-load on page start ────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Small delay for nice entrance feel
  setTimeout(loadRandomPainting, 400);
});
