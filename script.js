// ===== 1. FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();


// ===== 2. DARK / LIGHT THEME =====
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';
  localStorage.setItem('theme', theme);
}

setTheme(localStorage.getItem('theme') || 'dark');

themeBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'light' ? 'dark' : 'light');
});


// ===== 3. MOBILE MENU =====
const menuBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuBtn.textContent = isOpen ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.textContent = '☰';
  });
});


// ===== 4. TERMINAL TYPING EFFECT =====
const commands = [
  'terraform apply',
  'kubectl get pods',
  'docker build -t portfolio .',
  'git push origin main'
];

const typingEl = document.getElementById('typing');
let cmdIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = commands[cmdIndex];

  charIndex = deleting ? charIndex - 1 : charIndex + 1;
  typingEl.textContent = current.slice(0, charIndex);

  let delay = deleting ? 50 : 100;

  if (!deleting && charIndex === current.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    cmdIndex = (cmdIndex + 1) % commands.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();


// ===== 5. REVEAL ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
