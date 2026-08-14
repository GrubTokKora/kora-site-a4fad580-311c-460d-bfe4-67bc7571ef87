/* JioMed Family Care — interaction layer.
 *
 * Scroll reveal, FAQ accordions, gallery lightbox, and the Kora public-forms
 * submitter. Form fields are collected one by one (never blind-serialised) so
 * the owner's notification email stays readable, per the Kora runtime contract.
 */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function cfg() {
    return window.KORA_SITE_CONFIG || window.KORA_CONFIG || {};
  }

  /* ======================================================================
     Scroll reveal
     ====================================================================== */
  function initReveal() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;

    function revealAll() {
      Array.prototype.forEach.call(nodes, function (n) {
        n.classList.add("is-visible");
      });
    }

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    Array.prototype.forEach.call(nodes, function (n) {
      io.observe(n);
    });

    // Safety net: a tab that is never painted gets no intersections, which would
    // otherwise leave the whole page at opacity 0. Reveal everything regardless
    // once the page has had a fair chance to animate.
    setTimeout(revealAll, 2500);
  }

  /* ======================================================================
     Accordions (FAQ)
     ====================================================================== */
  function initAccordions() {
    var triggers = document.querySelectorAll(".accordion-trigger");
    Array.prototype.forEach.call(triggers, function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".accordion-item");
        if (!item) return;
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  /* ======================================================================
     Gallery lightbox
     ====================================================================== */
  function initLightbox() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    var box = document.querySelector("[data-lightbox-modal]");
    if (!items.length || !box) return;

    var img = box.querySelector("img");
    var index = 0;
    var lastFocused = null;

    function show(i) {
      index = (i + items.length) % items.length;
      var source = items[index];
      var full = source.getAttribute("data-full") || source.querySelector("img").src;
      img.src = full;
      img.alt = source.querySelector("img").alt || "";
    }

    function open(i) {
      lastFocused = document.activeElement;
      show(i);
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var close = box.querySelector(".lightbox-close");
      if (close) close.focus();
    }

    function close() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    items.forEach(function (el, i) {
      el.addEventListener("click", function () {
        open(i);
      });
    });

    box.addEventListener("click", function (e) {
      if (e.target === box) close();
    });

    var closeBtn = box.querySelector(".lightbox-close");
    var prevBtn = box.querySelector(".lightbox-prev");
    var nextBtn = box.querySelector(".lightbox-next");
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (prevBtn) prevBtn.addEventListener("click", function () { show(index - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(index + 1); });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }

  /* ======================================================================
     Kora public forms
     ====================================================================== */
  var recaptchaRequested = false;

  function loadRecaptcha() {
    if (recaptchaRequested) return;
    recaptchaRequested = true;
    var s = document.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }

  function setStatus(form, kind, message) {
    var el = form.querySelector("[data-form-status]");
    if (!el) return;
    el.textContent = message;
    el.className = "form-status is-visible form-status--" + kind;
  }

  function clearStatus(form) {
    var el = form.querySelector("[data-form-status]");
    if (!el) return;
    el.className = "form-status";
    el.textContent = "";
  }

  function markError(field, message) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    wrap.classList.add("has-error");
    var err = wrap.querySelector(".field-error");
    if (err) err.textContent = message;
  }

  function clearErrors(form) {
    Array.prototype.forEach.call(form.querySelectorAll(".field.has-error"), function (f) {
      f.classList.remove("has-error");
    });
  }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function initForms() {
    var forms = document.querySelectorAll("[data-kora-form]");
    if (!forms.length) return;

    var conf = cfg();
    var hasKey = !!conf.recaptchaSiteKey;

    Array.prototype.forEach.call(forms, function (form) {
      var slot = form.querySelector("[data-recaptcha-slot]");
      if (hasKey && slot) {
        slot.className = "g-recaptcha";
        slot.setAttribute("data-sitekey", conf.recaptchaSiteKey);
        form.addEventListener("focusin", loadRecaptcha, { once: true });
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors(form);
        clearStatus(form);

        var apiBaseUrl = (conf.apiBaseUrl || "").replace(/\/+$/, "");
        var businessId = conf.businessId;

        if (!apiBaseUrl || !businessId) {
          setStatus(form, "error", "Form temporarily unavailable. Please call us at (913) 291-0135.");
          return;
        }

        /* --- collect field by field --------------------------------------- */
        var get = function (name) {
          var el = form.elements[name];
          return el && el.value ? el.value.trim() : "";
        };

        var name = get("name");
        var email = get("email");
        var message = get("message");

        var ok = true;
        if (!name) { markError(form.elements.name, "Please enter your name."); ok = false; }
        if (!email) { markError(form.elements.email, "Please enter your email."); ok = false; }
        else if (!EMAIL_RE.test(email)) { markError(form.elements.email, "Please enter a valid email address."); ok = false; }
        if (!message) { markError(form.elements.message, "Please tell us how we can help."); ok = false; }
        if (!ok) {
          setStatus(form, "error", "Please correct the highlighted fields.");
          return;
        }

        var formData = { name: name, email: email, message: message };
        var optional = ["phone", "insurance", "physician", "reason", "address"];
        optional.forEach(function (key) {
          var value = get(key);
          if (value) formData[key] = value;
        });

        /* --- captcha ------------------------------------------------------ */
        var token = "";
        if (hasKey) {
          if (typeof window.grecaptcha === "undefined" || !window.grecaptcha.getResponse) {
            loadRecaptcha();
            setStatus(form, "error", "Security check loading — please try again in a moment.");
            return;
          }
          token = window.grecaptcha.getResponse();
          if (!token) {
            setStatus(form, "error", "Please complete the security check below.");
            return;
          }
        }

        var payload = {
          business_id: businessId,
          form_type: form.getAttribute("data-form-type") || "contact",
          form_data: formData,
          submitter_email: email
        };
        if (token) payload.captcha_token = token;

        var submit = form.querySelector("[type=submit]");
        var original = submit ? submit.textContent : "";
        if (submit) {
          submit.disabled = true;
          submit.textContent = "Sending…";
        }
        setStatus(form, "success", "Sending your request…");

        fetch(apiBaseUrl + "/api/v1/public/forms/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (res) {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json().catch(function () { return {}; });
          })
          .then(function () {
            form.reset();
            if (hasKey && window.grecaptcha && window.grecaptcha.reset) window.grecaptcha.reset();
            setStatus(
              form,
              "success",
              "Thank you — we've received your request. Our team will contact you within one business day. For urgent concerns, please call (913) 291-0135."
            );
          })
          .catch(function () {
            setStatus(
              form,
              "error",
              "We couldn't send your request. Please call us at (913) 291-0135 or email info@jiomedfamilycare.com."
            );
            if (hasKey && window.grecaptcha && window.grecaptcha.reset) window.grecaptcha.reset();
          })
          .then(function () {
            if (submit) {
              submit.disabled = false;
              submit.textContent = original;
            }
          });
      });
    });
  }

  /* ======================================================================
     Hero slideshow (homepage)
     ====================================================================== */
  function initHeroSlideshow() {
    var container = document.querySelector("[data-hero-slideshow]");
    if (!container) return;

    var slides = Array.prototype.slice.call(container.querySelectorAll(".hero-slide"));
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var index = 0;
    var timer = null;
    var delay = 6000;

    function show(next) {
      slides[index].classList.remove("is-active");
      index = (next + slides.length) % slides.length;
      slides[index].classList.add("is-active");
    }

    function start() {
      stop();
      timer = window.setInterval(function () {
        show(index + 1);
      }, delay);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    start();

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });
  }

  /* ======================================================================
     Review carousel — drag, snap, arrows
     ====================================================================== */
  function initReviewCarousel() {
    var root = document.querySelector("[data-review-carousel]");
    if (!root) return;

    var viewport = root.querySelector("[data-review-track]");
    var prev = root.querySelector("[data-review-prev]");
    var next = root.querySelector("[data-review-next]");
    var dotsWrap = root.querySelector("[data-review-dots]");
    var cards = root.querySelectorAll(".review");
    if (!viewport || cards.length < 2) return;

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function gap() {
      var track = viewport.querySelector(".review-carousel-track");
      if (!track) return 16;
      return parseFloat(window.getComputedStyle(track).gap) || 16;
    }

    function step() {
      return cards[0].getBoundingClientRect().width + gap();
    }

    function maxScroll() {
      return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    }

    function pageCount() {
      var s = step();
      if (s <= 0) return 1;
      return Math.max(1, Math.round(maxScroll() / s) + 1);
    }

    function currentPage() {
      var s = step();
      if (s <= 0) return 0;
      return Math.max(0, Math.min(pageCount() - 1, Math.round(viewport.scrollLeft / s)));
    }

    function goTo(page) {
      var s = step();
      var left = Math.max(0, Math.min(maxScroll(), page * s));
      viewport.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" });
    }

    function renderDots() {
      if (!dotsWrap) return;
      var pages = pageCount();
      var page = currentPage();
      if (dotsWrap.childElementCount !== pages) {
        dotsWrap.innerHTML = "";
        var i;
        for (i = 0; i < pages; i++) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "review-carousel-dot";
          btn.setAttribute("aria-label", "Go to reviews " + (i + 1));
          btn.addEventListener(
            "click",
            (function (idx) {
              return function () {
                goTo(idx);
              };
            })(i)
          );
          dotsWrap.appendChild(btn);
        }
      }
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        var on = i === page;
        dot.classList.toggle("is-active", on);
        if (on) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    function updateUi() {
      var left = viewport.scrollLeft;
      if (prev) prev.disabled = left <= 6;
      if (next) next.disabled = left >= maxScroll() - 6;
      renderDots();
    }

    if (prev) {
      prev.addEventListener("click", function () {
        goTo(currentPage() - 1);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        goTo(currentPage() + 1);
      });
    }

    viewport.addEventListener(
      "scroll",
      function () {
        window.requestAnimationFrame(updateUi);
      },
      { passive: true }
    );
    window.addEventListener("resize", function () {
      updateUi();
    });

    viewport.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(currentPage() + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(currentPage() - 1);
      }
    });

    updateUi();
  }

  /* ======================================================================
     Floating call button — hide at footer
     ====================================================================== */
  function initFabCall() {
    var fab = document.querySelector(".fab-call");
    var footer = document.querySelector(".site-footer");
    if (!fab || !footer) return;

    function setHidden(hidden) {
      fab.classList.toggle("is-hidden", hidden);
    }

    if (!("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          setHidden(entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -72px 0px" }
    );

    io.observe(footer);
  }

  /* ======================================================================
     Current-year stamps
     ====================================================================== */
  function initYear() {
    var nodes = document.querySelectorAll("[data-year]");
    var year = String(new Date().getFullYear());
    Array.prototype.forEach.call(nodes, function (n) {
      n.textContent = year;
    });
  }

  ready(function () {
    initReveal();
    initAccordions();
    initLightbox();
    initForms();
    initHeroSlideshow();
    initReviewCarousel();
    initFabCall();
    initYear();
  });
})();
