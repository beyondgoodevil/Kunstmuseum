/**
 * app.js — Kunstmuseum
 * Fetches paintings from Wikimedia Commons API.
 * Falls back to a hardcoded seed list if the API fails.
 */

const API = 'https://commons.wikimedia.org/w/api.php';

let currentCategory = 'all';
let isLoading = false;

// ── DOM refs ───────────────────────────────────────────────────────────────
const randomBtn        = document.getElementById('randomBtn');
const paintingImg      = document.getElementById('paintingImg');
const loadingState     = document.getElementById('loadingState');
const descPlaceholder  = document.getElementById('descPlaceholder');
const descContent      = document.getElementById('descContent');
const descTitle        = document.getElementById('descTitle');
const descArtist       = document.getElementById('descArtist');
const descDate         = document.getElementById('descDate');
const descDescription  = document.getElementById('descDescription');
const descFilename     = document.getElementById('descFilename');
const descCategoryBadge= document.getElementById('descCategoryBadge');
const metaMedium       = document.getElementById('metaMedium');
const metaMediumVal    = document.getElementById('metaMediumVal');
const metaDimensions   = document.getElementById('metaDimensions');
const metaDimensionsVal= document.getElementById('metaDimensionsVal');
const metaInstitution  = document.getElementById('metaInstitution');
const metaInstitutionVal=document.getElementById('metaInstitutionVal');
const metaCategoryVal  = document.getElementById('metaCategoryVal');

// ── Hardcoded fallback paintings (guaranteed to exist on Wikimedia) ────────
const FALLBACK_PAINTINGS = {
  religious: [
    { file: 'File:The Baptism of Christ (Verrocchio & Leonardo).jpg',      name: 'The Baptism of Christ',    theme: 'religious' },
    { file: 'File:Michelangelo - Creation of Adam (cropped).jpg',          name: 'Creation of Adam',         theme: 'religious' },
    { file: 'File:Leonardo da Vinci - The Last Supper high res.jpg',       name: 'The Last Supper',          theme: 'religious' },
    { file: 'File:Sandro Botticelli - La nascita di Venere - Google Art Project - edited.jpg', name: 'Birth of Venus', theme: 'religious' },
    { file: 'File:Raphael - Madonna in the Meadow.jpg',                    name: 'Madonna in the Meadow',    theme: 'religious' },
    { file: 'File:El Greco - The Burial of the Count of Orgaz.JPG',        name: 'Burial of the Count of Orgaz', theme: 'religious' },
    { file: 'File:Caravaggio - The Calling of Saint Matthew.jpg',          name: 'The Calling of Saint Matthew', theme: 'religious' },
    { file: 'File:Fra Angelico - Annunciation (San Marco) - 1440s.jpg',    name: 'The Annunciation',         theme: 'religious' },
    { file: 'File:Rembrandt van Rijn - The Return of the Prodigal Son (detail).jpg', name: 'Return of the Prodigal Son', theme: 'religious' },
    { file: 'File:Van dyck - samson and delilah.jpg',                      name: 'Samson and Delilah',       theme: 'religious' },
  ],
  mythological: [
    { file: 'File:Venus de Milo Louvre Ma399 n4.jpg',                      name: 'Venus',                    theme: 'mythological' },
    { file: 'File:Bouguereau-William-Adolphe-Nymphs-and-Satyr-1873.jpg',   name: 'Nymphs and Satyr',         theme: 'mythological' },
    { file: 'File:Rubens - The Three Graces, from Prado in Google Earth.jpg', name: 'The Three Graces',      theme: 'mythological' },
    { file: 'File:Titian - Bacchus and Ariadne - Google Art Project.jpg',  name: 'Bacchus and Ariadne',      theme: 'mythological' },
    { file: 'File:Peter Paul Rubens - The Judgment of Paris (1639).jpg',   name: 'The Judgement of Paris',   theme: 'mythological' },
    { file: 'File:John William Waterhouse - Echo and Narcissus - Google Art Project.jpg', name: 'Echo and Narcissus', theme: 'mythological' },
    { file: 'File:Velázquez – Triumph of Bacchus (Los Borrachos), Prado, c. 1629.jpg', name: 'Triumph of Bacchus', theme: 'mythological' },
    { file: 'File:Gustave Moreau - Oedipus and the Sphinx - Google Art Project.jpg', name: 'Oedipus and the Sphinx', theme: 'mythological' },
    { file: 'File:Arnold Böcklin - Die Toteninsel III (Alte Nationalgalerie Berlin).jpg', name: 'Isle of the Dead', theme: 'mythological' },
    { file: 'File:John Collier - Lilith.jpg',                              name: 'Lilith',                   theme: 'mythological' },
  ],
  literary: [
    { file: 'File:John Everett Millais - Ophelia - Google Art Project.jpg',name: 'Ophelia',                  theme: 'literary' },
    { file: 'File:William Blake - Dante and Virgil Penetrating the Forest - Google Art Project.jpg', name: 'Dante and Virgil', theme: 'literary' },
    { file: 'File:Francisco de Goya y Lucientes - Don Quixote - Google Art Project.jpg', name: 'Don Quixote', theme: 'literary' },
    { file: 'File:Jacques-Louis David - The Death of Socrates.jpg',        name: 'The Death of Socrates',    theme: 'literary' },
    { file: 'File:Füssli - Nachtmahr.jpg',                                 name: 'The Nightmare',            theme: 'literary' },
    { file: 'File:Rembrandt - Aristotle with a Bust of Homer.jpg',         name: 'Aristotle with a Bust of Homer', theme: 'literary' },
    { file: 'File:Dante Gabriel Rossetti - Beata Beatrix, 1864-1870.jpg',  name: 'Beata Beatrix',            theme: 'literary' },
    { file: 'File:Ford Madox Brown - Romeo and Juliet.jpg',                name: 'Romeo and Juliet',         theme: 'literary' },
    { file: 'File:Joseph Wright of Derby The Alchemist.jpg',               name: 'The Alchemist',            theme: 'literary' },
    { file: 'File:Eugène Delacroix - Hamlet and Horatio in the Graveyard (1839).jpg', name: 'Hamlet in the Graveyard', theme: 'literary' },
  ]
};
FALLBACK_PAINTINGS.all = [
  ...FALLBACK_PAINTINGS.religious,
  ...FALLBACK_PAINTINGS.mythological,
  ...FALLBACK_PAINTINGS.literary
];

// ── Helpers ────────────────────────────────────────────────────────────────
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function stripHtml(html) {
  if (!html) return '';
  const d = document.createElement('div');
  d.innerHTML = html;
  return (d.textContent || d.innerText || '').replace(/\s+/g, ' ').trim();
}

function isPaintingFile(title) {
  return /\.(jpg|jpeg|png)$/i.test(title);
}

// ── UI state ───────────────────────────────────────────────────────────────
function showLoading() {
  paintingImg.classList.add('hidden');
  paintingImg.classList.remove('fade-in', 'loaded');
  loadingState.innerHTML = '<div class="loader-ring"></div><p>Summoning from the archives…</p>';
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

function unlock() {
  isLoading = false;
  randomBtn.disabled = false;
}

// ── API ────────────────────────────────────────────────────────────────────
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
  const res   = await fetch(`${API}?${params}`);
  const data  = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  return page?.imageinfo?.[0] || null;
}

async function fetchCategoryMembers(categoryTitle) {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const params = new URLSearchParams({
    action:               'query',
    list:                 'categorymembers',
    cmtitle:              categoryTitle,
    cmtype:               'file',
    cmlimit:              '50',
    cmstartsortkeyprefix: letter,
    format:               'json',
    origin:               '*'
  });
  const res  = await fetch(`${API}?${params}`);
  const data = await res.json();
  const members = data?.query?.categorymembers || [];
  if (members.length) return members;

  // fallback without letter prefix
  const p2 = new URLSearchParams({
    action:  'query',
    list:    'categorymembers',
    cmtitle: categoryTitle,
    cmtype:  'file',
    cmlimit: '50',
    format:  'json',
    origin:  '*'
  });
  const r2   = await fetch(`${API}?${p2}`);
  const d2   = await r2.json();
  return d2?.query?.categorymembers || [];
}

// ── Load painting from API ─────────────────────────────────────────────────
async function tryApiPainting() {
  const pool = CATEGORIES[currentCategory];
  for (let i = 0; i < 5; i++) {
    try {
      const entry   = pickRandom(pool);
      let   members = await fetchCategoryMembers(entry.category);
      members = members.filter(m => isPaintingFile(m.title));
      if (!members.length) continue;

      const file = pickRandom(members);
      const info = await fetchImageInfo(file.title);
      if (!info) continue;

      const imgUrl = info.thumburl || info.url;
      if (!imgUrl) continue;

      // Quick image test with 8s timeout
      const ok = await new Promise(resolve => {
        const img = new Image();
        const t   = setTimeout(() => resolve(false), 8000);
        img.onload  = () => { clearTimeout(t); resolve(true); };
        img.onerror = () => { clearTimeout(t); resolve(false); };
        img.src = imgUrl;
      });
      if (!ok) continue;

      displayPainting(file.title, info, entry, imgUrl);
      return true;
    } catch(e) {
      console.warn('API attempt failed:', e);
    }
  }
  return false;
}

// ── Load painting from fallback seed list ──────────────────────────────────
async function tryFallbackPainting() {
  const pool    = FALLBACK_PAINTINGS[currentCategory];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  for (const seed of shuffled) {
    try {
      const info = await fetchImageInfo(seed.file);
      if (!info) continue;
      const imgUrl = info.thumburl || info.url;
      if (!imgUrl) continue;

      const ok = await new Promise(resolve => {
        const img = new Image();
        const t   = setTimeout(() => resolve(false), 8000);
        img.onload  = () => { clearTimeout(t); resolve(true); };
        img.onerror = () => { clearTimeout(t); resolve(false); };
        img.src = imgUrl;
      });
      if (!ok) continue;

      const fakeEntry = { name: seed.name, category: '' };
      displayPainting(seed.file, info, fakeEntry, imgUrl);
      return true;
    } catch(e) {
      console.warn('Fallback attempt failed:', e);
    }
  }
  return false;
}

// ── Main ───────────────────────────────────────────────────────────────────
async function loadRandomPainting() {
  if (isLoading) return;
  isLoading = true;
  randomBtn.disabled = true;
  showLoading();

  try {
    // Try live API first, fall back to seed list
    const ok = await tryApiPainting() || await tryFallbackPainting();
    if (!ok) showError("Couldn't load a painting. Please try again.");
  } catch(err) {
    console.error(err);
    showError("Something went wrong. Please try again.");
  } finally {
    unlock();
  }
}

// ── Display ────────────────────────────────────────────────────────────────
function detectTheme(categoryStr) {
  for (const [theme, entries] of Object.entries(CATEGORIES)) {
    if (theme === 'all') continue;
    if (entries.some(e => e.category === categoryStr)) return theme;
  }
  return null;
}

function displayPainting(fileTitle, info, categoryEntry, imgUrl) {
  const meta = info.extmetadata || {};

  hideLoading();
  paintingImg.src = imgUrl;
  paintingImg.alt = fileTitle.replace(/^File:/, '').replace(/\.[^.]+$/, '').replace(/_/g, ' ');
  paintingImg.classList.remove('hidden', 'fade-in', 'loaded');
  requestAnimationFrame(() => paintingImg.classList.add('loaded', 'fade-in'));



  // Theme badge
  const theme = detectTheme(categoryEntry.category);
  descCategoryBadge.textContent = (theme && THEME_LABELS[theme]) ? THEME_LABELS[theme] : '✦ Collection';

  // Title
  const titleRaw = stripHtml(meta?.ObjectName?.value)
    || stripHtml(meta?.Title?.value)
    || fileTitle.replace(/^File:/, '').replace(/\.[^.]+$/, '').replace(/_/g, ' ');
  descTitle.textContent = titleRaw;

  // Artist
  descArtist.textContent = stripHtml(meta?.Artist?.value) || 'Artist Unknown';

  // Date
  descDate.textContent = stripHtml(meta?.DateTimeOriginal?.value)
    || stripHtml(meta?.DateTime?.value) || '';

  // Medium
  const medium = stripHtml(meta?.Medium?.value);
  metaMedium.style.display = medium ? 'flex' : 'none';
  if (medium) metaMediumVal.textContent = medium;

  // Dimensions
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

  // Collection
  const inst = stripHtml(meta?.Credit?.value)
    || stripHtml(meta?.Institution?.value)
    || stripHtml(meta?.Source?.value);
  if (inst && inst.length < 140) {
    metaInstitutionVal.textContent = inst;
    metaInstitution.style.display = 'flex';
  } else {
    metaInstitution.style.display = 'none';
  }

  metaCategoryVal.textContent = categoryEntry.name || '—';

  const desc = stripHtml(meta?.ImageDescription?.value);
  descDescription.style.display = (desc && desc.length > 12) ? 'block' : 'none';
  if (desc && desc.length > 12) descDescription.textContent = desc;

  descFilename.textContent = fileTitle;
  descPlaceholder.classList.add('hidden');
  descContent.classList.remove('hidden');
}

// ── Category nav ───────────────────────────────────────────────────────────
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (isLoading) return;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
    loadRandomPainting();
  });
});

randomBtn.addEventListener('click', loadRandomPainting);

window.addEventListener('DOMContentLoaded', () => setTimeout(loadRandomPainting, 300));
