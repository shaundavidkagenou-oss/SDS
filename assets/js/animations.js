/**
 * ============================================================================
 * SHAUN DAVID STUDIOS — LOGO-SYNCHRONIZED MOTION ENGINE (animations.js)
 * Hardware-accelerated canvas embers & constellations, clockwork astrolabe,
 * 3D/touch card sheen, and SL BAD BOY Sri Lankan district stage controller
 * engineered for BOTH Mobile Touch & Desktop PC.
 * Respects `prefers-reduced-motion: reduce` completely.
 * ============================================================================
 */
(function () {
  "use strict";

  var reducedMotionQuery = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  function prefersReducedMotion() {
    return Boolean(reducedMotionQuery && reducedMotionQuery.matches);
  }

  /* 1. Progressive Scroll Reveal */
  function initScrollReveals() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    document.documentElement.classList.add("js-anim");

    var vh = window.innerHeight || 800;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );

    items.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.96) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    });
  }

  /* 2. Scroll Progress Vernier & Compass Rotation */
  function initScrollTelemetry() {
    var ticking = false;

    function updateScrollVars() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      var docHeight =
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        ) - window.innerHeight;
      var ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

      document.documentElement.style.setProperty(
        "--scroll-progress",
        ratio.toFixed(4)
      );

      if (!prefersReducedMotion()) {
        document.documentElement.style.setProperty(
          "--scroll-deg",
          (scrollTop * 0.16).toFixed(1) + "deg"
        );
      }
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollVars);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateScrollVars();
  }

  /* 3. Interactive Clockwork Compass Astrolabe (Desktop Pointer + Mobile Touch) */
  function initAstrolabe() {
    var rig = document.getElementById("sds-astrolabe");
    if (!rig) return;

    var nodes = rig.querySelectorAll("[data-quadrant]");
    var titleEl = document.getElementById("astrolabe-readout-title");
    var descEl = document.getElementById("astrolabe-readout-desc");

    var QUADRANT_DATA = {
      music: {
        bearing: "-45deg",
        title: "CREST QUADRANT I · MUSIC & SYNTHESIZED AUDIO",
        desc: "Echoing the musical notes in our emblem — original Web Audio synthesis, pentatonic themes, and tactile game soundscapes."
      },
      story: {
        bearing: "45deg",
        title: "CREST QUADRANT II · ORIGINAL WORLDS & CULTURE",
        desc: "Echoing the radiant quill — original concepts, Sri Lankan cities, heritage landmarks, and trilingual worldbuilding."
      },
      software: {
        bearing: "-135deg",
        title: "CREST QUADRANT III · PRECISION SOFTWARE CRAFT",
        desc: "Echoing the inner clockwork gear — real-time collaborative canvases, deterministic trip planners, and resilient web architecture."
      },
      games: {
        bearing: "135deg",
        title: "CREST QUADRANT IV · INDEPENDENT GAME DEVELOPMENT",
        desc: "Echoing the directional D-pad — responsive 3D browser and Android gameplay engineered from the ground up in Sri Lanka."
      }
    };

    function pulseRig() {
      if (prefersReducedMotion()) return;
      rig.classList.remove("is-pulsing");
      void rig.offsetWidth;
      rig.classList.add("is-pulsing");
    }

    function activateQuadrant(key, withShockwave) {
      var info = QUADRANT_DATA[key];
      if (!info) return;

      nodes.forEach(function (n) {
        var active = n.getAttribute("data-quadrant") === key;
        n.classList.toggle("is-active", active);
        n.setAttribute("aria-pressed", active ? "true" : "false");
      });

      rig.style.setProperty("--aim-deg", info.bearing);
      if (titleEl) titleEl.textContent = info.title;
      if (descEl) descEl.textContent = info.desc;
      if (withShockwave) pulseRig();
    }

    nodes.forEach(function (node) {
      var key = node.getAttribute("data-quadrant");
      node.addEventListener("click", function () {
        activateQuadrant(key, true);
      });
      node.addEventListener("mouseenter", function () {
        activateQuadrant(key, false);
      });
    });

    function aimAtClientPoint(clientX, clientY) {
      if (prefersReducedMotion()) return;
      var rect = rig.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = Math.max(-1, Math.min(1, (clientX - cx) / (rect.width / 2)));
      var dy = Math.max(-1, Math.min(1, (clientY - cy) / (rect.height / 2)));

      rig.style.setProperty("--tilt-x", (-dy * 7).toFixed(2) + "deg");
      rig.style.setProperty("--tilt-y", (dx * 7).toFixed(2) + "deg");

      var angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      rig.style.setProperty("--aim-deg", angle.toFixed(1) + "deg");
    }

    function resetTilt() {
      rig.style.setProperty("--tilt-x", "0deg");
      rig.style.setProperty("--tilt-y", "0deg");
    }

    rig.addEventListener("mousemove", function (e) {
      aimAtClientPoint(e.clientX, e.clientY);
    });
    rig.addEventListener("mouseleave", resetTilt);

    rig.addEventListener(
      "touchmove",
      function (e) {
        if (e.touches && e.touches[0]) {
          aimAtClientPoint(e.touches[0].clientX, e.touches[0].clientY);
        }
      },
      { passive: true }
    );
    rig.addEventListener("touchend", resetTilt, { passive: true });
  }

  /* 4. Chamfered Card Spotlight & Tilt (Desktop Hover + Mobile Touch Sheen) */
  function initSpotlightCards() {
    var finePointer =
      window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    var cards = document.querySelectorAll(".sds-card");

    cards.forEach(function (card) {
      function updateCardPoint(clientX, clientY, allowTilt) {
        var rect = card.getBoundingClientRect();
        var x = clientX - rect.left;
        var y = clientY - rect.top;
        card.style.setProperty("--mx", x.toFixed(0) + "px");
        card.style.setProperty("--my", y.toFixed(0) + "px");

        if (allowTilt && !prefersReducedMotion() && !card.hasAttribute("data-no-tilt")) {
          var nx = x / rect.width - 0.5;
          var ny = y / rect.height - 0.5;
          card.style.setProperty("--rx", (-ny * 3.2).toFixed(2) + "deg");
          card.style.setProperty("--ry", (nx * 3.2).toFixed(2) + "deg");
        }
      }

      if (finePointer) {
        card.addEventListener("mousemove", function (e) {
          updateCardPoint(e.clientX, e.clientY, true);
        });
        card.addEventListener("mouseleave", function () {
          card.style.setProperty("--rx", "0deg");
          card.style.setProperty("--ry", "0deg");
        });
      } else {
        card.addEventListener(
          "touchstart",
          function (e) {
            if (e.touches && e.touches[0]) {
              updateCardPoint(e.touches[0].clientX, e.touches[0].clientY, false);
            }
          },
          { passive: true }
        );
      }
    });
  }

  /* 5. Interactive SL BAD BOY — Schoolboy Rush 14-District Stage Controller */
  function initRunnerStages() {
    var DISTRICT_INFO = {
      colombo: {
        banner: "COLOMBO · කොළඹ · DISTRICT 01/14",
        detail: "Colombo Fort approach, Galle Face horizon, standalone Colombo Lotus Tower, and evening bus traffic."
      },
      kandy: {
        banner: "KANDY · මහනුවර · DISTRICT 05/14",
        detail: "Raised hill-country terrain, close atmospheric fog, Kandy Lake, and heritage temple silhouettes."
      },
      ella: {
        banner: "ELLA · ඇල්ල · DISTRICT 08/14",
        detail: "Iconic Nine Arches Bridge, misty tea-country ridges, and hill-country railway tunnel transitions."
      },
      galle: {
        banner: "GALLE · ගාල්ල · DISTRICT 09/14",
        detail: "Galle Fort ramparts, coastal lighthouse beacon, coconut palms, and warm southern sunset horizon."
      },
      anuradhapura: {
        banner: "ANURADHAPURA · අනුරාධපුරය · DISTRICT 11/14",
        detail: "Warm amber atmosphere, monumental ancient stupas, sacred forest corridors, and animated elephants."
      },
      jaffna: {
        banner: "JAFFNA · யாழ்ப்பாணம் · DISTRICT 13/14",
        detail: "Jaffna Fort & Public Library silhouettes, palmyrah palm groves, and northern Tamil/Sinhala/English signage."
      },
      trincomalee: {
        banner: "TRINCOMALEE · திருகோணமலை · DISTRICT 14/14",
        detail: "Natural deep-water harbour horizon and Koneswaram cliff-temple overlook on the eastern coast."
      }
    };

    document.querySelectorAll("[data-runner-stage]").forEach(function (stage) {
      var buttons = stage.querySelectorAll("[data-district-btn]");
      var bannerEl = stage.querySelector("[data-district-banner]");
      var detailEl = stage.querySelector("[data-district-detail]");
      var scenes = stage.querySelectorAll("[data-landmark-scene]");

      function selectDistrict(key) {
        var info = DISTRICT_INFO[key];
        if (!info) return;

        stage.setAttribute("data-district", key);
        if (bannerEl) bannerEl.textContent = info.banner;
        if (detailEl) detailEl.textContent = info.detail;

        buttons.forEach(function (btn) {
          var active = btn.getAttribute("data-district-btn") === key;
          btn.classList.toggle("is-active", active);
          btn.setAttribute("aria-pressed", active ? "true" : "false");
        });

        scenes.forEach(function (scene) {
          var match = scene.getAttribute("data-landmark-scene") === key;
          scene.classList.toggle("is-active", match);
        });
      }

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          selectDistrict(btn.getAttribute("data-district-btn"));
        });
      });
    });
  }

  /* 6. Ambient Forge-Ember & Geometric Compass Canvas (PC + Mobile Touch Sparks!) */
  function initAmbientCanvas() {
    if (prefersReducedMotion()) return;

    var canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var width = 0;
    var height = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var isCoarse =
      window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    var count = isCoarse ? 32 : 54;
    var particles = [];
    var bursts = [];
    var pointer = { x: -9999, y: -9999, active: false };
    var rafId = null;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.18 - Math.random() * 0.4,
        size: 1.1 + Math.random() * 2.1,
        alpha: 0.18 + Math.random() * 0.48,
        diamond: Math.random() > 0.5
      };
    }

    function spawnTouchBurst(x, y) {
      if (bursts.length > 36) return;
      for (var k = 0; k < 7; k++) {
        var angle = (Math.PI * 2 * k) / 7 + Math.random() * 0.4;
        var speed = 1.1 + Math.random() * 1.9;
        bursts.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          size: 1.8 + Math.random() * 1.6
        });
      }
    }

    resize();
    for (var i = 0; i < count; i++) {
      particles.push(createParticle());
    }

    window.addEventListener("resize", resize, { passive: true });

    window.addEventListener(
      "mousemove",
      function (e) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.active = true;
      },
      { passive: true }
    );
    window.addEventListener("mouseleave", function () {
      pointer.active = false;
    });

    window.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches && e.touches[0]) {
          pointer.x = e.touches[0].clientX;
          pointer.y = e.touches[0].clientY;
          pointer.active = true;
          spawnTouchBurst(pointer.x, pointer.y);
        }
      },
      { passive: true }
    );
    window.addEventListener(
      "touchmove",
      function (e) {
        if (e.touches && e.touches[0]) {
          pointer.x = e.touches[0].clientX;
          pointer.y = e.touches[0].clientY;
          pointer.active = true;
        }
      },
      { passive: true }
    );
    window.addEventListener(
      "touchend",
      function () {
        pointer.active = false;
      },
      { passive: true }
    );

    var linkDistSq = isCoarse ? 9200 : 12800;

    function render() {
      if (document.hidden) {
        rafId = window.requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (pointer.active) {
          var dx = p.x - pointer.x;
          var dy = p.y - pointer.y;
          var distSq = dx * dx + dy * dy;
          if (distSq < 19600 && distSq > 1) {
            var dist = Math.sqrt(distSq);
            var force = (140 - dist) / 140;
            p.x += (dx / dist) * force * 1.15;
            p.y += (dy / dist) * force * 1.15;
          }
        }

        if (p.y < -12) {
          p.y = height + 12;
          p.x = Math.random() * width;
        }
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;

        ctx.fillStyle = "rgba(232, 194, 108, " + p.alpha.toFixed(3) + ")";
        if (p.diamond) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var lx = p.x - q.x;
          var ly = p.y - q.y;
          var d2 = lx * lx + ly * ly;
          if (d2 < linkDistSq) {
            var lineAlpha = (1 - d2 / linkDistSq) * 0.085;
            ctx.strokeStyle = "rgba(214, 174, 88, " + lineAlpha.toFixed(3) + ")";
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      /* Render touch spark bursts */
      for (var b = bursts.length - 1; b >= 0; b--) {
        var sp = bursts[b];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.95;
        sp.vy *= 0.95;
        sp.life -= 0.032;
        if (sp.life <= 0) {
          bursts.splice(b, 1);
          continue;
        }
        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = "rgba(246, 226, 168, " + (sp.life * 0.85).toFixed(3) + ")";
        ctx.fillRect(-sp.size, -sp.size, sp.size * 2, sp.size * 2);
        ctx.restore();
      }

      rafId = window.requestAnimationFrame(render);
    }

    rafId = window.requestAnimationFrame(render);

    if (reducedMotionQuery && typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", function (ev) {
        if (ev.matches && rafId) {
          window.cancelAnimationFrame(rafId);
          ctx.clearRect(0, 0, width, height);
        }
      });
    }
  }

  function init() {
    initScrollReveals();
    initScrollTelemetry();
    initAstrolabe();
    initSpotlightCards();
    initRunnerStages();
    initAmbientCanvas();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
