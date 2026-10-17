/* ==========================================================
   ARIE CLASSIC EVENTS — INTERACTIONS & TRACKING CONFIG
   Beginner note: edit the values in CONFIG to customize behavior.
   Tracking scripts load only when you add a real ID.
   ========================================================== */

const CONFIG = {
  // Carousel advances automatically every 3 seconds (3000 milliseconds).
  carouselIntervalMs: 3000,

  // Main business contact. International format without + or spaces for WhatsApp.
  whatsappNumber: "256701983907",
  whatsappMessage: "Hello Arie Classic Events, I'd like to discuss a cake or event decoration enquiry.",

  // Paste real IDs here when accounts are ready. Leave empty to keep disabled.
  analytics: {
    ga4MeasurementId: "" // Example format: G-XXXXXXXXXX
  },
  pixels: {
    metaPixelId: "",     // Meta Events Manager Pixel ID
    tiktokPixelId: ""    // TikTok Ads Manager Pixel ID
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNavigation();
  setupCarousel();
  setupWhatsAppCTA();
  setupBackToTop();
  setCurrentYear();
  setupTrackingPlaceholders();
});

function setupMobileNavigation() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!button || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
  };

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    document.body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

function setupCarousel() {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
  const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
  const previousButton = carousel.querySelector(".carousel-prev");
  const nextButton = carousel.querySelector(".carousel-next");
  const toggleButton = carousel.querySelector("[data-carousel-toggle]");
  const toggleLabel = carousel.querySelector("[data-toggle-label]");
  const currentSlideLabel = carousel.querySelector("[data-current-slide]");
  const totalSlidesLabel = carousel.querySelector("[data-total-slides]");

  if (!slides.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
  let timerId = null;
  let isPausedByUser = reducedMotion.matches;
  let isHoveredOrFocused = false;
  let touchStartX = null;

  if (totalSlidesLabel) totalSlidesLabel.textContent = String(slides.length).padStart(2, "0");

  function renderSlide(nextIndex) {
    activeIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const active = index === activeIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });

    dots.forEach((dot, index) => {
      const active = index === activeIndex;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    if (currentSlideLabel) {
      currentSlideLabel.textContent = String(activeIndex + 1).padStart(2, "0");
    }
  }

  function stopTimer() {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function startTimerIfAllowed() {
    stopTimer();
    if (isPausedByUser || isHoveredOrFocused || reducedMotion.matches || slides.length < 2) return;
    timerId = window.setInterval(() => renderSlide(activeIndex + 1), CONFIG.carouselIntervalMs);
  }

  function goTo(index) {
    renderSlide(index);
    startTimerIfAllowed();
  }

  previousButton?.addEventListener("click", () => goTo(activeIndex - 1));
  nextButton?.addEventListener("click", () => goTo(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => goTo(index)));

  toggleButton?.addEventListener("click", () => {
    isPausedByUser = !isPausedByUser;
    toggleButton.setAttribute("aria-pressed", String(isPausedByUser));
    if (toggleLabel) toggleLabel.textContent = isPausedByUser ? "Play slideshow" : "Pause slideshow";
    const icon = toggleButton.querySelector('[aria-hidden="true"]');
    if (icon) icon.textContent = isPausedByUser ? "▶" : "Ⅱ";
    startTimerIfAllowed();
  });

  carousel.addEventListener("mouseenter", () => {
    isHoveredOrFocused = true;
    stopTimer();
  });
  carousel.addEventListener("mouseleave", () => {
    isHoveredOrFocused = false;
    startTimerIfAllowed();
  });
  carousel.addEventListener("focusin", () => {
    isHoveredOrFocused = true;
    stopTimer();
  });
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      isHoveredOrFocused = false;
      startTimerIfAllowed();
    }
  });

  carousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(deltaX) > 45) goTo(deltaX > 0 ? activeIndex - 1 : activeIndex + 1);
    touchStartX = null;
  }, { passive: true });

  reducedMotion.addEventListener?.("change", (event) => {
    if (event.matches) stopTimer();
    else startTimerIfAllowed();
  });

  renderSlide(activeIndex);
  if (reducedMotion.matches && toggleButton) {
    toggleButton.setAttribute("aria-pressed", "true");
    if (toggleLabel) toggleLabel.textContent = "Play slideshow";
    const icon = toggleButton.querySelector('[aria-hidden="true"]');
    if (icon) icon.textContent = "▶";
  }
  startTimerIfAllowed();
}

function setupWhatsAppCTA() {
  const message = encodeURIComponent(CONFIG.whatsappMessage);
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function setupBackToTop() {
  const button = document.querySelector(".back-to-top");
  if (!button) return;

  const updateVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > 650);
  };
  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
}

function setCurrentYear() {
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}

/*
 * TRACKING PLACEHOLDERS
 * These loaders are intentionally dormant until a valid ID is configured.
 * Add a consent-management solution before activating advertising pixels if required.
 * Test IDs with each platform's own helper / diagnostics after deployment.
 */
function setupTrackingPlaceholders() {
  const ga4Id = CONFIG.analytics.ga4MeasurementId.trim();
  if (/^G-[A-Z0-9]+$/i.test(ga4Id)) loadGoogleAnalytics(ga4Id);

  const metaId = CONFIG.pixels.metaPixelId.trim();
  if (/^\d{5,}$/.test(metaId)) loadMetaPixel(metaId);

  const tiktokId = CONFIG.pixels.tiktokPixelId.trim();
  if (/^[A-Z0-9_-]{5,}$/i.test(tiktokId)) loadTikTokPixel(tiktokId);
}

function loadGoogleAnalytics(measurementId) {
  if (window.__arieGa4Loaded) return;
  window.__arieGa4Loaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
}

function loadMetaPixel(pixelId) {
  if (window.__arieMetaLoaded) return;
  window.__arieMetaLoaded = true;
  /* Meta Pixel base code placeholder; configure only after reviewing consent/privacy needs. */
  (function(f,b,e,v,n,t,s) {
    if (f.fbq) return;
    n = f.fbq = function() { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    t = b.createElement(e); t.async = true; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

function loadTikTokPixel(pixelId) {
  if (window.__arieTikTokLoaded) return;
  window.__arieTikTokLoaded = true;
  /* TikTok Pixel base code placeholder; verify ID and consent configuration before launch. */
  (function(w,d,t) {
    w.TiktokAnalyticsObject = t;
    const ttq = w[t] = w[t] || [];
    ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
    ttq.setAndDefer = function(target, method) {
      target[method] = function() { target.push([method].concat(Array.prototype.slice.call(arguments, 0))); };
    };
    for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.load = function(id) {
      const url = "https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._i = ttq._i || {};
      ttq._i[id] = [];
      ttq._i[id]._u = url;
      ttq._t = ttq._t || {};
      ttq._t[id] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[id] = {};
      const script = d.createElement("script");
      script.type = "text/javascript"; script.async = true; script.src = url + "?sdkid=" + id + "&lib=" + t;
      const first = d.getElementsByTagName("script")[0];
      first.parentNode.insertBefore(script, first);
    };
    ttq.load(pixelId);
    ttq.page();
  })(window, document, "ttq");
}
