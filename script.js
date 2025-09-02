// Intersection Observer for reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
},{threshold: .16});

document.querySelectorAll('.card, .price-card, .ig-card').forEach(el => observer.observe(el));

// Loader effect for hero logo (fallback to CSS already animating)
window.addEventListener('load', () => {
  document.body.classList.add('ready');
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
