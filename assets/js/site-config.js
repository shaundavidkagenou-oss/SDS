/**
 * ============================================================================
 * SHAUN DAVID STUDIOS — OFFICIAL WEBSITE CONFIGURATION
 * ============================================================================
 * Edit this file to update public URLs, contact email, social links, project
 * release links, screenshots, or announcements across the entire website.
 *
 * SAFETY & DISPLAY RULES:
 * - Leave any unverified URL as an empty string ("").
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
    alternateName: "H.K.S Sathsara",
    role: "Founder & CEO of Shaun David Studios",
    shortRole: "Founder & CEO",
    recognition: "Best English Announcer in Western Province, Sri Lanka",
    location: "Sri Lanka"
  },

  /**
   * Deployed production origin (HTTPS, no trailing slash).
   * Example: "https://shaundavidstudios.com" or "https://sds.pages.dev"
   * Leave "" until the real production URL is verified.
   */
  siteUrl: "",

  /**
   * Official contact & support email address.
   */
  contactEmail: "official.shaundavidstudios@gmail.com",

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
   * Official verified public social profiles.
   * Add verified HTTPS URLs when ready — empty entries remain hidden automatically.
   */
  socials: {
    youtube: "",
    x: "",
    instagram: "",
    linkedin: "",
    discord: "",
    itchio: "",
    playStore: "",
    github: ""
  },

  /**
   * Verified Games & Software Portfolio Configuration.
   * Supply `playUrl`, `downloadUrl`, `releaseDate`, or `screenshots` (array of
   * `{ src: "/assets/img/...", alt: "...", caption: "..." }`) when publicly released.
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
      screenshots: []
    }
  },

  /**
   * Optional quick-publish updates prepended to the News & Development Updates page.
   */
  additionalUpdates: []
};
