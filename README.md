# Eight Eight Studio — Landing Page

> *A creative studio crafting digital experiences.*

This repository contains the official **coming soon / under development** landing page for [Eight Eight Studio](https://www.linkedin.com/company/eighteightstudio).

---

## 📁 Project Structure

```
eighteightstudio/
├── index.html              ← Main landing page
├── README.md               ← You're reading this
├── assets/
│   ├── css/
│   │   └── style.css       ← All styles (dark editorial theme)
│   ├── js/
│   │   └── main.js         ← Interactions & effects
│   └── images/
│       ├── favicon.svg     ← Browser tab icon
│       ├── Logo-88.jpg     ← Studio logo (add your asset here)
│       └── og-image.jpg    ← Open Graph preview image (add your asset here)
```

---

## 🚀 Getting Started

**No build tools required.** This is a pure HTML/CSS/JS site.

### Run locally

```bash
# Option 1: Python (built-in)
python3 -m http.server 3000

# Option 2: Node.js (npx)
npx serve .

# Option 3: VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

Then visit `http://localhost:3000`

---

## 🌐 Deployment

### GitHub Pages (Free & Fast)
1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch → `main` → `/ (root)`**
4. Your site will be live at `https://<username>.github.io/<repo-name>`

### Netlify (Recommended)
1. Drag & drop the project folder at [netlify.com/drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo for auto-deploy on every push
3. Set your custom domain in **Site settings → Domain management**

### Vercel
```bash
npx vercel deploy
```

### Custom Domain
Point your domain's DNS A record to your hosting provider's IP.  
Recommended: add both `www` CNAME and root A record.

---

## 🎨 Customization

### Colors
Edit the CSS variables in `assets/css/style.css`:

```css
:root {
  --bg:    #0a0a0a;   /* Page background */
  --gold:  #c9a96e;   /* Accent color     */
  --text:  #f0ede8;   /* Primary text     */
}
```

### Logo
Replace `assets/images/Logo-88.jpg` with your studio logo.  
Update the `<img>` tag in `index.html` if the filename differs.

### Social Links
Update the `href` values in `index.html` under `.socials`:
- Instagram: `https://www.instagram.com/eighteightagency/`
- Facebook: `https://www.facebook.com/profile.php?id=61587175742097`
- LinkedIn: `https://www.linkedin.com/company/eighteightstudio`

### Email Notify Form
The form is currently UI-only. To wire it to a backend, edit `assets/js/main.js`:

```js
// Inside handleNotify(), after success state is set:
fetch('/api/notify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
```

Recommended free services: **Formspree**, **Mailchimp**, **ConvertKit**, **Brevo**.

---

## ✨ Features

- **Dark editorial design** — serif headline, gold accents, noise texture
- **Animated background** — floating radial orbs, mouse-parallax effect
- **Scrolling ticker banner** — "COMING SOON · EIGHT EIGHT STUDIO ·"
- **Email capture form** — with validation, success state, keyboard support
- **SEO-ready** — Open Graph tags, meta description, favicon
- **Fully responsive** — mobile, tablet, desktop
- **Accessible** — reduced-motion support, semantic HTML, proper contrast
- **Zero dependencies** — no npm, no framework, no build step

---

## 📋 Checklist Before Going Live

- [ ] Add `assets/images/Logo-88.jpg` (your logo file)
- [ ] Add `assets/images/og-image.jpg` (1200×630px, for social previews)
- [ ] Update social media links if changed
- [ ] Wire email form to Formspree / Mailchimp
- [ ] Set `<meta property="og:url">` to your live domain
- [ ] Test on mobile (Chrome DevTools → Toggle device toolbar)
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) check

---

## 📬 Connect

| Platform   | Link |
|------------|------|
| Instagram  | [@eighteightagency](https://www.instagram.com/eighteightagency/) |
| Facebook   | [Eight Eight Studio](https://www.facebook.com/profile.php?id=61587175742097) |
| LinkedIn   | [Eight Eight Studio](https://www.linkedin.com/company/eighteightstudio) |

---

© 2026 Eight Eight Studio. All Rights Reserved.
