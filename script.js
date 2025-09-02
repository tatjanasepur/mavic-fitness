// ---- Tema ----
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setIcon() {
  const isLight = root.classList.contains('light');
  themeIcon.textContent = isLight ? '🌙' : '☀️';
  themeToggle.setAttribute('aria-pressed', String(isLight));
}

function applyInitialTheme() {
  const saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
  if (saved === 'light') root.classList.add('light');
  else if (saved === 'dark') root.classList.remove('light'); // ostaje dark varijanta
  else {
    // koristimo sistemsku preferencu
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (prefersLight) root.classList.add('light');
  }
  setIcon();
}

themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  const mode = root.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('theme', mode);
  setIcon();
});

applyInitialTheme();

// ---- Hamburger meni ----
const burgerBtn = document.getElementById('burgerBtn');
const nav = document.getElementById('siteNav');

burgerBtn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burgerBtn.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : ''; // lock scroll na mobilnom
});

// zatvori meni kada se klikne na link
nav.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  if (nav.classList.contains('open')) {
    nav.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// fallback: zatvaranje na escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});
