// Reveal animacije
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
},{ threshold: .16 });

document.querySelectorAll('.card, .price-card, .ig-card').forEach(el => observer.observe(el));

// Tema (DARK/LIGHT)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Ako user već birao, vrati to; inače dark
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  toggle.textContent = saved === 'light' ? '🌙' : '☀️';

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.textContent = next === 'light' ? '🌙' : '☀️';
  });
});
