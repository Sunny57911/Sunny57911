/* ==========================================================================
   expertise.js — renders the expertise grid from a single data array so
   adding or editing a specialty never means touching the page markup.
   ========================================================================== */

(function () {
  "use strict";

  var expertise = [
    { name: "Programming Languages", description: "Expert in Python, R, MATLAB, and other tools.", icon: "fa-brands fa-python" },
    { name: "Modelling & Analytics", description: "Skilled in modelling and analytics, using data-driven approaches and advanced algorithms to model complex climate and renewable-energy scenarios and support data-driven decision-making.", icon: "fa-solid fa-chart-line" },
    { name: "Weather, Climate &\nGeospatial Data Analysis", description: "Specialist in weather, climate, and geospatial data analysis, leveraging diverse models to extract insights and drive informed decision-making.", icon: "fa-solid fa-cloud-sun" },
    { name: "Machine Learning & AI", description: "Expert in AI/ML for the climate/energy domain, specializing in bias correction and predictive modelling for enhanced climate insights.", icon: "fa-solid fa-brain" },
    { name: "High-Resolution\nWeather Modelling", description: "Uses advanced computational and geospatial models to analyze and optimize resource management and energy solutions.", icon: "fa-solid fa-wind" },
    { name: "Geographic Information\nSystems (GIS)", description: "Expertise in GIS tools for spatial data analysis.", icon: "fa-solid fa-map-location-dot" },
    { name: "Climate Risk Assessment", description: "Analyzing physical and transition risks.", icon: "fa-solid fa-umbrella" },
    { name: "Data Visualization", description: "Creating dashboards and visualizations for analytics.", icon: "fa-solid fa-gauge-high" },
    { name: "Energy Analytics", description: "Big data analytics for insights in energy.", icon: "fa-solid fa-lightbulb" },
    { name: "Numerical Weather\nPrediction", description: "Simulation using advanced numerical methods.", icon: "fa-solid fa-cogs" },
    { name: "Research &\nDevelopment (R&D)", description: "Published work in AI-based rainfall prediction.", icon: "fa-solid fa-book-open" }
  ];

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("expertiseGrid");
    if (!container) return;

    expertise.forEach(function (item, i) {
      var card = document.createElement("div");
      card.className = "expertise-card card glass reveal";

      var iconWrap = document.createElement("span");
      iconWrap.className = "icon-ring";
      var icon = document.createElement("i");
      item.icon.split(" ").forEach(function (cls) { icon.classList.add(cls); });
      icon.setAttribute("aria-hidden", "true");
      iconWrap.appendChild(icon);

      var index = document.createElement("span");
      index.className = "index-tag";
      index.textContent = "SPEC " + String(i + 1).padStart(2, "0");

      var title = document.createElement("h3");
      title.textContent = item.name;

      var desc = document.createElement("p");
      desc.textContent = item.description;

      card.appendChild(iconWrap);
      card.appendChild(index);
      card.appendChild(title);
      card.appendChild(desc);
      container.appendChild(card);
    });

    if (window.SiteComponents) window.SiteComponents.observeReveals(container);
  });
})();
