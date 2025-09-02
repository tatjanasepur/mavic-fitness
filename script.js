// === Reveal animacije ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.card, .price-card, .ig-card').forEach(el => observer.observe(el));

// === Smooth scroll za #ankere ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === Globalno: Dark / Light toggle ===
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme') || 'dark';

  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (toggle) toggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }

  applyTheme(saved);

  if (toggle){
    toggle.addEventListener('click', () => {
      const now = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(now === 'light' ? 'dark' : 'light');
    });
  }
});

// === Hamburger meni (mobilni) ===
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');

  if (!btn || !nav) return;

  function openNav() {
    nav.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // zaključaj scroll iza menija (po želji)
  }

  function closeNav() {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // vrati scroll
  }

  function toggleNav() {
    if (nav.classList.contains('open')) closeNav();
    else openNav();
  }

  btn.addEventListener('click', toggleNav);

  // Zatvori na klik linka u meniju
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Zatvori na Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeNav();
  });

  // Zatvori klikom van panela
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    const clickInsideNav = nav.contains(e.target);
    const clickOnButton = btn.contains(e.target);
    if (!clickInsideNav && !clickOnButton) closeNav();
  });

  // Ako se prozor proširi (npr. rotacija), resetuj stanje
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      closeNav();
    }
  });
});
