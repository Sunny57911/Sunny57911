/* ==========================================================================
   components.js — shared chrome for every page.
   Renders the station strip + navbar + footer directly as HTML strings
   (no fetch of partial files — this keeps the site fully portable and
   working when opened straight from disk, not just from a web server),
   wires up the mobile menu, active-link highlighting, header scroll state,
   a live station clock, a back-to-top control, and a reusable scroll-reveal
   observer that page scripts can re-trigger after they render dynamic
   content (expertise/projects grids, etc).
   Include this ONE file on every page — nothing else needs to duplicate it.
   ========================================================================== */

(function () {
  "use strict";

  var NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "experience.html", label: "Experience" },
    { href: "expertise.html", label: "Expertise" },
    { href: "projects.html", label: "Projects" },
    { href: "contact.html", label: "Contact" }
  ];

  function currentPage() {
    var path = window.location.pathname.split("/").pop();
    if (!path || path === "") path = "index.html";
    return path;
  }

  function renderNavLinks(page) {
    return NAV_LINKS.map(function (link) {
      var active = link.href === page ? " is-active" : "";
      return '<li><a href="' + link.href + '" class="' + active.trim() + '">' + link.label + "</a></li>";
    }).join("");
  }

  function renderNavbar(page) {
    var links = renderNavLinks(page);
    return (
      '<header class="site-header" id="siteHeader">' +
        '<div class="navbar">' +
          '<a href="index.html" class="logo">' +
            '<img src="assets/img/sunny-kumar.jpg" alt="Sunny Kumar" class="logo-image" />' +
            "<span>Sunny Kumar<small>Meteorologist &amp; Energy Consultant</small></span>" +
          "</a>" +
          '<ul class="nav-links">' + links + "</ul>" +
          '<a href="assets/files/Sunny_Kumar_CV.pdf" class="action_btn action_btn--ghost" download>' +
            '<i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i> CV' +
          "</a>" +
          '<a href="https://www.linkedin.com/in/sunny57911/" class="action_btn" target="_blank" rel="noopener">' +
            '<i class="fa-brands fa-linkedin" aria-hidden="true"></i> LinkedIn' +
          "</a>" +
          '<button class="toggle_btn" aria-label="Toggle menu" aria-expanded="false">' +
            '<i class="fa-solid fa-bars" aria-hidden="true"></i>' +
          "</button>" +
        "</div>" +
        '<ul class="dropdown_menu">' + links +
          '<li><a href="assets/files/Sunny_Kumar_CV.pdf" class="action_btn action_btn--ghost" download>' +
            '<i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i> Download CV</a></li>' +
          '<li><a href="https://www.linkedin.com/in/sunny57911/" class="action_btn" target="_blank" rel="noopener">' +
            '<i class="fa-brands fa-linkedin" aria-hidden="true"></i> LinkedIn</a></li>' +
        "</ul>" +
      "</header>"
    );
  }

  function renderFooter() {
    return (
      '<footer class="site-footer">' +
        '<div class="container footer-inner">' +
          '<div class="footer-brand">Sunny Kumar<span>Meteorologist &amp; Climate/Energy Modelling Consultant</span></div>' +
          '<div class="footer-socials">' +
            '<a href="mailto:sunnykumar57911@gmail.com" aria-label="Email Sunny Kumar"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a>' +
            '<a href="tel:+919309305715" aria-label="Call Sunny Kumar"><i class="fa-solid fa-phone" aria-hidden="true"></i></a>' +
            '<a href="https://www.linkedin.com/in/sunny57911" target="_blank" rel="noopener" aria-label="Sunny Kumar on LinkedIn"><i class="fa-brands fa-linkedin" aria-hidden="true"></i></a>' +
            '<a href="https://github.com/Sunny57911" target="_blank" rel="noopener" aria-label="Sunny Kumar on GitHub"><i class="fa-brands fa-github" aria-hidden="true"></i></a>' +
          "</div>" +
          '<div class="footer-meta">&copy; <span id="footerYear">2026</span> Sunny Kumar — Built on climate data and clean code.</div>' +
          '<div class="footer-clock mono-tag"><span class="station-dot"></span>Gurugram, IN &nbsp;&middot;&nbsp; <span id="stationTime">--:--:-- IST</span></div>' +
        "</div>" +
      "</footer>"
    );
  }

  function wireNavbar() {
    var toggleBtn = document.querySelector(".toggle_btn");
    var toggleIcon = toggleBtn ? toggleBtn.querySelector("i") : null;
    var dropdown = document.querySelector(".dropdown_menu");
    var header = document.querySelector(".site-header");

    if (toggleBtn && dropdown) {
      toggleBtn.addEventListener("click", function () {
        dropdown.classList.toggle("open");
        var isOpen = dropdown.classList.contains("open");
        toggleBtn.setAttribute("aria-expanded", String(isOpen));
        if (toggleIcon) {
          toggleIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        }
      });
    }

    if (dropdown) {
      dropdown.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          dropdown.classList.remove("open");
          if (toggleIcon) toggleIcon.className = "fa-solid fa-bars";
        });
      });
    }

    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  function tickStationClock() {
    var el = document.getElementById("stationTime");
    if (!el) return;
    var now = new Date();
    var opts = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Kolkata" };
    el.textContent = now.toLocaleTimeString("en-GB", opts) + " IST";
  }

  function setupBackToTop() {
    var btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
    document.body.appendChild(btn);

    var toggle = function () {
      btn.classList.toggle("is-shown", window.scrollY > 480);
    };
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var revealObserver = null;
  function getRevealObserver() {
    if (revealObserver) return revealObserver;
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    return revealObserver;
  }

  function observeReveals(root) {
    var scope = root || document;
    var obs = getRevealObserver();
    scope.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
      obs.observe(el);
    });
  }

  function wireFooter() {
    var yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function wireFocusReveal() {
    document.addEventListener("focusin", function (e) {
      var host = e.target.closest && e.target.closest(".reveal:not(.is-visible)");
      if (host) host.classList.add("is-visible");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var page = currentPage();

    var headerMount = document.getElementById("site-header-mount");
    if (headerMount) {
      headerMount.innerHTML = renderNavbar(page);
      wireNavbar();
    }

    var footerMount = document.getElementById("site-footer-mount");
    if (footerMount) {
      footerMount.innerHTML = renderFooter();
      wireFooter();
    }

    setInterval(tickStationClock, 1000);
    tickStationClock();

    setupBackToTop();
    observeReveals();
    wireFocusReveal();
  });

  window.SiteComponents = { observeReveals: observeReveals };
})();
