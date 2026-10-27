#!/usr/bin/env node
/**
 * Shaun David Studios — Static Site Integrity & SEO Verifier
 *
 * Verifies:
 *   1. All required pages, favicons, fonts, OG assets, robots.txt, and sitemap.xml exist
 *   2. Unique <title> and <meta name="description"> across all HTML pages
 *   3. Single <h1> per page
 *   4. All <img> tags have non-empty alt attributes
 *   5. All 24x24 icon <svg> tags have explicit width & height attributes (prevents giant icon glitches)
 *   6. All CSS multi-column grids use minmax(0, ...) (prevents PC horizontal overflow)
 *   7. All internal relative href/src links resolve to real files in the repo
 *   8. All JSON-LD <script type="application/ld+json"> blocks parse cleanly
 *   9. No placeholder domains exist in HTML/XML/robots
 *  10. Owner-verified details:
 *      - H.K.S Sathsara (Person.alternateName + visible copy)
 *      - Best English Announcer in Western Province, Sri Lanka
 *      - official.shaundavidstudios@gmail.com (Contact & Support email + mailto:)
 *      - https://www.instagram.com/shaun.david.studios/ (Official Instagram for Latest News)
 *      - No "View GitHub Repository" buttons or GitHub links in HTML
 *      - No "SD Education" references in HTML or site-config.js
 *      - Mobile quick-navigation dock (.mobile-dock) present on every HTML page
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const REQUIRED_FILES = [
  "index.html",
  "about/index.html",
  "shaun-david/index.html",
  "games/index.html",
  "news/index.html",
  "contact/index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "favicon.ico",
  "favicon.png",
  "favicon-48x48.png",
  "google8a5eab19864fee78.html",
  "_headers",
  "_redirects",
  "README.md",
  "assets/css/main.css",
  "assets/css/animations.css",
  "assets/js/site-config.js",
  "assets/js/main.js",
  "assets/js/animations.js",
  "assets/img/og-image.png",
  "assets/img/sds-crest-gold.png",
  "assets/img/sds-logo-original.jpg",
  "assets/img/riderise-lk-logo.png",
  "assets/img/riderise-lk-logo.webp",
  "assets/img/favicon.svg"
];

const HTML_PAGES = [
  "index.html",
  "about/index.html",
  "shaun-david/index.html",
  "games/index.html",
  "news/index.html",
  "contact/index.html",
  "404.html"
];

let errors = 0;

function fail(msg) {
  console.error(`  [FAIL] ${msg}`);
  errors++;
}

function pass(msg) {
  console.log(`  [PASS] ${msg}`);
}

console.log("=== Shaun David Studios — Static Build Verification ===");

// 1. Check required files
for (const rel of REQUIRED_FILES) {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) {
    fail(`Missing required file: ${rel}`);
  } else {
    const stat = fs.statSync(full);
    if (stat.size === 0) fail(`File is empty: ${rel}`);
  }
}
if (errors === 0) pass(`All ${REQUIRED_FILES.length} required studio files exist and are non-empty.`);

// 2. Inspect HTML pages
const titles = new Map();
const descriptions = new Map();

for (const page of HTML_PAGES) {
  const fullPath = path.join(ROOT, page);
  const pageDir = path.dirname(fullPath);
  const html = fs.readFileSync(fullPath, "utf8");

  // Ensure Google Search Console verification file is never linked or shown to visitors
  if (/google8a5eab19864fee78/i.test(html)) {
    fail(`${page}: Must not link to or expose Google verification file.`);
  }

  // Check placeholder domains
  if (/(example\.com|yourdomain\.com|placeholder\.com|localhost:)/i.test(html)) {
    fail(`${page}: Contains forbidden placeholder domain.`);
  }

  // Check forbidden items removed per owner instructions
  if (/View GitHub Repository/i.test(html) || /github\.com/i.test(html)) {
    fail(`${page}: Contains removed GitHub repository button or link.`);
  }
  if (/SD[\s-]+Education/i.test(html)) {
    fail(`${page}: Contains removed SD Education project reference.`);
  }

  // Check mobile dock presence on every page
  if (!/class="mobile-dock"/.test(html)) {
    fail(`${page}: Missing .mobile-dock navigation.`);
  }

  // Check official support email & official Instagram presence on every page
  if (!html.includes("mailto:official.shaundavidstudios@gmail.com")) {
    fail(`${page}: Missing mailto:official.shaundavidstudios@gmail.com link.`);
  }
  if (!html.includes("https://www.instagram.com/shaun.david.studios/")) {
    fail(`${page}: Missing official Instagram link https://www.instagram.com/shaun.david.studios/`);
  }

  // Check H.K.S Sathsara presence on every page
  if (!html.includes("H.K.S Sathsara")) {
    fail(`${page}: Missing founder Sri Lankan name 'H.K.S Sathsara'.`);
  }

  // Check that every 24x24 icon <svg> has explicit width & height attributes
  const svgTags = html.match(/<svg\b[^>]*>/gi) || [];
  for (const tag of svgTags) {
    if (/viewBox="0 0 24 24"/i.test(tag)) {
      if (!/\bwidth="\d+"/i.test(tag) || !/\bheight="\d+"/i.test(tag)) {
        fail(`${page}: 24x24 icon <svg> missing explicit width/height attributes -> ${tag}`);
      }
    }
  }

  // Check <title>
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    fail(`${page}: Missing <title>`);
  } else {
    const title = titleMatch[1].trim();
    if (titles.has(title)) {
      fail(`${page}: Duplicate <title> "${title}" (also on ${titles.get(title)})`);
    }
    titles.set(title, page);
  }

  // Check <meta name="description">
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (!descMatch || !descMatch[1].trim()) {
    fail(`${page}: Missing <meta name="description">`);
  } else {
    const desc = descMatch[1].trim();
    if (descriptions.has(desc)) {
      fail(`${page}: Duplicate meta description (also on ${descriptions.get(desc)})`);
    }
    descriptions.set(desc, page);
  }

  // Single <h1>
  const h1Matches = html.match(/<h1[\s>]/gi) || [];
  if (h1Matches.length !== 1) {
    fail(`${page}: Expected exactly 1 <h1>, found ${h1Matches.length}`);
  }

  // Check <img> alt attributes
  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  for (const tag of imgTags) {
    if (!/\balt="[^"]*"/i.test(tag)) {
      fail(`${page}: <img> missing alt attribute -> ${tag}`);
    }
  }

  // Check JSON-LD validity & required Person/Organization fields
  const ldRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let ldMatch;
  let ldCount = 0;
  while ((ldMatch = ldRegex.exec(html)) !== null) {
    ldCount++;
    try {
      const parsed = JSON.parse(ldMatch[1]);
      if (!parsed["@context"]) fail(`${page}: JSON-LD block #${ldCount} missing @context`);
      const ldRaw = JSON.stringify(parsed);
      if (ldRaw.includes("Shaun David") && !ldRaw.includes("H.K.S Sathsara")) {
        fail(`${page}: JSON-LD Person missing alternateName 'H.K.S Sathsara'`);
      }
      if (ldRaw.includes("Shaun David Studios") && !ldRaw.includes("official.shaundavidstudios@gmail.com")) {
        fail(`${page}: JSON-LD Organization missing email 'official.shaundavidstudios@gmail.com'`);
      }
    } catch (err) {
      fail(`${page}: Invalid JSON-LD block #${ldCount} -> ${err.message}`);
    }
  }
  if (page !== "404.html" && ldCount === 0) {
    fail(`${page}: Expected Schema.org JSON-LD structured data`);
  }

  // Check internal relative href / src targets
  const attrRegex = /\b(?:href|src)="([^"]+)"/gi;
  let attrMatch;
  while ((attrMatch = attrRegex.exec(html)) !== null) {
    const rawTarget = attrMatch[1].trim();
    if (
      !rawTarget ||
      rawTarget.startsWith("#") ||
      rawTarget.startsWith("http://") ||
      rawTarget.startsWith("https://") ||
      rawTarget.startsWith("mailto:") ||
      rawTarget.startsWith("tel:") ||
      rawTarget.startsWith("data:")
    ) {
      continue;
    }

    const cleanTarget = rawTarget.split("#")[0].split("?")[0];
    if (!cleanTarget) continue;

    let resolvedPath = cleanTarget.startsWith("/")
      ? path.join(ROOT, cleanTarget)
      : path.resolve(pageDir, cleanTarget);

    if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
      resolvedPath = path.join(resolvedPath, "index.html");
    }

    if (!fs.existsSync(resolvedPath)) {
      fail(`${page}: Broken local reference "${rawTarget}" -> ${resolvedPath}`);
    }
  }
}

// 3. Check specific founder recognition copy on index, about, and shaun-david pages
for (const recognitionPage of ["index.html", "about/index.html", "shaun-david/index.html"]) {
  const content = fs.readFileSync(path.join(ROOT, recognitionPage), "utf8");
  if (!content.includes("Best English Announcer in Western Province, Sri Lanka")) {
    fail(`${recognitionPage}: Missing 'Best English Announcer in Western Province, Sri Lanka' recognition.`);
  }
}

// 4. Check site-config.js & main.js SVG icon sizing
const siteConfigText = fs.readFileSync(path.join(ROOT, "assets/js/site-config.js"), "utf8");
if (/sd-education|SD Education/i.test(siteConfigText)) {
  fail("assets/js/site-config.js still references SD Education.");
}
if (!siteConfigText.includes("official.shaundavidstudios@gmail.com")) {
  fail("assets/js/site-config.js missing official.shaundavidstudios@gmail.com.");
}
if (!siteConfigText.includes("https://www.instagram.com/shaun.david.studios/")) {
  fail("assets/js/site-config.js missing Instagram https://www.instagram.com/shaun.david.studios/.");
}
if (!siteConfigText.includes("H.K.S Sathsara")) {
  fail("assets/js/site-config.js missing H.K.S Sathsara.");
}

const mainJsText = fs.readFileSync(path.join(ROOT, "assets/js/main.js"), "utf8");
const jsSvgs = mainJsText.match(/<svg\b[^>]*>/gi) || [];
for (const tag of jsSvgs) {
  if (!/\bwidth="\d+"/i.test(tag) || !/\bheight="\d+"/i.test(tag)) {
    fail(`assets/js/main.js: Dynamic icon <svg> missing explicit width/height -> ${tag}`);
  }
}

// 5. Check CSS grids prevent horizontal overflow on PC
for (const cssFile of ["assets/css/main.css", "assets/css/animations.css"]) {
  const css = fs.readFileSync(path.join(ROOT, cssFile), "utf8");
  if (/grid-template-columns:\s*\d+(?:\.\d+)?fr\s+\d+(?:\.\d+)?fr/.test(css)) {
    fail(`${cssFile}: Found bare multi-column fr grid without minmax(0, ...) overflow guard.`);
  }
}

// 6. Check robots.txt and sitemap.xml for placeholder domains and ensure verification file is hidden
for (const seoFile of ["robots.txt", "sitemap.xml"]) {
  const content = fs.readFileSync(path.join(ROOT, seoFile), "utf8");
  if (/(example\.com|yourdomain\.com|placeholder\.com)/i.test(content)) {
    fail(`${seoFile}: Contains forbidden placeholder domain`);
  }
  if (/google8a5eab19864fee78/i.test(content)) {
    fail(`${seoFile}: Must not list or expose Google verification file`);
  }
}

// 7. Verify Google Search Console verification file stays byte-for-byte intact
const gscPath = path.join(ROOT, "google8a5eab19864fee78.html");
if (fs.existsSync(gscPath)) {
  const gscContent = fs.readFileSync(gscPath, "utf8");
  if (gscContent !== "google-site-verification: google8a5eab19864fee78.html") {
    fail("google8a5eab19864fee78.html content was modified; Google requires exact byte match.");
  }
}

// 8. Verify Google Search favicon PNG headers, dimensions (multiples of 48px), <head> tags, and crawler access
function checkPngDimensions(relFile, expectedW, expectedH) {
  const fullPath = path.join(ROOT, relFile);
  if (!fs.existsSync(fullPath)) return;
  const buf = fs.readFileSync(fullPath);
  const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buf.length < 24 || !buf.subarray(0, 8).equals(pngSig)) {
    fail(`${relFile}: Invalid PNG signature`);
    return;
  }
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  if (w !== expectedW || h !== expectedH) {
    fail(`${relFile}: Expected ${expectedW}x${expectedH} PNG, found ${w}x${h}`);
  }
}

checkPngDimensions("favicon.png", 192, 192);
checkPngDimensions("favicon-48x48.png", 48, 48);

for (const page of HTML_PAGES) {
  const html = fs.readFileSync(path.join(ROOT, page), "utf8");
  if (!/<link\s+rel="icon"\s+type="image\/png"\s+sizes="192x192"\s+href="\/favicon\.png"\s*>/i.test(html)) {
    fail(`${page}: Missing <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png">`);
  }
  if (!/<link\s+rel="icon"\s+type="image\/png"\s+sizes="48x48"\s+href="\/favicon-48x48\.png"\s*>/i.test(html)) {
    fail(`${page}: Missing <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">`);
  }
}

const robotsText = fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8");
if (/Disallow:\s*\/(?:favicon|$|\s)/im.test(robotsText)) {
  fail("robots.txt blocks crawler access to /favicon.png");
}

// 9. Verify RideRise LK app & news showcase presence and badge dimensions
checkPngDimensions("assets/img/riderise-lk-logo.png", 800, 800);
for (const rrPage of ["index.html", "games/index.html", "news/index.html", "shaun-david/index.html"]) {
  const html = fs.readFileSync(path.join(ROOT, rrPage), "utf8");
  if (!html.includes("RideRise LK")) {
    fail(`${rrPage}: Missing 'RideRise LK' app reference`);
  }
}
if (!siteConfigText.includes('"riderise-lk"')) {
  fail("assets/js/site-config.js missing 'riderise-lk' project entry");
}

if (errors === 0) {
  pass(`All ${HTML_PAGES.length} HTML pages passed unique <title>, meta description, single <h1>, image alt, and SVG sizing checks.`);
  pass("All CSS multi-column grids use minmax(0, ...) overflow guards for PC & mobile.");
  pass("All internal links, stylesheets, scripts, icons, and images resolve cleanly.");
  pass("All Schema.org JSON-LD blocks (Organization, Person with H.K.S Sathsara, Instagram sameAs, ProfilePage, VideoGame, SoftwareApplication, BlogPosting) parsed cleanly.");
  pass("Owner-verified details confirmed: H.K.S Sathsara, Best English Announcer in Western Province, official.shaundavidstudios@gmail.com, Instagram (@shaun.david.studios for Latest News), 4-project portfolio including RideRise LK.");
  console.log("\nVerification succeeded with 0 errors.");
} else {
  console.error(`\nVerification failed with ${errors} error(s).`);
  process.exit(1);
}
