// Reveal animacije
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
},{ threshold: 0.16 });

document.querySelectorAll('.card, .price-card, .ig-card').forEach(el => observer.observe(el));

// Smooth scroll za #ankere
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Dark / Light toggle (globalno, logo opcionalan)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const logo = document.getElementById('site-logo'); // može da ne postoji

  const saved = localStorage.getItem('theme') || 'dark';

  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (toggle) toggle.textContent = theme === 'light' ? '🌙' : '☀️';
    if (logo)  logo.src = theme === 'light' ? 'assets/logo-light.png' : 'assets/logo-dark.png';
  }

  applyTheme(saved);

  if (toggle){
    toggle.addEventListener('click', () => {
      const now = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(now === 'light' ? 'dark' : 'light');
    });
  }
});
