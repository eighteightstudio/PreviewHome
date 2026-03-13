/**
 * Eight Eight Studio — main.js
 * Handles: notify form, cursor, nav scroll, subtle effects
 */

'use strict';

/* ─── Notify Form ─── */
function handleNotify() {
  const input   = document.getElementById('emailInput');
  const btn     = document.getElementById('notifyBtn');
  const success = document.getElementById('notifySuccess');
  const form    = document.querySelector('.notify-form');

  const email = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    form.style.borderColor = '#e05555';
    form.style.boxShadow   = '0 0 0 3px rgba(224, 85, 85, 0.12)';
    input.focus();
    setTimeout(() => {
      form.style.borderColor = '';
      form.style.boxShadow   = '';
    }, 1800);
    return;
  }

  // Success state
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Done ✓';
  btn.querySelector('.btn-arrow').style.display = 'none';
  btn.style.background = '#5a8a5a';
  btn.style.color = '#fff';

  input.disabled = true;
  form.style.opacity = '0.6';

  success.classList.add('visible');

  // Optional: POST to a backend or form service
  // fetch('/api/notify', { method: 'POST', body: JSON.stringify({ email }) });
}

/* ─── Keyboard: Enter to notify ─── */
document.getElementById('emailInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleNotify();
});

/* ─── Nav scroll effect ─── */
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;

  if (current > 40) {
    nav.style.background = 'rgba(10,10,10,0.85)';
    nav.style.backdropFilter = 'blur(20px)';
    nav.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
  } else {
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
    nav.style.borderBottom = 'none';
  }

  lastScroll = current;
}, { passive: true });

/* ─── Subtle parallax on orbs (mouse-driven) ─── */
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  orb1.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  orb2.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
}, { passive: true });

/* ─── Pause ticker on hover ─── */
const bannerTrack = document.querySelector('.banner-track');
bannerTrack.addEventListener('mouseenter', () => {
  bannerTrack.style.animationPlayState = 'paused';
});
bannerTrack.addEventListener('mouseleave', () => {
  bannerTrack.style.animationPlayState = 'running';
});

/* ─── Prefers reduced motion ─── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[style*="animation"], .orb, .banner-track').forEach(el => {
    el.style.animation = 'none';
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}
