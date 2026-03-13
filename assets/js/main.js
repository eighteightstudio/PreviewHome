/* ═══════════════════════════════════════════
   Eight Eight Studio — main.js (final)
   ═══════════════════════════════════════════ */

/* ══ THEME ══ */
const root        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const ttIcon      = document.getElementById('ttIcon');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  ttIcon.textContent = theme === 'dark' ? '☾' : '○';
  localStorage.setItem('88-theme', theme);
}

applyTheme(localStorage.getItem('88-theme') || 'dark');

themeToggle.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ══ CANVAS — geometric bg ══ */
(function () {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeNodes(n) {
    return Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2.5 + 1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDark   = root.getAttribute('data-theme') === 'dark';
    const lineClr  = isDark ? 'rgba(232,255,71,0.09)' : 'rgba(14,14,14,0.07)';
    const nodeClr  = isDark ? 'rgba(232,255,71,0.55)' : 'rgba(14,14,14,0.18)';

    nodes.forEach(a => {
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H) a.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 180) {
          ctx.beginPath();
          ctx.strokeStyle = lineClr;
          ctx.globalAlpha = 1 - d / 180;
          ctx.lineWidth = 0.7;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = nodeClr;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  nodes = makeNodes(22);
  draw();
  window.addEventListener('resize', () => { resize(); });
})();

/* ══ CHIP SCROLL REVEAL ══ */
(function () {
  const chipsRow = document.getElementById('chipsRow');
  if (!chipsRow) return;
  const chips = chipsRow.querySelectorAll('.chip');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      chips.forEach(chip => {
        const delay = chip.getAttribute('data-delay') || 0;
        chip.style.transitionDelay = delay + 'ms';
        chip.classList.add('in');
      });
      observer.disconnect();
    });
  }, { threshold: 0.15 });

  observer.observe(chipsRow);
})();

/* ══ NOTIFY FORM ══ */
async function handleNotify(e) {
  e.preventDefault();

  const btn     = document.getElementById('nbBtn');
  const btnText = document.getElementById('nbBtnText');
  const success = document.getElementById('nbSuccess');
  const form    = document.getElementById('nbForm');

  const name  = document.getElementById('nameInput').value.trim();
  const biz   = document.getElementById('bizInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();

  if (!name || !email) return;

  btn.disabled = true;
  btnText.textContent = 'Sending...';

  try {
    const SUPABASE_URL = 'YOUR_SUPABASE_URL';
    const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';

    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ name, business: biz || null, email }),
    });

    if (!res.ok) throw new Error('Request failed');

    form.style.display  = 'none';
    success.classList.add('show');

  } catch (err) {
    btn.disabled = false;
    btnText.textContent = 'Notify Me';
    console.error('Submission error:', err);
  }
}

/* ══ REDUCED MOTION ══ */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.hl, .status-pill, .subtext, .notify-card').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.animation = 'none';
  });
  document.querySelectorAll('.chip').forEach(c => {
    c.style.transitionDelay = '0ms';
    c.classList.add('in');
  });
}
