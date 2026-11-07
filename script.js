// ===== 1. FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();


// ===== 2. THEME TOGGLE (black / blue circuit background) =====
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'blue') {
    root.setAttribute('data-theme', 'blue');
  } else {
    root.removeAttribute('data-theme');
  }
  themeBtn.textContent = theme === 'blue' ? '⚫' : '🔷';
  themeBtn.setAttribute('aria-label', theme === 'blue' ? 'Switch to black theme' : 'Switch to blue theme');
}

// Sync the button icon with whatever the <head> script already applied
applyTheme(root.getAttribute('data-theme') === 'blue' ? 'blue' : 'dark');

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'blue' ? 'dark' : 'blue';
  applyTheme(next);
  try {
    localStorage.setItem('theme', next);
  } catch (e) {}
});


// ===== 3. SKELETON LOADERS =====
// Each .skeleton box holds an image. When it finishes loading, remove the shimmer.
document.querySelectorAll('.skeleton').forEach((box) => {
  const img = box.querySelector('img');
  const done = () => box.classList.remove('skeleton');

  if (img.complete && img.naturalWidth > 0) {
    done(); // already loaded (from cache)
  } else {
    img.addEventListener('load', done);
    img.addEventListener('error', done); // don't shimmer forever if it fails
  }
});


// ===== 4. MOBILE MENU =====
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
