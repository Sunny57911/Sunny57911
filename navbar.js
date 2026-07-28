// ============================================================
// SUNNY KUMAR PORTFOLIO — navbar component
// Renders the station bar + site nav into <div id="site-header"></div>.
// To add a new page to the nav, add ONE line to NAV_LINKS below —
// every page that includes this script will pick it up automatically.
// ============================================================

(function () {
  const NAV_LINKS = [
    { href: 'index.html', label: 'Home' },
    { href: 'academic.html', label: 'Academic' },
    { href: 'professional.html', label: 'Professional' },
    { href: 'projects.html', label: 'Projects' },
    { href: 'skills.html', label: 'Skills' },
    { href: 'contact.html', label: 'Contact' },
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navLinksHTML = NAV_LINKS.map(link => {
    const isActive = link.href === currentPage;
    return `<li><a href="${link.href}"${isActive ? ' class="active"' : ''}>${link.label}</a></li>`;
  }).join('');

  const headerHTML = `
    <div class="station-bar">
      <div class="station-bar__inner">
        <span><span class="station-dot"></span>STATION: SUNNY KUMAR &nbsp;/&nbsp; <span class="hl">28.4595°N, 77.0266°E</span> &nbsp;/&nbsp; GURUGRAM, IN</span>
        <span id="stationTime">--:--:-- IST</span>
      </div>
    </div>

    <nav class="nav">
      <div class="nav__inner">
        <a href="index.html" class="brand"><span class="brand__mark"></span>SUNNY KUMAR</a>
        <button class="navtoggle" id="navToggle"><span></span><span></span><span></span></button>
        <ul class="navlinks" id="navLinks">
          ${navLinksHTML}
        </ul>
      </div>
    </nav>
  `;

  const mount = document.getElementById('site-header');
  if (mount) {
    mount.innerHTML = headerHTML;
  }

  // Mobile nav toggle — wired up right after the markup exists
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  if (navToggle && navLinksEl) {
    navToggle.addEventListener('click', () => {
      navLinksEl.classList.toggle('open');
    });
  }
})();
