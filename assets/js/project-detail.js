/* ==========================================================================
   project-detail.js — shared zoom-modal behavior for every live dashboard
   page. Each page just needs the same three elements (id="embedShell",
   id="zoomModal", data-src on the shell) — no per-page script duplication.
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var shell = document.getElementById("embedShell");
    var modal = document.getElementById("zoomModal");
    if (!shell || !modal) return;

    var src = shell.getAttribute("data-src");
    var modalIframe = modal.querySelector("iframe");

    function open() {
      if (modalIframe && !modalIframe.src) modalIframe.src = src;
      modal.classList.add("is-open");
    }
    function close() {
      modal.classList.remove("is-open");
    }

    shell.addEventListener("click", open);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) close();
    });
    var closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  });
})();
