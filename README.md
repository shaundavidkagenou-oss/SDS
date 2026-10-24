# Shaun David Studios — Official Website

Official static website for **Shaun David Studios (`SDS`)**, an independent game development and software studio based in **Sri Lanka**, founded and led by **Shaun David** (*Founder & CEO of Shaun David Studios*).

> **Studio Motto:** *Creating Music · Games · & Everything Beyond*

---

## Overview

This repository contains a lightweight, zero-backend static HTML, CSS, and vanilla JavaScript website engineered for deployment on **Cloudflare Pages** (or any static web host).

Key characteristics:

- **Authentic Studio Visual Identity:** Dark obsidian, brushed compass gold, and warm engraved ivory aesthetic matched directly to the official Shaun David Studios octagonal crest (`assets/img/sds-logo-original.jpg`).
- **Mobile & Desktop Responsive:** Fluid layout, mobile navigation drawer, interactive Clockwork Compass Astrolabe, and an interactive *SL BAD BOY — Schoolboy Rush* Sri Lankan district preview stage.
- **Accessible & Reduced-Motion Aware:** Semantic landmarks, keyboard focus indicators, skip-to-content navigation, high-contrast typography, and complete `prefers-reduced-motion: reduce` support.
- **Technical SEO Built In:**
  - Unique `<title>` and `<meta name="description">` on every page.
  - Visible semantic HTML readable by search engines even when JavaScript is disabled.
  - Schema.org JSON-LD (`Organization`, `Person`, `ProfilePage`, `VideoGame`, `AboutPage`, `CollectionPage`, `ContactPage`, `WebSite`) establishing the relationship between **Shaun David**, **Shaun David Studios**, and its projects.
  - Self-hosted SIL Open Font License `.woff2` fonts (`Cinzel`, `Plus Jakarta Sans`, `JetBrains Mono`) for fast loading with zero external font dependencies.
  - Open Graph & Twitter link preview metadata (`1200×630` `assets/img/og-image.png`) and multi-format favicons.
- **Honest Configuration:** Unconfigured social profiles, release dates, download links, and email addresses are omitted cleanly from the live site — never exposing fake links, simulated contact forms, or placeholder domains.

---

## Repository Structure

```text
.
├── index.html                  # Home — Studio flagship, interactive SDS Compass Rig, SL BAD BOY preview
├── about/
│   └── index.html              # About the Studio — Purpose, emblem symbolism, Sri Lanka base, leadership
├── shaun-david/
│   └── index.html              # Founder Biography — Dedicated indexable biography of Shaun David (Founder & CEO)
├── games/
│   └── index.html              # Games & Software Portfolio — SL BAD BOY, SDS Geox Meetings, RouteMora, SD Education
├── news/
│   └── index.html              # News & Development Updates — Reusable announcements, devlogs & future patch notes
├── contact/
│   └── index.html              # Contact — Configurable mailto: inquiry hub & verified public channels
├── 404.html                    # Accessible custom 404 page (automatically served by Cloudflare Pages)
├── robots.txt                  # Search engine crawler directives
├── sitemap.xml                 # XML sitemap (populated with real HTTPS domain via scripts/configure-domain.mjs)
├── site.webmanifest            # Web app manifest
├── _headers                    # Cloudflare Pages security and immutable asset caching headers
├── _redirects                  # Clean convenience redirects (/founder -> /shaun-david/, /portfolio -> /games/)
├── favicon.ico                 # Multi-size root favicon (16x16, 32x32, 48x48)
├── assets/
│   ├── css/
│   │   ├── main.css            # Core design system, typography, chamfered obsidian cards, responsive layout
│   │   └── animations.css      # Clockwork astrolabe, golden-hour runner stage, studio ident modal, reduced-motion
│   ├── js/
│   │   ├── site-config.js      # Central configuration file for email, social URLs, project links & site URL
│   │   ├── main.js             # Mobile menu, config hydration, filters, JSON-LD enhancement, studio ident modal
│   │   └── animations.js       # Forge-ember canvas, 3D card spotlight/tilt, district switcher, scroll vernier
│   ├── fonts/                  # Self-hosted WOFF2 fonts (Cinzel, Plus Jakarta Sans, JetBrains Mono) + OFL license
│   └── img/                    # Official SDS logo lockups, extracted gold/ivory crests, favicons & og-image.png
└── scripts/
    ├── configure-domain.mjs    # Optional helper to stamp your real HTTPS domain into canonicals & sitemap.xml
    └── verify-site.mjs         # Automated static link, image, SEO, JSON-LD & safety verification script
```

---

## Local Preview & Verification

No build step or package installation is required to preview or deploy the site.

### 1. Run a local static server

Using Python 3:

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Or using Node (`npx`):

```bash
npx serve . -l 8080
```

Then open `http://localhost:8080/` in your browser.

### 2. Run automated verification checks

```bash
node scripts/verify-site.mjs
```

---

## Owner Customization Checklist (`assets/js/site-config.js`)

All configurable studio details live in **`assets/js/site-config.js`**. Leave any unverified field as `""` — empty fields are automatically hidden on the live website.

1. **Production Site URL (`siteUrl`)**
   - Once deployed to Cloudflare Pages or your custom domain (for example, `https://shaundavidstudios.com`), run:
     ```bash
     node scripts/configure-domain.mjs https://your-real-domain
     ```
   - This updates `siteUrl` in `assets/js/site-config.js`, writes all 6 absolute URLs to `sitemap.xml`, adds `Sitemap: https://your-real-domain/sitemap.xml` to `robots.txt`, and stamps `<link rel="canonical">`, `og:url`, absolute `og:image`, and absolute JSON-LD URLs across every page.
2. **Official Contact Email (`contactEmail`)**
   - Set `contactEmail: "your-verified-inbox@yourdomain.com"` in `assets/js/site-config.js`.
   - When set, the Contact page (`/contact/`) and site footer automatically activate a working `mailto:` button, preset inquiry subjects, and a one-click Copy Email button.
3. **Official Social Profiles (`socials`)**
   - `github` is pre-configured to `https://github.com/shaundavidkagenou-oss`.
   - Add verified HTTPS URLs for `youtube`, `x`, `instagram`, `linkedin`, `discord`, `itchio`, or `playStore` when ready. Configured links automatically appear on Home, Founder Biography, Contact, Footer, and Schema.org `sameAs`.
4. **Game & Project Release Details (`projects`)**
   - For **`sl-bad-boy`** (*SL BAD BOY — Schoolboy Rush*) and other studio projects:
     - `playUrl`: Set when a public playable web URL or Google Play listing is live.
     - `downloadUrl`: Set when a verified public release download is available.
     - `releaseDate`: Set once an official release date is announced.
     - `screenshots`: Add verified gameplay screenshot objects (`{ src: "/assets/img/...", alt: "...", caption: "..." }`) to automatically render a screenshot gallery on `/games/`.
5. **Publishing News, Devlogs & Patch Notes**
   - Either add entries to `additionalUpdates` in `assets/js/site-config.js` for quick updates, or duplicate an `<article class="sds-card news-entry" data-filter-item="...">` block inside `news/index.html` (`announcement`, `game-dev`, `software`, or `patch-notes`).

---

## Deploying to Cloudflare Pages

1. Push this repository to GitHub.
2. Sign in to the **Cloudflare Dashboard** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select this repository (`SDS`).
4. Configure build settings:
   - **Framework preset:** `None`
   - **Build command:**
     - Leave **empty** for pure static deployment, **OR** set `node scripts/configure-domain.mjs` and define an environment variable `PUBLIC_SITE_URL=https://your-real-domain` so canonical tags and `sitemap.xml` are stamped automatically during deployment.
   - **Build output directory:** `/` (leave empty or `/`)
5. Click **Save and Deploy**.
6. Once Cloudflare assigns your live `.pages.dev` URL (or after connecting your custom domain under **Custom domains**), verify the live URL, run `node scripts/configure-domain.mjs https://<your-verified-domain>` if you did not set `PUBLIC_SITE_URL` in step 4, commit the updated `sitemap.xml` and `robots.txt`, and submit `https://<your-verified-domain>/sitemap.xml` in **Google Search Console**.
