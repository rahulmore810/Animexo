let page = 1;
let mode = "HOME";
let query = "";
let genre = "";

const grid = document.getElementById("animeGrid");

/* ===== GENRES (HIANIME CORE SET) ===== */
const GENRES = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 4, name: "Comedy" },
  { id: 8, name: "Drama" },
  { id: 10, name: "Fantasy" },
  { id: 14, name: "Horror" },
  { id: 18, name: "Psychological" },
  { id: 22, name: "Romance" },
  { id: 24, name: "Sci-Fi" },
  { id: 27, name: "Shounen" },
  { id: 36, name: "Slice of Life" },
  { id: 37, name: "Supernatural" },
  { id: 41, name: "Thriller" }
];

const genreSelect = document.getElementById("genreSelect");
GENRES.forEach(g => {
  const o = document.createElement("option");
  o.value = g.id;
  o.textContent = g.name;
  genreSelect.appendChild(o);
});

/* ===== URL BUILDER ===== */
function buildURL() {
  if (mode === "SEARCH")
    return `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&order_by=popularity&page=${page}`;

  if (mode === "GENRE")
    return `https://api.jikan.moe/v4/anime?genres=${genre}&order_by=popularity&page=${page}`;

  return `https://api.jikan.moe/v4/top/anime?page=${page}`;
}

/* ===== LOAD ===== */
async function loadAnime(reset) {
  if (reset) {
    page = 1;
    grid.innerHTML = "";
    window.scrollTo(0, 0);
  }

  const res = await fetch(buildURL());
  const json = await res.json();
  const data = json.data || [];

  shuffle(data);

  data.forEach(a => {
    const card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
      <img src="${a.images.jpg.image_url}">
      <p>${a.title_english || a.title}</p>
    `;
    card.onclick = () => openPopup(a);
    grid.appendChild(card);
  });

  page++;
}

/* ===== HOME (FORCED FRESH) ===== */
function goHome() {
  mode = "HOME";
  query = "";
  genre = "";
  genreSelect.value = "";
  loadAnime(true);
}

/* ===== SEARCH ===== */
function searchAnime() {
  query = document.getElementById("searchInput").value.trim();
  if (!query) return;
  mode = "SEARCH";
  genre = "";
  genreSelect.value = "";
  loadAnime(true);
}

/* ===== GENRE (FIXED) ===== */
function applyGenre() {
  genre = genreSelect.value;
  if (!genre) return;
  mode = "GENRE";
  query = "";
  loadAnime(true);
}

/* ===== POPUP ===== */
function openPopup(a) {
  document.getElementById("popup").classList.remove("hidden");
  document.getElementById("popupImg").src = a.images.jpg.image_url;
  document.getElementById("popupTitle").textContent =
    (a.title_english || a.title) + " / " + a.title_japanese;
  document.getElementById("popupMeta").textContent =
    `Score: ${a.score || "N/A"} | Episodes: ${a.episodes || "?"}`;
  document.getElementById("popupSummary").textContent =
    a.synopsis || "No summary available.";

  loadReco(a.mal_id);
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

/* ===== RECOMMEND ===== */
async function loadReco(id) {
  const row = document.getElementById("popupReco");
  row.innerHTML = "";
  const r = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
  const j = await r.json();
  (j.data || []).slice(0, 10).forEach(x => {
    const c = document.createElement("div");
    c.className = "reco-card";
    c.innerHTML = `
      <img src="${x.entry.images.jpg.image_url}">
      <p>${x.entry.title}</p>
    `;
    c.onclick = () => openPopup(x.entry);
    row.appendChild(c);
  });
}

/* ===== UTIL ===== */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

/* ===== INFINITE ===== */
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY > document.body.offsetHeight - 300) {
    loadAnime(false);
  }
});

/* INIT */
loadAnime(true);
(true);
