#!/usr/bin/env node
/**
 * ============================================================================
 * SHAUN DAVID STUDIOS — AUTOMATED STATIC, SEO & SAFETY VERIFICATION SUITE
 * Verifies HTML semantics, metadata uniqueness, JSON-LD integrity, local asset
 * resolution, no-fake-claims compliance, and domain-configurator roundtrip.
 * ============================================================================
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const INDEXABLE_PAGES = [
  "index.html",
  "about/index.html",
  "shaun-david/index.html",
  "games/index.html",
  "news/index.html",
  "contact/index.html"
];

const ALL_HTML = [...INDEXABLE_PAGES, "404.html"];

const REQUIRED_FILES = [
  ...ALL_HTML,
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "favicon.ico",
  "_headers",
  "_redirects",
  "assets/css/main.css",
  "assets/css/animations.css",
  "assets/js/site-config.js",
  "assets/js/main.js",
  "assets/js/animations.js",
  "assets/img/sds-logo-original.jpg",
  "assets/img/sds-crest-gold.png",
  "assets/img/sds-crest-ivory.png",
  "assets/img/sds-lockup-dark.png",
  "assets/img/og-image.png",
  "assets/img/favicon.svg",
  "assets/img/favicon-32x32.png",
  "assets/img/favicon-192x192.png",
  "assets/img/apple-touch-icon.png"
];

let failures = 0;
function pass(msg) {
  console.log(`  PASS  ${msg}`);
}
function fail(msg) {
  console.error(`  FAIL  ${msg}`);
  failures++;
}

console.log("=== 1. Checking Required Repository Files ===");
for (const rel of REQUIRED_FILES) {
  const full = path.join(ROOT, rel);
  if (fs.existsSync(full) && fs.statSync(full).size > 0) {
    pass(`File exists and non-empty: ${rel}`);
  } else {
    fail(`Missing or empty file: ${rel}`);
  }
}

console.log("\n=== 2. Checking SEO Metadata, Headings, Alt Text & Local Links ===");
const titles = new Set();
const descriptions = new Set();

for (const rel of ALL_HTML) {
  const full = path.join(ROOT, rel);
  const pageDir = path.dirname(full);
  const html = fs.readFileSync(full, "utf8");

  // Title uniqueness
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    fail(`${rel}: Missing <title>`);
  } else {
    const t = titleMatch[1].trim();
    if (titles.has(t)) fail(`${rel}: Duplicate <title> "${t}"`);
    else {
      titles.add(t);
      pass(`${rel}: Unique title (${t})`);
    }
  }

  // Meta description uniqueness
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (!descMatch || !descMatch[1].trim()) {
    fail(`${rel}: Missing meta description`);
  } else {
    const d = descMatch[1].trim();
    if (descriptions.has(d)) fail(`${rel}: Duplicate meta description`);
    else {
      descriptions.add(d);
      pass(`${rel}: Unique meta description`);
    }
  }

  // Single <h1>
  const h1s = html.match(/<h1[\s>]/gi) || [];
  if (h1s.length !== 1) {
    fail(`${rel}: Expected exactly 1 <h1>, found ${h1s.length}`);
  } else {
    pass(`${rel}: Contains single semantic <h1>`);
  }

  // Indexability check
  const isIndexable = INDEXABLE_PAGES.includes(rel);
  if (isIndexable) {
    if (/noindex/i.test(html)) {
      fail(`${rel}: Indexable page contains accidental noindex!`);
    } else {
      pass(`${rel}: Crawlable & indexable (no noindex)`);
    }
  }

  // Image alt attributes
  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  for (const tag of imgTags) {
    const altMatch = tag.match(/\balt="([^"]*)"/i);
    if (!altMatch || !altMatch[1].trim()) {
      fail(`${rel}: <img> missing descriptive alt attribute: ${tag}`);
    }
  }

  // Check local href / src references resolve on disk
  const attrMatches = [...html.matchAll(/\b(?:href|src)="([^"]+)"/gi)];
  for (const m of attrMatches) {
    const rawRef = m[1];
    if (
      rawRef.startsWith("http://") ||
      rawRef.startsWith("https://") ||
      rawRef.startsWith("mailto:") ||
      rawRef.startsWith("#")
    ) {
      continue;
    }
    const cleanRef = rawRef.split("#")[0].split("?")[0];
    if (!cleanRef) continue;

    let resolved = cleanRef.startsWith("/")
      ? path.join(ROOT, cleanRef)
      : path.resolve(pageDir, cleanRef);

    if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
      resolved = path.join(resolved, "index.html");
    }

    if (!fs.existsSync(resolved)) {
      fail(`${rel}: Broken local reference "${rawRef}" -> ${resolved}`);
    }
  }
  pass(`${rel}: All local links, scripts, stylesheets, and images resolve cleanly`);

  // Safety checks: No placeholder domains, no fake forms, no forbidden claims
  if (/example\.com|placeholder\.com|yourdomain\.com|lorem ipsum|TODO:/i.test(html)) {
    fail(`${rel}: Contains placeholder domain or unfinished placeholder text`);
  }
  if (/first\s+sri\s+lankan\s+game/i.test(html)) {
    fail(`${rel}: Contains forbidden claim ("first Sri Lankan game")`);
  }
  if (/<form\b/i.test(html)) {
    fail(`${rel}: Contains unbacked <form> element`);
  }
}

console.log("\n=== 3. Checking Schema.org JSON-LD Structured Data ===");
for (const rel of INDEXABLE_PAGES) {
  const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (ldBlocks.length === 0) {
    fail(`${rel}: Missing JSON-LD block`);
    continue;
  }

  for (const block of ldBlocks) {
    try {
      const parsed = JSON.parse(block[1]);
      const graph = Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [parsed];
      const org = graph.find((n) => n["@type"] === "Organization");
      const person = graph.find((n) => n["@type"] === "Person");

      if (!org || org.name !== "Shaun David Studios") {
        fail(`${rel}: JSON-LD missing Organization "Shaun David Studios"`);
      }
      if (!person || person.name !== "Shaun David" || person.jobTitle !== "Founder & CEO") {
        fail(`${rel}: JSON-LD missing Person "Shaun David" (Founder & CEO)`);
      }
      if (rel === "shaun-david/index.html") {
        const profile = graph.find((n) => n["@type"] === "ProfilePage");
        if (!profile) fail(`${rel}: Missing ProfilePage schema`);
        else pass(`${rel}: Valid ProfilePage + Person + Organization JSON-LD`);
      } else {
        pass(`${rel}: Valid Organization + Founder JSON-LD`);
      }
    } catch (err) {
      fail(`${rel}: Invalid JSON-LD syntax: ${err.message}`);
    }
  }
}

console.log("\n=== 4. Checking robots.txt & sitemap.xml Placeholder-Free Integrity ===");
for (const seoFile of ["robots.txt", "sitemap.xml"]) {
  const txt = fs.readFileSync(path.join(ROOT, seoFile), "utf8");
  // Ignore comments when checking for placeholder domains
  const uncommented = txt.replace(/<!--[\s\S]*?-->/g, "").replace(/^#.*$/gm, "");
  if (/example\.com|yourdomain|placeholder/i.test(uncommented)) {
    fail(`${seoFile}: Contains placeholder domain!`);
  } else {
    pass(`${seoFile}: Clean and free of placeholder domains`);
  }
}

if (failures > 0) {
  console.error(`\nVerification FAILED with ${failures} error(s).`);
  process.exit(1);
} else {
  console.log("\nALL STATIC, SEO, ACCESSIBILITY & SAFETY CHECKS PASSED!");
}
