#!/usr/bin/env node
/**
 * ============================================================================
 * SHAUN DAVID STUDIOS — PRODUCTION DOMAIN CONFIGURATOR
 * Zero-dependency Node.js script to stamp the verified live HTTPS domain into:
 *   - sitemap.xml
 *   - robots.txt
 *   - assets/js/site-config.js
 *   - <link rel="canonical">, Open Graph URLs, and Schema.org JSON-LD in HTML
 *
 * Usage:
 *   node scripts/configure-domain.mjs https://your-live-domain
 *
 * Or in Cloudflare Pages (optional build command):
 *   PUBLIC_SITE_URL=https://shaundavidstudios.com node scripts/configure-domain.mjs
 * ============================================================================
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const rawInput =
  process.argv[2] ||
  process.env.PUBLIC_SITE_URL ||
  process.env.CF_PAGES_URL ||
  "";

if (!rawInput.trim()) {
  console.log(
    "[configure-domain] No domain argument or PUBLIC_SITE_URL supplied. Keeping domain-neutral static files untouched."
  );
  process.exit(0);
}

let parsed;
try {
  parsed = new URL(rawInput.trim());
} catch {
  console.error(`[configure-domain] Invalid URL: "${rawInput}"`);
  process.exit(1);
}

if (parsed.protocol !== "https:") {
  console.error("[configure-domain] Production site URL must use https://");
  process.exit(1);
}

const host = parsed.hostname.toLowerCase();
const FORBIDDEN_HOSTS = ["example.com", "localhost", "127.0.0.1", "0.0.0.0"];
if (
  FORBIDDEN_HOSTS.includes(host) ||
  host.endsWith(".example.com") ||
  host.includes("placeholder") ||
  host.includes("yourdomain") ||
  host.includes("your-real-domain") ||
  host.includes("your-live-domain")
) {
  console.error(
    `[configure-domain] Refusing placeholder or local domain "${host}". Supply only the real deployed HTTPS domain.`
  );
  process.exit(1);
}

const origin = parsed.origin;
const today = new Date().toISOString().slice(0, 10);

const ROUTES = [
  { file: "index.html", route: "/", priority: "1.0" },
  { file: "about/index.html", route: "/about/", priority: "0.9" },
  { file: "shaun-david/index.html", route: "/shaun-david/", priority: "0.9" },
  { file: "games/index.html", route: "/games/", priority: "0.9" },
  { file: "news/index.html", route: "/news/", priority: "0.8" },
  { file: "contact/index.html", route: "/contact/", priority: "0.8" }
];

// 1. Write valid sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${origin}${r.route}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemapXml, "utf8");

// 2. Write robots.txt with absolute Sitemap URL
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
fs.writeFileSync(path.join(ROOT, "robots.txt"), robotsTxt, "utf8");

// 3. Update siteUrl in assets/js/site-config.js
const configPath = path.join(ROOT, "assets/js/site-config.js");
let configSrc = fs.readFileSync(configPath, "utf8");
configSrc = configSrc.replace(
  /siteUrl:\s*"[^"]*"/,
  `siteUrl: "${origin}"`
);
fs.writeFileSync(configPath, configSrc, "utf8");

// 4. Stamp canonical, og:url, absolute og:image, and JSON-LD URLs in each HTML page
for (const { file, route } of ROUTES) {
  const fullPath = path.join(ROOT, file);
  const pageUrl = `${origin}${route}`;
  let html = fs.readFileSync(fullPath, "utf8");

  // Remove any previous canonical or og:url before stamping cleanly
  html = html.replace(/\s*<link rel="canonical" href="[^"]*">/g, "");
  html = html.replace(/\s*<meta property="og:url" content="[^"]*">/g, "");

  html = html.replace(
    /(<meta name="robots" content="index, follow">)/,
    `$1\n  <link rel="canonical" href="${pageUrl}">`
  );

  html = html.replace(
    /(<meta property="og:type" content="[^"]*">)/,
    `$1\n  <meta property="og:url" content="${pageUrl}">`
  );

  html = html.replace(
    /<meta property="og:image" content="[^"]*">/g,
    `<meta property="og:image" content="${origin}/assets/img/og-image.png">`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*">/g,
    `<meta name="twitter:image" content="${origin}/assets/img/og-image.png">`
  );

  // Enhance JSON-LD block with absolute URLs
  html = html.replace(
    /(<script type="application\/ld\+json">\s*)([\s\S]*?)(\s*<\/script>)/,
    (_m, open, jsonRaw, close) => {
      const data = JSON.parse(jsonRaw);
      const graph = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
      for (const node of graph) {
        if (node["@type"] === "Organization") {
          node.url = `${origin}/`;
          if (node.logo && typeof node.logo === "object") {
            node.logo.url = `${origin}/assets/img/sds-logo-original.jpg`;
          }
          if (node.image) {
            node.image = `${origin}/assets/img/og-image.png`;
          }
        }
        if (node["@type"] === "Person") {
          node.url = `${origin}/shaun-david/`;
        }
        if (node["@type"] === "WebSite") {
          node.url = `${origin}/`;
        }
        if (
          ["AboutPage", "ProfilePage", "CollectionPage", "ContactPage"].includes(
            node["@type"]
          )
        ) {
          node.url = pageUrl;
        }
        if (node["@type"] === "VideoGame") {
          node.url = `${origin}/games/#sl-bad-boy`;
        }
      }
      const formatted = JSON.stringify(data, null, 2)
        .split("\n")
        .map((line, idx) => (idx === 0 ? line : "  " + line))
        .join("\n");
      return `${open}${formatted}${close}`;
    }
  );

  fs.writeFileSync(fullPath, html, "utf8");
}

console.log(`[configure-domain] Configured production origin: ${origin}`);
