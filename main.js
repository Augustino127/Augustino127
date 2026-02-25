/* ==============================
   NAVBAR SCROLL EFFECT
================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ==============================
   MOBILE HAMBURGER
================================ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ==============================
   PARTICLES
================================ */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize, { passive: true });

function createParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 16000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2,
    });
  }
}
createParticles();
window.addEventListener('resize', createParticles, { passive: true });

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(155,138,244,${p.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ==============================
   SCROLL FADE-IN
================================ */
const fadeEls = document.querySelectorAll(
  '.about-text, .about-card, .skill-category, .project-card, .focus-card, .contact-card'
);

fadeEls.forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeEls.forEach(el => observer.observe(el));

/* ==============================
   TYPING ROLES IN HERO
================================ */
const roles = [
  'Software Engineer',
  'Full-Stack Developer',
  'Game Developer',
  '3D Designer',
  'Creative Coder',
];

const roleTags = document.querySelectorAll('.role-tag');
let current = 0;

setInterval(() => {
  roleTags.forEach(t => t.style.opacity = '0.5');
  current = (current + 1) % roles.length;
  if (roleTags[current % roleTags.length]) {
    const tag = roleTags[current % roleTags.length];
    tag.style.opacity = '1';
    tag.style.borderColor = 'rgba(110,87,224,0.8)';
    setTimeout(() => {
      roleTags.forEach(t => {
        t.style.opacity = '1';
        t.style.borderColor = '';
      });
    }, 600);
  }
}, 2000);
