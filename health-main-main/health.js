// Basic form handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      form.reset();
    });
  }

  // Animate feature cards on scroll
  const featureCards = document.querySelectorAll('.feature-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });
  featureCards.forEach(card => observer.observe(card));

  // Button ripple effect
  document.querySelectorAll('.feature-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const circle = document.createElement('span');
      circle.className = 'ripple';
      circle.style.left = `${e.offsetX}px`;
      circle.style.top = `${e.offsetY}px`;
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
});