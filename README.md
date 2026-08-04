# Sunny Kumar — Portfolio

## Latest revision

- **Theme**: back to dark (instrument-panel / atmospheric-data palette). All
  colors still live in `assets/css/tokens.css` — edit that one file to
  re-theme everything.
- **Station bar removed** from the top of every page; a small live IST clock
  now sits in the footer instead.
- **Home page** "About Me" is now two short paragraphs; the fuller detail
  (bullets, positions, links) lives on the **About** page.
- **CV download**: `assets/files/Sunny_Kumar_CV.pdf`, linked from the navbar
  (every page), the home hero, and the About page header.
- **About page** now has a "Current Positions" section (Research Manager @
  Climate Compatible Futures, Managing Director & Founder @ GERINEXGEN
  Foundation, both linked to their sites) and a "Find me online" row with
  LinkedIn, GitHub, and ResearchGate.
- **Experience page**: the old horizontal "ascent" chart (which overlapped on
  mobile) is replaced with a vertical "Career at a glance" timeline — a
  simple, responsive rail of role / company / year that stacks cleanly on
  any screen width.
- **Projects page**: "Live" / "Coming soon" badges and the coming-soon modal
  are removed. Cards for projects with a live dashboard link straight to it;
  the rest are plain info cards (status isn't tracked in the UI).
- **Work email removed** everywhere (footer, contact page, form fallback) —
  personal email only.

## Structure

- `index.html`, `about.html`, `experience.html`, `expertise.html`,
  `projects.html`, `contact.html`
- `state-energy-database-jharkhand.html`, `state-energy-database-ner.html` —
  live dashboard detail pages (Plotly embeds in `assets/data/`)
- `assets/css/tokens.css` — **edit this file to re-theme the whole site**
- `assets/css/*.css` — one file per shared component or page
- `assets/js/components.js` — navbar, footer (incl. the live clock),
  back-to-top, scroll-reveal (shared by every page)
- `assets/js/{home,about,expertise,projects,contact,project-detail}.js` —
  per-page behavior (the Experience page's career timeline is static HTML,
  no JS needed)
- `assets/files/Sunny_Kumar_CV.pdf` — downloadable CV

## Adding a new page

1. Copy any existing page as a starting point.
2. Keep the two mount points near the top/bottom of `<body>`:
   ```html
   <div class="atmos-field" aria-hidden="true"></div>
   <div id="site-header-mount"></div>
   ...
   <div id="site-footer-mount"></div>
   <script src="assets/js/components.js"></script>
   ```
3. To add a nav link, edit the `NAV_LINKS` array near the top of
   `assets/js/components.js` — every page picks it up automatically.

## Updating the CV

The CV is generated from `gen_cv.py` (not included in this export) using
reportlab. To edit content, update the experience/education/skills text on
the About and Experience pages first, then regenerate the PDF to match, or
edit the PDF directly with any PDF editor.
