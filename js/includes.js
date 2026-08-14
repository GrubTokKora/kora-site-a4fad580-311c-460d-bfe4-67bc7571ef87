/* JioMed Family Care — shared constants and site chrome behaviour.
 *
 * The header and footer are rendered statically into every page rather than
 * injected here: crawlers and the growth-scan auditor read the raw HTML, so
 * NAP details, nav links and social profiles must be in the served markup.
 * This file only enhances that markup — drawer, dropdowns, sticky state.
 */
(function () {
  "use strict";

  var PHONE = "+19132910135";
  var PHONE_DISPLAY = "(913) 291-0135";
  var FAX = "+19132910046";
  var FAX_DISPLAY = "(913) 291-0046";
  var EMAIL = "info@jiomedfamilycare.com";
  var ADDRESS = "11213 Nall Ave Ste 100, Leawood, KS 66211";
  var MAPS = "https://maps.app.goo.gl/uydjeEFA5wATkqZb6";
  var BOOK = "https://patientportal.advancedmd.com/157502/onlinescheduling/v2?streamlineOptions=2";
  var PORTAL = "https://pp-wfe-101.advancedmd.com/157502/account/logon";
  var REVIEW = "https://g.page/r/CU2y_ooO2oTMEB0/review";

  var SOCIALS = {
    facebook: "https://www.facebook.com/profile.php?id=61553130548609",
    instagram: "https://www.instagram.com/jiomed_familycare",
    google: MAPS
  };

  window.JIOMED = {
    PHONE: PHONE,
    PHONE_DISPLAY: PHONE_DISPLAY,
    FAX: FAX,
    FAX_DISPLAY: FAX_DISPLAY,
    EMAIL: EMAIL,
    ADDRESS: ADDRESS,
    MAPS: MAPS,
    BOOK: BOOK,
    PORTAL: PORTAL,
    REVIEW: REVIEW,
    SOCIALS: SOCIALS
  };

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var header = document.querySelector("[data-header]");
    var toggle = document.querySelector("[data-nav-open]");
    var drawer = document.querySelector("[data-mobile-nav]");
    var scrim = document.querySelector("[data-nav-scrim]");
    var closeBtn = document.querySelector("[data-nav-close]");

    /* Sticky header shadow ------------------------------------------------ */
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-stuck", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* Mobile drawer ------------------------------------------------------- */
    var lastFocused = null;

    function openDrawer() {
      if (!drawer) return;
      lastFocused = document.activeElement;
      drawer.classList.add("is-open");
      if (scrim) scrim.classList.add("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var first = drawer.querySelector("a, button");
      if (first) first.focus();
    }

    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove("is-open");
      if (scrim) scrim.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    if (toggle) toggle.addEventListener("click", openDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (scrim) scrim.addEventListener("click", closeDrawer);
    if (drawer) {
      drawer.addEventListener("click", function (e) {
        var link = e.target.closest("a");
        if (link && link.getAttribute("href") && link.getAttribute("href").charAt(0) === "#") closeDrawer();
      });
      // Keep tab focus inside the open drawer.
      drawer.addEventListener("keydown", function (e) {
        if (e.key !== "Tab" || !drawer.classList.contains("is-open")) return;
        var items = drawer.querySelectorAll("a, button");
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });
    }

    /* Mobile "All Services" accordion ------------------------------------- */
    // The label is a plain link to services.html; only this chevron toggles the
    // sub-list, so tapping either does what it looks like it does.
    var accToggle = document.querySelector("[data-mobile-acc]");
    if (accToggle) {
      var panel = document.getElementById(accToggle.getAttribute("aria-controls"));
      accToggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!panel) return;
        var open = panel.classList.toggle("is-open");
        accToggle.setAttribute("aria-expanded", open ? "true" : "false");
        accToggle.setAttribute("aria-label", open ? "Hide services menu" : "Show services menu");
      });
    }

    /* Desktop dropdowns --------------------------------------------------- */
    var dropdowns = Array.prototype.slice.call(document.querySelectorAll(".nav-dropdown"));

    function closeDropdowns(except) {
      dropdowns.forEach(function (d) {
        if (d === except) return;
        d.classList.remove("is-open");
        var b = d.querySelector("button");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    }

    dropdowns.forEach(function (d) {
      var btn = d.querySelector("button");
      if (!btn) return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = d.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        closeDropdowns(d);
      });
      d.addEventListener("mouseenter", function () {
        if (window.matchMedia("(min-width: 1081px)").matches) {
          d.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
      d.addEventListener("mouseleave", function () {
        if (window.matchMedia("(min-width: 1081px)").matches) {
          d.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("click", function () {
      closeDropdowns(null);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      closeDropdowns(null);
      if (drawer && drawer.classList.contains("is-open")) closeDrawer();
    });
  });
})();
