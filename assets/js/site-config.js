/**
 * ============================================================================
 * SHAUN DAVID STUDIOS — OFFICIAL WEBSITE CONFIGURATION
 * ============================================================================
 * Edit this file to update public URLs, contact email, social links, project
 * release links, screenshots, or announcements across the entire website.
 *
 * SAFETY & DISPLAY RULES:
 * - Leave any unverified email or URL as an empty string ("").
 * - Empty strings are automatically omitted from buttons, navigation, footers,
 *   and Schema.org JSON-LD `sameAs` arrays — visitors will never see broken
 *   links or "TODO" placeholders.
 * - Once your live Cloudflare Pages or custom HTTPS domain is active, set
 *   `siteUrl` below AND run:
 *     node scripts/configure-domain.mjs https://your-live-domain
 * ============================================================================
 */
window.SDS_SITE_CONFIG = {
  studioName: "Shaun David Studios",
  shortName: "SDS",
  tagline: "Creating Music · Games · & Everything Beyond",
  foundedLocation: "Sri Lanka",

  founder: {
    name: "Shaun David",
    role: "Founder & CEO of Shaun David Studios",
    shortRole: "Founder & CEO",
    location: "Sri Lanka"
  },

  /**
   * Deployed production origin (HTTPS, no trailing slash).
   * Example: "https://shaundavidstudios.com" or "https://sds.pages.dev"
   * Leave "" until the real production URL is verified.
   */
  siteUrl: "",

  /**
   * Official contact email address.
   * Example: "contact@shaundavidstudios.com"
   * When set, live `mailto:` buttons and one-click copy tools appear on Contact & Footer.
   * Leave "" until a verified studio inbox is ready.
   */
  contactEmail: "",

  /**
   * Studio branding image paths (relative to site root).
   */
  logo: {
    original: "/assets/img/sds-logo-original.jpg",
    crestGold: "/assets/img/sds-crest-gold.png",
    crestIvory: "/assets/img/sds-crest-ivory.png",
    lockupDark: "/assets/img/sds-lockup-dark.png",
    ogImage: "/assets/img/og-image.png"
  },

  /**
   * Official verified public profiles.
   * Only non-empty HTTPS URLs are rendered on the site and included in JSON-LD `sameAs`.
   */
  socials: {
    github: "https://github.com/shaundavidkagenou-oss",
    youtube: "",
    x: "",
    instagram: "",
    linkedin: "",
    discord: "",
    itchio: "",
    playStore: ""
  },

  /**
   * Verified Games & Software Portfolio Configuration.
   * Supply `playUrl`, `downloadUrl`, `releaseDate`, or `screenshots` (array of
   * `{ src: "/assets/img/...", alt: "...", caption: "..." }`) only when verified.
   */
  projects: {
    "sl-bad-boy": {
      id: "sl-bad-boy",
      title: "SL BAD BOY — Schoolboy Rush",
      category: "game",
      status: "In Active Development",
      platforms: "Web Browser & Android",
      packageId: "lk.shaun.slbadboy",
      releaseDate: "",
      playUrl: "",
      downloadUrl: "",
      repoUrl: "https://github.com/shaundavidkagenou-oss/SL-Bad-Boy",
      screenshots: []
    },
    "sds-geox-meetings": {
      id: "sds-geox-meetings",
      title: "SDS Geox Meetings",
      category: "software",
      status: "In Development",
      platforms: "Web Application",
      releaseDate: "",
      playUrl: "",
      downloadUrl: "",
      repoUrl: "https://github.com/shaundavidkagenou-oss/SDS-Geox-Meetings",
      screenshots: []
    },
    "routemora": {
      id: "routemora",
      title: "RouteMora",
      category: "software",
      status: "Active Project",
      platforms: "Web Application",
      releaseDate: "",
      playUrl: "",
      downloadUrl: "",
      repoUrl: "https://github.com/shaundavidkagenou-oss/RouteMora",
      screenshots: []
    },
    "sd-education": {
      id: "sd-education",
      title: "SD Education",
      category: "software",
      status: "Public Web Prototype",
      platforms: "Web Portal (English & Sinhala)",
      releaseDate: "",
      playUrl: "https://shaundavidkagenou-oss.github.io/SD-Education/",
      downloadUrl: "",
      repoUrl: "https://github.com/shaundavidkagenou-oss/SD-Education",
      screenshots: []
    }
  },

  /**
   * Optional quick-publish updates prepended to the News & Development Updates page.
   * Each entry format:
   * {
   *   id: "2026-11-update",
   *   date: "November 2026",
   *   isoDate: "2026-11-01",
   *   category: "game-dev", // "announcement" | "game-dev" | "software" | "patch-notes"
   *   categoryLabel: "Game Development",
   *   title: "Update Title",
   *   summary: "Factual summary paragraph.",
   *   linkUrl: "",
   *   linkLabel: ""
   * }
   */
  additionalUpdates: []
};
