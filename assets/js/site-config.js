/**
 * ============================================================================
 * SHAUN DAVID STUDIOS — CENTRAL STUDIO CONFIGURATION
 * ============================================================================
 * Edit this file whenever you want to:
 *   1. Set your live custom domain (`siteUrl`) after deploying to Cloudflare Pages
 *      (also run `node scripts/configure-domain.mjs https://your-domain.com`
 *       to stamp static canonical URLs and `sitemap.xml` automatically).
 *   2. Update official studio contact details (`contactEmail`).
 *   3. Add verified official social profiles (`socials`) — empty strings are
 *      automatically hidden across the website and omitted from `sameAs` JSON-LD.
 *   4. Add official play/download links, release dates, or gameplay screenshots
 *      for any studio game or software project.
 *   5. Publish new studio announcements or patch notes (`newsPosts`).
 * ============================================================================
 */
window.SDS_SITE_CONFIG = {
  studioName: "Shaun David Studios",
  shortName: "SDS",
  tagline: "Creating Music · Games · & Everything Beyond",
  country: "Sri Lanka",

  /**
   * Leave blank ("") until your official domain or pages.dev URL is live.
   * Never put placeholder domains like example.com here.
   */
  siteUrl: "",

  /**
   * Founder & CEO Identity
   */
  founder: {
    name: "Shaun David",
    alternateName: "H.K.S Sathsara",
    role: "Founder & CEO",
    country: "Sri Lanka",
    recognition: "Best English Announcer in Western Province, Sri Lanka"
  },

  /**
   * Official Studio Contact & Support Email.
   */
  contactEmail: "official.shaundavidstudios@gmail.com",

  /**
   * Official Social & Store Profiles.
   * Only non-empty valid https:// URLs are rendered on the live site and added
   * to Schema.org `Organization` / `Person` `sameAs` arrays.
   */
  socials: {
    instagram: "https://www.instagram.com/shaun.david.studios/",
    youtube: "",
    x: "",
    linkedin: "",
    discord: "",
    itchio: "",
    playStore: "",
    github: ""
  },

  /**
   * Official Portfolio Projects & Release Links.
   * When a public web build or store listing launches, paste the URL into
   * `playUrl` or `downloadUrl` and the Play / Download buttons will activate!
   */
  projects: {
    "sl-bad-boy": {
      title: "SL BAD BOY — Schoolboy Rush",
      category: "game",
      status: "In Active Development",
      platforms: ["Web Browser", "Android"],
      packageId: "lk.shaun.slbadboy",
      playUrl: "",
      downloadUrl: "",
      releaseDate: "",
      screenshots: []
    },
    "sds-geox-meetings": {
      title: "SDS Geox Meetings",
      category: "software",
      status: "In Development",
      platforms: ["Web Application"],
      playUrl: "",
      downloadUrl: "",
      releaseDate: "",
      screenshots: []
    },
    routemora: {
      title: "RouteMora",
      category: "software",
      status: "Active Project",
      platforms: ["Web Application"],
      playUrl: "",
      downloadUrl: "",
      releaseDate: "",
      screenshots: []
    }
  },

  /**
   * Additional News / Patch Note entries (optional).
   * Static HTML entries in `/news/index.html` are always crawlable without JS;
   * any items added to this array will prepend dynamically to the news feed.
   */
  newsPosts: []
};
