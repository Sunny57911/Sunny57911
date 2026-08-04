/* ==========================================================================
   home.js — specialization HUD carousel.
   Replaces the old iframe-embedded portfolio_graphic.html with a native
   in-page component so it shares the site's fonts, palette, and motion
   instead of living in an isolated document.
   ========================================================================== */

(function () {
  "use strict";

  var categories = [
    { name: "Meteorologist", icon: "fa-solid fa-cloud-sun" },
    { name: "Atmospheric\nSciences", icon: "fa-solid fa-cloud" },
    { name: "Energy\n(Renewables)", icon: "fa-solid fa-bolt" },
    { name: "Climate\nChange", icon: "fa-solid fa-earth-asia" },
    { name: "Python", icon: "fa-solid fa-code" },
    { name: "MATLAB / R", icon: "fa-solid fa-database" },
    { name: "Environment", icon: "fa-solid fa-leaf" },
    { name: "GIS", icon: "fa-solid fa-globe" },
    { name: "PyPSA", icon: "fa-solid fa-solar-panel" },
    { name: "Data\nScience", icon: "fa-solid fa-robot" },
    { name: "Cyclonic\nEvents", icon: "fa-solid fa-hurricane" },
    { name: "R&D", icon: "fa-solid fa-magnifying-glass" },
    { name: "AI / ML", icon: "fa-solid fa-brain" },
    { name: "Visualization", icon: "fa-solid fa-eye" },
    { name: "Automation", icon: "fa-solid fa-gears" },
    { name: "Analytics", icon: "fa-solid fa-book" },
    { name: "Sustainability", icon: "fa-solid fa-recycle" },
    { name: "ESG &\nDisclosures", icon: "fa-solid fa-scale-balanced" },
    { name: "Policy &\nStrategy", icon: "fa-solid fa-compass" }
  ];

  document.addEventListener("DOMContentLoaded", function () {
    var iconEl = document.getElementById("specIcon");
    var labelEl = document.getElementById("specLabel");
    var displayEl = document.getElementById("specDisplay");
    var progressBar = document.getElementById("specProgressBar");
    var tallyEl = document.getElementById("specTally");
    var prevBtn = document.getElementById("specPrev");
    var nextBtn = document.getElementById("specNext");

    if (!iconEl || !labelEl) return;

    var index = 0;
    var ROTATE_MS = 2600;
    var timer = null;
    var progressStart = null;
    var rafId = null;

    function render(i) {
      var cat = categories[i];
      displayEl.classList.add("spec-fade-out");
      window.setTimeout(function () {
        iconEl.className = "spec-icon " + cat.icon;
        labelEl.textContent = cat.name;
        displayEl.classList.remove("spec-fade-out");
      }, 180);
      if (tallyEl) tallyEl.textContent = String(i + 1).padStart(2, "0") + " / " + String(categories.length).padStart(2, "0");
    }

    function animateProgress(duration) {
      cancelAnimationFrame(rafId);
      progressStart = performance.now();
      function step(now) {
        var elapsed = now - progressStart;
        var pct = Math.min(100, (elapsed / duration) * 100);
        if (progressBar) progressBar.style.width = pct + "%";
        if (pct < 100) rafId = requestAnimationFrame(step);
      }
      rafId = requestAnimationFrame(step);
    }

    function goTo(i, restart) {
      index = (i + categories.length) % categories.length;
      render(index);
      if (restart !== false) restartTimer();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function restartTimer() {
      window.clearInterval(timer);
      cancelAnimationFrame(rafId);
      if (progressBar) progressBar.style.width = "0%";
      animateProgress(ROTATE_MS);
      timer = window.setInterval(next, ROTATE_MS);
    }

    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);

    var panel = document.getElementById("specPanel");
    if (panel) {
      panel.addEventListener("mouseenter", function () {
        window.clearInterval(timer);
        cancelAnimationFrame(rafId);
      });
      panel.addEventListener("mouseleave", restartTimer);
    }

    render(index);
    restartTimer();
  });
})();
