/**
 * Eight Eight Studio — main.js v4
 * Theme · Canvas · Chip scroll reveal · Supabase form
 */

'use strict';

/* ══ THEME ══ */
const html   = document.documentElement;
const toggle = document.getElementById('themeToggle');
const ttIcon = document.getElementById('ttIcon');

const saved = localStorage.getItem('88-theme') || 'dark';
applyTheme(saved);

toggle.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  localStorage.setItem('88-theme', t);
  ttIcon.textContent = t === 'dark' ? '☾' : '☀';
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', t === 'dark' ? '#080808' : '#f4f1ec');
}

/* ══ BACKGROUND CANVAS ══ */
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');

function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize();
window.addEventListener('resize', resize, { passive: true });

const lines = Array.from({ length: 22 }, () => ({
  x1: Math.random() * innerWidth,  y1: Math.random() * innerHeight,
  x2: Math.random() * innerWidth,  y2: Math.random() * innerHeight,
  dx1: (Math.random() - 0.5) * 0.32, dy1: (Math.random() - 0.5) * 0.32,
  dx2: (Math.random() - 0.5) * 0.32, dy2: (Math.random() - 0.5) * 0.32,
  a: Math.random() * 0.18 + 0.04,
  accent: Math.random() > 0.82,
}));

(function drawBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const dark = html.getAttribute('data-theme') === 'dark';

  lines.forEach(l => {
    l.x1 += l.dx1; l.y1 += l.dy1; l.x2 += l.dx2; l.y2 += l.dy2;
    if (l.x1 < 0 || l.x1 > canvas.width)  l.dx1 *= -1;
    if (l.y1 < 0 || l.y1 > canvas.height) l.dy1 *= -1;
    if (l.x2 < 0 || l.x2 > canvas.width)  l.dx2 *= -1;
    if (l.y2 < 0 || l.y2 > canvas.height) l.dy2 *= -1;

    const col = l.accent
      ? (dark ? `rgba(232,255,71,${l.a})` : `rgba(26,26,26,${l.a * 0.5})`)
      : (dark ? `rgba(240,237,232,${l.a * 0.5})` : `rgba(14,14,14,${l.a * 0.3})`);

    ctx.beginPath();
    ctx.moveTo(l.x1, l.y1);
    ctx.lineTo(l.x2, l.y2);
    ctx.strokeStyle = col;
    ctx.lineWidth   = l.accent ? 1.2 : 0.7;
    ctx.stroke();
    if (l.accent) {
      ctx.beginPath();
      ctx.arc(l.x1, l.y1, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    }
  });

  requestAnimationFrame(drawBg);
})();

/* ══ CHIP SCROLL REVEAL ══ */
const chipsSection = document.getElementById('chipsSection');
const chips        = document.querySelectorAll('.chip');

const chipObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Trigger all chips with staggered delays
      chips.forEach(chip => chip.classList.add('visible'));
      chipObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

if (chipsSection) chipObserver.observe(chipsSection);

/* ══ NOTIFY FORM — wired to Supabase ══ */
async function handleNotify(e) {
  e.preventDefault();

  const nameEl  = document.getElementById('nameInput');
  const bizEl   = document.getElementById('bizInput');
  const emailEl = document.getElementById('emailInput');
  const btn     = document.getElementById('nbBtn');
  const btnText = document.getElementById('nbBtnText');
  const success = document.getElementById('nbSuccess');
  const form    = document.getElementById('nbForm');

  const name  = nameEl.value.trim();
  const biz   = bizEl.value.trim();
  const email = emailEl.value.trim();

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    [nameEl, emailEl].forEach(el => {
      if (!el.value.trim()) {
        el.style.borderColor = '#ff5555';
        el.style.boxShadow   = '0 0 0 3px rgba(255,85,85,0.14)';
        setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; }, 1800);
      }
    });
    return;
  }

  btn.disabled = true;
  btnText.textContent = 'Sending…';

  // ── SUPABASE INSERT ──
  // Replace SUPABASE_URL and SUPABASE_ANON_KEY with your actual values
  const SUPABASE_URL      = 'YOUR_SUPABASE_URL';       // e.g. https://xxxx.supabase.co
  const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';  // starts with eyJ...

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':         SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer':         'return=minimal',
      },
      body: JSON.stringify({ name, business: biz, email }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Success
    form.style.opacity = '0.4';
    form.style.pointerEvents = 'none';
    success.classList.add('show');

  } catch (err) {
    console.error('Supabase error:', err);
    // Still show success UX — don't penalise user for backend issues
    form.style.opacity = '0.4';
    form.style.pointerEvents = 'none';
    success.classList.add('show');
  }
}

/* ══ REDUCED MOTION ══ */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.hl,.status-pill,.subtext,.notify-box,.socials').forEach(el => {
    el.style.opacity = '1'; el.style.transform = 'none'; el.style.animation = 'none';
  });
  chips.forEach(c => c.classList.add('visible'));
}
