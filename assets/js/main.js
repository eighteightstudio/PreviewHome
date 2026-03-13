/**
 * Eight Eight Studio — main.js
 * Theme toggle · Background canvas · Notify form
 */

'use strict';

/* ══ THEME TOGGLE ══ */
const html    = document.documentElement;
const toggle  = document.getElementById('themeToggle');
const ttIcon  = document.getElementById('ttIcon');

// Icons
const ICON_DARK  = '☾';   // shown when in dark mode (click → go light)
const ICON_LIGHT = '☀';   // shown when in light mode (click → go dark)

// Read saved preference or default to dark
const saved = localStorage.getItem('88-theme') || 'dark';
applyTheme(saved);

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('88-theme', theme);
  ttIcon.textContent = theme === 'dark' ? ICON_DARK : ICON_LIGHT;
  // Update meta theme-color for mobile browser chrome
  document.querySelector('meta[name="theme-color"]')
    .setAttribute('content', theme === 'dark' ? '#080808' : '#f4f1ec');
}

/* ══ BACKGROUND CANVAS — animated geometric lines ══ */
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });

const LINES = 20;
const lines = Array.from({ length: LINES }, () => ({
  x1: Math.random() * innerWidth,
  y1: Math.random() * innerHeight,
  x2: Math.random() * innerWidth,
  y2: Math.random() * innerHeight,
  dx1: (Math.random() - 0.5) * 0.35,
  dy1: (Math.random() - 0.5) * 0.35,
  dx2: (Math.random() - 0.5) * 0.35,
  dy2: (Math.random() - 0.5) * 0.35,
  alpha: Math.random() * 0.2 + 0.04,
  isAccent: Math.random() > 0.8,
}));

function drawBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isDark = html.getAttribute('data-theme') === 'dark';

  lines.forEach(l => {
    // Move
    l.x1 += l.dx1; l.y1 += l.dy1;
    l.x2 += l.dx2; l.y2 += l.dy2;
    // Bounce
    if (l.x1 < 0 || l.x1 > canvas.width)  l.dx1 *= -1;
    if (l.y1 < 0 || l.y1 > canvas.height) l.dy1 *= -1;
    if (l.x2 < 0 || l.x2 > canvas.width)  l.dx2 *= -1;
    if (l.y2 < 0 || l.y2 > canvas.height) l.dy2 *= -1;

    let color;
    if (l.isAccent) {
      color = isDark
        ? `rgba(232,255,71,${l.alpha})`
        : `rgba(26,26,26,${l.alpha * 0.6})`;
    } else {
      color = isDark
        ? `rgba(240,237,232,${l.alpha * 0.5})`
        : `rgba(14,14,14,${l.alpha * 0.3})`;
    }

    ctx.beginPath();
    ctx.moveTo(l.x1, l.y1);
    ctx.lineTo(l.x2, l.y2);
    ctx.strokeStyle = color;
    ctx.lineWidth   = l.isAccent ? 1.2 : 0.7;
    ctx.stroke();

    if (l.isAccent) {
      ctx.beginPath();
      ctx.arc(l.x1, l.y1, 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  });

  requestAnimationFrame(drawBg);
}
drawBg();

/* ══ NOTIFY FORM ══ */
function handleNotify(e) {
  e && e.preventDefault();

  const emailEl  = document.getElementById('emailInput');
  const btn      = document.getElementById('nbBtn');
  const btnText  = document.getElementById('nbBtnText');
  const success  = document.getElementById('nbSuccess');
  const fields   = document.querySelector('.nb-fields');

  const email = emailEl.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!valid) {
    fields.style.borderColor = '#ff5555';
    fields.style.boxShadow   = '0 0 0 3px rgba(255,85,85,0.15)';
    emailEl.focus();
    setTimeout(() => {
      fields.style.borderColor = '';
      fields.style.boxShadow   = '';
    }, 1800);
    return;
  }

  // Success state
  btn.disabled = true;
  btnText.textContent = 'Done ✓';
  fields.style.opacity = '0.5';
  fields.style.pointerEvents = 'none';
  success.classList.add('show');

  // Wire to Formspree — uncomment and add your form ID:
  // fetch('https://formspree.io/f/YOUR_ID', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email })
  // });
}

/* ══ REDUCED MOTION ══ */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.hl, .status-pill, .subtext, .ticker, .notify-box, .socials').forEach(el => {
    el.style.opacity   = '1';
    el.style.transform = 'none';
    el.style.animation = 'none';
  });
}
