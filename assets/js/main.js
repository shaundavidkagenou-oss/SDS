/**
 * ============================================================================
 * SHAUN DAVID STUDIOS — CORE INTERACTIVITY & CONFIG HYDRATION (main.js)
 * Zero external dependencies. Graceful progressive enhancement.
 * ============================================================================
 */
(function () {
  "use strict";

  var config = window.SDS_SITE_CONFIG || {};

  var SOCIAL_META = {
    github: {
      label: "GitHub",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.39-3.88-1.39-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.02 11.02 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.27 5.67.42.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>'
    },
    youtube: {
      label: "YouTube",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.27 3.6-6.27 3.6Z"/></svg>'
    },
    x: {
      label: "X (Twitter)",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"/></svg>'
    },
    instagram: {
      label: "Instagram",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>'
    },
    linkedin: {
      label: "LinkedIn",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95V21h-4V9Z"/></svg>'
    },
    discord: {
      label: "Discord",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.8a13.7 13.7 0 0 0-.64 1.32 18.27 18.27 0 0 0-5.52 0A13.7 13.7 0 0 0 8.6 2.8a19.74 19.74 0 0 0-4.93 1.57C.56 9.04-.29 13.58.13 18.06a19.9 19.9 0 0 0 6.03 3.06c.49-.66.92-1.36 1.29-2.1a12.9 12.9 0 0 1-2.03-.98c.17-.12.34-.25.5-.38a14.17 14.17 0 0 0 12.16 0c.17.13.33.26.5.38-.65.39-1.33.72-2.03.98.37.74.8 1.44 1.29 2.1a19.84 19.84 0 0 0 6.03-3.06c.5-5.19-.85-9.69-3.55-13.69ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.96 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z"/></svg>'
    },
    itchio: {
      label: "itch.io",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7.5 6.5 4h11L20 7.5v3a2.5 2.5 0 0 1-4 2 2.5 2.5 0 0 1-4 0 2.5 2.5 0 0 1-4 0 2.5 2.5 0 0 1-4-2v-3Z"/><path d="M5 12.5V20h14v-7.5"/><path d="M9.5 16h5"/></svg>'
    },
    playStore: {
      label: "Google Play",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.6 2.2c-.38.4-.6 1.02-.6 1.82v15.96c0 .8.22 1.42.6 1.82l.1.09L12.64 13v-.2L3.7 2.1l-.1.1Zm11.98 13.78-2.98-2.98v-.2l2.98-2.98.07.04 3.53 2c1.01.57 1.01 1.51 0 2.08l-3.53 2-.07.04ZM15.65 16 12.64 13 3.6 22.04c.34.36.9.4 1.53.05L15.65 16Zm0-8L5.13 1.91c-.63-.35-1.19-.31-1.53.05L12.64 11l3.01-3Z"/></svg>'
    }
  };

  function isValidHttpsUrl(value) {
    if (typeof value !== "string") return false;
    var trimmed = value.trim();
    if (!trimmed) return false;
    try {
      var parsed = new URL(trimmed);
      if (parsed.protocol !== "https:") return false;
      var host = parsed.hostname.toLowerCase();
      if (
        host === "example.com" ||
        host.endsWith(".example.com") ||
        host.indexOf("placeholder") !== -1 ||
        host.indexOf("yourdomain") !== -1
      ) {
        return false;
      }
      return true;
    } catch (_err) {
      return false;
    }
  }

  function isValidEmail(value) {
    if (typeof value !== "string") return false;
    var trimmed = value.trim();
    if (!trimmed) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return false;
    var domain = trimmed.split("@")[1].toLowerCase();
    if (
      domain === "example.com" ||
      domain.endsWith(".example.com") ||
      domain.indexOf("placeholder") !== -1 ||
      domain.indexOf("yourdomain") !== -1
    ) {
      return false;
    }
    return true;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* 1. Mobile Navigation Drawer */
  function initMobileNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-primary-nav]");
    var backdrop = document.querySelector("[data-nav-backdrop]");
    if (!toggle || !nav) return;

    function closeNav() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
      nav.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-visible");
      document.body.classList.remove("nav-open");
    }

    function openNav() {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close navigation menu");
      nav.classList.add("is-open");
      if (backdrop) backdrop.classList.add("is-visible");
      document.body.classList.add("nav-open");
    }

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeNav();
      else openNav();
    });

    if (backdrop) {
      backdrop.addEventListener("click", closeNav);
    }

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 880 && nav.classList.contains("is-open")) {
        closeNav();
      }
    });
  }

  /* 2. Verified Social Profiles Hydration */
  function getVerifiedSocials() {
    var socials = config.socials || {};
    var list = [];
    Object.keys(SOCIAL_META).forEach(function (key) {
      var url = socials[key];
      if (isValidHttpsUrl(url)) {
        list.push({
          key: key,
          url: url.trim(),
          label: SOCIAL_META[key].label,
          icon: SOCIAL_META[key].icon
        });
      }
    });
    return list;
  }

  function hydrateSocialLists() {
    var verified = getVerifiedSocials();
    var containers = document.querySelectorAll("[data-social-list]");

    containers.forEach(function (container) {
      var wrapper = container.closest("[data-social-section]");
      if (verified.length === 0) {
        container.innerHTML = "";
        if (wrapper) wrapper.hidden = true;
        return;
      }

      if (wrapper) wrapper.hidden = false;
      var variant = container.getAttribute("data-social-list") || "pills";

      if (variant === "footer-links") {
        container.innerHTML = verified
          .map(function (item) {
            return (
              '<li><a href="' +
              escapeHtml(item.url) +
              '" target="_blank" rel="noopener noreferrer">' +
              item.icon +
              "<span>" +
              escapeHtml(item.label) +
              "</span></a></li>"
            );
          })
          .join("");
      } else {
        container.innerHTML = verified
          .map(function (item) {
            return (
              '<li><a class="social-pill" href="' +
              escapeHtml(item.url) +
              '" target="_blank" rel="noopener noreferrer" aria-label="Shaun David Studios on ' +
              escapeHtml(item.label) +
              '">' +
              item.icon +
              "<span>" +
              escapeHtml(item.label) +
              "</span></a></li>"
            );
          })
          .join("");
      }
    });
  }

  /* 3. Configurable Contact Email Hydration (Zero Fake Forms / Broken Links) */
  function hydrateContactEmail() {
    var email = isValidEmail(config.contactEmail) ? config.contactEmail.trim() : "";

    var footerEmailSlots = document.querySelectorAll("[data-footer-email]");
    footerEmailSlots.forEach(function (slot) {
      if (!email) {
        slot.hidden = true;
        slot.innerHTML = "";
      } else {
        slot.hidden = false;
        slot.innerHTML =
          '<a href="mailto:' +
          escapeHtml(email) +
          '">' +
          escapeHtml(email) +
          "</a>";
      }
    });

    var contactHub = document.querySelector("[data-contact-hub]");
    if (!contactHub) return;

    var configuredView = contactHub.querySelector("[data-email-configured]");
    var unconfiguredView = contactHub.querySelector("[data-email-unconfigured]");

    if (!email) {
      if (configuredView) configuredView.hidden = true;
      if (unconfiguredView) unconfiguredView.hidden = false;
      return;
    }

    if (unconfiguredView) unconfiguredView.hidden = true;
    if (configuredView) {
      configuredView.hidden = false;
      var addrEl = configuredView.querySelector("[data-email-display]");
      var primaryBtn = configuredView.querySelector("[data-email-mailto]");
      var subjectLinks = configuredView.querySelectorAll("[data-email-subject]");
      var copyBtn = configuredView.querySelector("[data-email-copy]");
      var copyStatus = configuredView.querySelector("[data-email-copy-status]");

      if (addrEl) addrEl.textContent = email;
      if (primaryBtn) primaryBtn.setAttribute("href", "mailto:" + email);

      subjectLinks.forEach(function (link) {
        var subject = link.getAttribute("data-email-subject") || "Studio Inquiry";
        link.setAttribute(
          "href",
          "mailto:" + email + "?subject=" + encodeURIComponent(subject)
        );
      });

      if (copyBtn && navigator.clipboard) {
        copyBtn.addEventListener("click", function () {
          navigator.clipboard.writeText(email).then(function () {
            if (copyStatus) {
              copyStatus.textContent = "Email address copied to clipboard.";
              setTimeout(function () {
                copyStatus.textContent = "";
              }, 3000);
            }
          });
        });
      }
    }
  }

  /* 4. Configurable Project Links, Release Dates & Screenshots */
  function hydrateProjects() {
    var projects = config.projects || {};

    Object.keys(projects).forEach(function (id) {
      var proj = projects[id];
      if (!proj) return;

      var actionsSlot = document.querySelector('[data-project-actions="' + id + '"]');
      if (actionsSlot) {
        var buttons = [];

        if (isValidHttpsUrl(proj.playUrl)) {
          var playLabel =
            proj.category === "game" ? "Play Official Build" : "Open Live Web App";
          buttons.push(
            '<a class="btn btn--primary btn--sm" href="' +
              escapeHtml(proj.playUrl.trim()) +
              '" target="_blank" rel="noopener noreferrer">' +
              escapeHtml(playLabel) +
              "</a>"
          );
        }

        if (isValidHttpsUrl(proj.downloadUrl)) {
          buttons.push(
            '<a class="btn btn--secondary btn--sm" href="' +
              escapeHtml(proj.downloadUrl.trim()) +
              '" target="_blank" rel="noopener noreferrer">Download Verified Release</a>'
          );
        }

        if (isValidHttpsUrl(proj.repoUrl)) {
          buttons.push(
            '<a class="btn btn--ghost btn--sm" href="' +
              escapeHtml(proj.repoUrl.trim()) +
              '" target="_blank" rel="noopener noreferrer">View GitHub Repository</a>'
          );
        }

        if (buttons.length > 0) {
          actionsSlot.innerHTML = buttons.join("");
        }
      }

      var releaseSlot = document.querySelector('[data-project-release="' + id + '"]');
      if (releaseSlot && proj.releaseDate && String(proj.releaseDate).trim()) {
        releaseSlot.textContent = String(proj.releaseDate).trim();
      }

      var gallerySlot = document.querySelector('[data-project-screenshots="' + id + '"]');
      if (gallerySlot && Array.isArray(proj.screenshots) && proj.screenshots.length > 0) {
        var validShots = proj.screenshots.filter(function (s) {
          return s && typeof s.src === "string" && s.src.trim().length > 0;
        });
        if (validShots.length > 0) {
          gallerySlot.hidden = false;
          gallerySlot.innerHTML = validShots
            .map(function (shot) {
              return (
                "<figure>" +
                '<img src="' +
                escapeHtml(shot.src.trim()) +
                '" alt="' +
                escapeHtml(shot.alt || proj.title + " screenshot") +
                '" loading="lazy">' +
                (shot.caption
                  ? "<figcaption>" + escapeHtml(shot.caption) + "</figcaption>"
                  : "") +
                "</figure>"
              );
            })
            .join("");
        }
      }
    });
  }

  /* 5. Optional Additional News Updates Hydration & Category Filtering */
  function hydrateNewsAndFilters() {
    var feed = document.querySelector("[data-news-feed]");
    var extra = Array.isArray(config.additionalUpdates) ? config.additionalUpdates : [];

    if (feed && extra.length > 0) {
      var prependedHtml = extra
        .filter(function (u) {
          return u && u.title && u.summary;
        })
        .map(function (u) {
          var cat = u.category || "announcement";
          var catLabel = u.categoryLabel || "Studio Update";
          var dateStr = u.date || "";
          var iso = u.isoDate || "";
          var linkHtml =
            isValidHttpsUrl(u.linkUrl) || (typeof u.linkUrl === "string" && u.linkUrl.startsWith("/"))
              ? '<p style="margin-top:1rem;"><a class="btn btn--ghost btn--sm" href="' +
                escapeHtml(u.linkUrl) +
                '">' +
                escapeHtml(u.linkLabel || "Read Details") +
                "</a></p>"
              : "";

          return (
            '<article class="sds-card news-entry" data-filter-item="' +
            escapeHtml(cat) +
            '">' +
            '<div class="news-entry__meta">' +
            (dateStr
              ? '<time class="news-entry__date"' +
                (iso ? ' datetime="' + escapeHtml(iso) + '"' : "") +
                ">" +
                escapeHtml(dateStr) +
                "</time>"
              : "") +
            '<span class="badge badge--status">' +
            escapeHtml(catLabel) +
            "</span>" +
            "</div>" +
            '<div class="news-entry__body">' +
            "<h2>" +
            escapeHtml(u.title) +
            "</h2>" +
            "<p>" +
            escapeHtml(u.summary) +
            "</p>" +
            linkHtml +
            "</div>" +
            "</article>"
          );
        })
        .join("");

      feed.insertAdjacentHTML("afterbegin", prependedHtml);
    }

    document.querySelectorAll("[data-filter-group]").forEach(function (group) {
      var targetSelector = group.getAttribute("data-filter-group");
      var scope = targetSelector ? document.querySelector(targetSelector) : document;
      if (!scope) return;

      var buttons = group.querySelectorAll("[data-filter]");
      var emptyMsg = scope.querySelector("[data-filter-empty]");

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var filterVal = btn.getAttribute("data-filter") || "all";
          buttons.forEach(function (b) {
            var active = b === btn;
            b.classList.toggle("is-active", active);
            b.setAttribute("aria-pressed", active ? "true" : "false");
          });

          var items = scope.querySelectorAll("[data-filter-item]");
          var visibleCount = 0;

          items.forEach(function (item) {
            var categories = (item.getAttribute("data-filter-item") || "").split(/\s+/);
            var matches = filterVal === "all" || categories.indexOf(filterVal) !== -1;
            item.hidden = !matches;
            if (matches) visibleCount++;
          });

          if (emptyMsg) {
            emptyMsg.hidden = visibleCount > 0;
          }
        });
      });
    });
  }

  /* 6. JSON-LD & Canonical Runtime Enhancement (When siteUrl / socials / email updated in config) */
  function enhanceStructuredData() {
    var verifiedSocials = getVerifiedSocials().map(function (s) {
      return s.url;
    });
    var siteUrl = isValidHttpsUrl(config.siteUrl)
      ? config.siteUrl.trim().replace(/\/+$/, "")
      : "";
    var email = isValidEmail(config.contactEmail) ? config.contactEmail.trim() : "";

    if (siteUrl && !document.querySelector('link[rel="canonical"]')) {
      var link = document.createElement("link");
      link.rel = "canonical";
      link.href = siteUrl + window.location.pathname;
      document.head.appendChild(link);
    }

    var ldScripts = document.querySelectorAll('script[type="application/ld+json"]');
    ldScripts.forEach(function (scriptEl) {
      try {
        var data = JSON.parse(scriptEl.textContent);
        var graph = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
        var updated = false;

        graph.forEach(function (node) {
          if (!node || typeof node !== "object") return;
          if (node["@type"] === "Organization" || node["@type"] === "Person") {
            if (verifiedSocials.length > 0) {
              node.sameAs = verifiedSocials;
              updated = true;
            } else {
              delete node.sameAs;
              updated = true;
            }
          }
          if (node["@type"] === "Organization" && email) {
            node.email = email;
            updated = true;
          }
          if (siteUrl && node["@type"] === "Organization" && !node.url) {
            node.url = siteUrl + "/";
            updated = true;
          }
        });

        if (updated) {
          scriptEl.textContent = JSON.stringify(data, null, 2);
        }
      } catch (_e) {
        /* Keep valid static JSON-LD untouched */
      }
    });
  }

  /* 7. Interactive Shaun David Studios Production Ident Modal */
  function initStudioIdentModal() {
    var modal = document.getElementById("sds-ident-modal");
    if (!modal) return;

    var openBtns = document.querySelectorAll("[data-open-ident]");
    var closeBtns = modal.querySelectorAll("[data-close-ident]");
    var timerId = null;
    var lastFocused = null;
    var reducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function playIdentChord() {
      if (reducedMotion) return;
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      try {
        var ctx = new AudioCtx();
        var now = ctx.currentTime;
        var freqs = [146.83, 220.0, 293.66, 369.99, 440.0]; // Warm D major harmonic voicing
        freqs.forEach(function (f, idx) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = idx === 0 ? "triangle" : "sine";
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.032 / (idx + 1), now + 0.45);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + 3.3);
        });
        setTimeout(function () {
          if (ctx && typeof ctx.close === "function") ctx.close();
        }, 3500);
      } catch (_err) {
        /* Audio synthesis optional */
      }
    }

    function closeIdent() {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    }

    function openIdent() {
      lastFocused = document.activeElement;
      modal.classList.remove("is-open");
      void modal.offsetWidth; // Restart CSS ident sequence cleanly
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      playIdentChord();

      var closeBtn = modal.querySelector("[data-close-ident]");
      if (closeBtn) closeBtn.focus();

      timerId = setTimeout(closeIdent, reducedMotion ? 2200 : 4300);
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener("click", openIdent);
    });

    closeBtns.forEach(function (btn) {
      btn.addEventListener("click", closeIdent);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeIdent();
      }
    });
  }

  function init() {
    initMobileNav();
    hydrateSocialLists();
    hydrateContactEmail();
    hydrateProjects();
    hydrateNewsAndFilters();
    enhanceStructuredData();
    initStudioIdentModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
