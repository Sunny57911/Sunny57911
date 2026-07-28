// ============================================================
// SUNNY KUMAR PORTFOLIO — footer component
// Renders the site footer into <footer id="site-footer"></footer>.
// Edit contact links here once; every page picks it up automatically.
// ============================================================

(function () {
  const footerHTML = `
    <div class="footer__inner">
      <span>© 2026 SUNNY KUMAR — GURUGRAM, HARYANA, IN</span>
      <div class="footer__links">
        <a href="mailto:sunny@climatecompatiblefutures.com">EMAIL</a>
        <a href="https://www.linkedin.com/in/sunny57911/" target="_blank" rel="noopener">LINKEDIN</a>
        <a href="https://github.com/Sunny57911" target="_blank" rel="noopener">GITHUB</a>
        <a href="contact.html">CONTACT</a>
      </div>
    </div>
  `;

  const mount = document.getElementById('site-footer');
  if (mount) {
    mount.innerHTML = footerHTML;
  }
})();
