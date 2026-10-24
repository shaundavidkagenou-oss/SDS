# Shaun David Studios — Official Studio Website

Official website repository for **Shaun David Studios** (**SDS**), an independent game development and software studio based in **Sri Lanka**, founded and led by **Shaun David** (**H.K.S Sathsara**, Founder & CEO).

> *Creating Music · Games · & Everything Beyond*

---

## Studio & Founder Overview

- **Studio**: Shaun David Studios (`SDS`)
- **Location**: Sri Lanka
- **Founder & CEO**: Shaun David (Sri Lankan name: **H.K.S Sathsara**) — recognized as **Best English Announcer in Western Province, Sri Lanka**
- **Contact & Support**: `official.shaundavidstudios@gmail.com`
- **Featured Portfolio**:
  1. **SL BAD BOY — Schoolboy Rush** — Original 3D Sri Lankan endless runner for Web and Android (`Three.js`, `JavaScript`, `Vite`, `Capacitor`, `Web Audio API`)
  2. **SDS Geox Meetings** — Real-time browser-based collaborative visual whiteboard and strategy hub (`React 18`, `TypeScript`, `Node.js`, `WebSockets`)
  3. **RouteMora** — Sri Lanka-first destination discovery guide and deterministic budget-aware trip planner (`React`, `TypeScript`, `Vite`)

---

## Architecture & Tech Stack

This project is built as a **zero-dependency, blazing-fast static website** designed natively for **Cloudflare Pages** (as well as GitHub Pages, Netlify, or any static web server):

- **Pure Semantic HTML5, Modern CSS3, and Vanilla ES6+ JavaScript** — No build step required, zero runtime npm dependencies, zero third-party trackers, and zero external CDN font leaks.
- **Self-Hosted Open-Source Typography** (`assets/fonts/`) — `Cinzel`, `Plus Jakarta Sans`, and `JetBrains Mono` in `.woff2` format (SIL Open Font License 1.1).
- **Mobile & Desktop Engineered** — Responsive layouts down to `320px`, full-height accessible slide-over drawer + persistent mobile quick-navigation thumb dock (`<= 768px`), touch-enabled interactive 3D Sovereign Astrolabe + fingertip gold spark bursts on mobile, desktop pointer spotlight sheens, and full `prefers-reduced-motion: reduce` support.
- **Search Engine & Entity Optimization**:
  - Dedicated pages for the studio (`/`), studio background (`/about/`), founder biography (`/shaun-david/`), portfolio (`/games/`), updates (`/news/`), contact & support (`/contact/`), and custom `404.html`.
  - Valid **Schema.org JSON-LD** structured data (`Organization`, `WebSite`, `Person` with `alternateName: "H.K.S Sathsara"` & announcing recognition, `ProfilePage`, `CollectionPage`, `ContactPage`, and `VideoGame`).
  - Complete Open Graph & Twitter Card metadata with a dedicated `1200×630` emblem card (`/assets/img/og-image.png`), SVG + PNG + ICO favicons, `robots.txt`, `sitemap.xml`, `_headers`, and `_redirects`.

---

## Directory Structure

```text
.
├── index.html                  # Homepage (Hero Astrolabe, SL BAD BOY spotlight, Founder & Studio overview)
├── about/index.html            # Studio mission, engineering values, Sri Lankan roots, emblem anatomy
├── shaun-david/index.html      # Dedicated Founder & CEO biography page (Shaun David / H.K.S Sathsara)
├── games/index.html            # Filterable Games & Software portfolio + interactive 14-district preview
├── news/index.html             # Filterable Studio Announcements, Game Dev Updates & future Patch Notes
├── contact/index.html          # Official Contact & Support hub (official.shaundavidstudios@gmail.com)
├── 404.html                    # Branded 404 fallback page
├── assets/
│   ├── css/
│   │   ├── main.css            # Design tokens, responsive grid, components, mobile drawer & bottom dock
│   │   └── animations.css      # Astrolabe rings, touch & hover physics, stage keyframes, reduced-motion
│   ├── js/
│   │   ├── site-config.js      # Single-file configuration for domain, email, socials, and game release links
│   │   ├── main.js             # Navigation, filters, ident modal, email copy helper, SEO hydration
│   │   └── animations.js       # Desktop & mobile touch astrolabe physics, canvas sparks, district stage
│   ├── img/                    # Official SDS crest extractions, favicons, and 1200x630 Open Graph card
│   └── fonts/                  # Self-hosted WOFF2 fonts + SIL OFL license notice
├── scripts/
│   ├── configure-domain.mjs    # Helper CLI to stamp your production domain into canonical tags & sitemap.xml
│   └── verify-site.mjs         # Automated static verification for links, HTML semantics, SEO, and JSON-LD
├── _headers                    # Cloudflare Pages security & immutable asset cache headers
├── _redirects                  # Cloudflare Pages clean aliases (/founder -> /shaun-david/, etc.)
├── robots.txt                  # Search crawler directives
├── sitemap.xml                 # XML sitemap paths (automatically upgraded to full URLs via configure-domain)
└── site.webmanifest            # Web app manifest
```

---

## Local Preview & Verification

Run the built-in static verifier at any time (requires Node.js 18+):

```bash
node scripts/verify-site.mjs
```

Serve the site locally with any static server, for example Python or `npx serve`:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

---

## Configuring Official Social Links, Game Release URLs & Domain

All studio links and release URLs live in **`assets/js/site-config.js`**:

1. **Official Social Profiles**: Add full `https://` URLs under `socials` (`youtube`, `instagram`, `x`, `linkedin`, `facebook`, `discord`, `tiktok`). Only non-empty URLs are displayed on the website and injected into Schema.org `sameAs` metadata.
2. **Game Play / Download Links & Screenshots**: When *SL BAD BOY — Schoolboy Rush* (or another studio project) launches publicly, populate `playUrl`, `downloadUrl`, `releaseDate`, or `screenshots` in `assets/js/site-config.js`. Play/Download buttons and screenshot galleries appear automatically.
3. **Production Custom Domain (Canonical URLs, Open Graph URLs & Sitemap)**:
   Once your custom domain or `*.pages.dev` URL is live, run:
   ```bash
   node scripts/configure-domain.mjs https://your-official-domain.com
   ```
   This updates `siteUrl` in `assets/js/site-config.js`, stamps `<link rel="canonical">` and `og:url` into every indexable HTML page, writes full absolute `<loc>` URLs into `sitemap.xml`, and adds `Sitemap:` to `robots.txt`.

---

## Deploying to Cloudflare Pages (Free Tier)

1. Push this repository/branch to GitHub (`shaundavidkagenou-oss/SDS`).
2. Sign in to the **Cloudflare Dashboard** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the **`SDS`** repository.
4. Use these exact build settings:
   - **Framework preset**: `None`
   - **Build command**: *(leave blank / empty)*
   - **Build output directory**: `/` (root directory)
5. Click **Save and Deploy**. Cloudflare Pages will deploy the static files globally along with `_headers`, `_redirects`, and `404.html`.
6. *(Optional Custom Domain)*: Under **Custom domains** in your Cloudflare Pages project, add your domain. Cloudflare provisions SSL/TLS automatically at zero cost on the free plan. Once live, run `node scripts/configure-domain.mjs https://your-domain` and push to finalize canonical URLs and `sitemap.xml`, then submit `sitemap.xml` in **Google Search Console**.
