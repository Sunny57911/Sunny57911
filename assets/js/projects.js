/* ==========================================================================
   projects.js — renders the project grid from one data array and handles
   the type filter chips. Cards for projects with a live dashboard link
   directly to it; the rest show a "Read More" button that opens a modal
   with the full description (no dead links).

   NOTE ON THE DATA: the two live dashboards were previously served by
   mismatched links — one project card pointed at the wrong dataset, and the
   North East India dashboard existed as a file but had no project card at
   all. Both are corrected here so each label matches its actual data.
   ========================================================================== */

(function () {
  "use strict";

  var projects = [
    {
      name: "State Energy Database\nJharkhand",
      type: "Industry Project",
      icon: "fa-solid fa-database",
      // link: "state-energy-database-jharkhand.html",
      description: "Interactive ktoE energy database for Jharkhand, developed through systematic collection and integration of diverse public data sources to support Just Transition planning."
    },
    {
      name: "State Energy Database\nNorth East India (NER)",
      type: "Industry Project",
      icon: "fa-solid fa-globe",
      // link: "state-energy-database-ner.html",
      description: "State-wise energy database spanning the North Eastern Region states of India."
    },
    {
      name: "Energy System Modelling\nJharkhand & Uttar Pradesh",
      type: "Industry Project",
      icon: "fa-solid fa-lightbulb",
      description: "PyPSA-based energy system modelling for Jharkhand and Uttar Pradesh — demand projections, transition pathways, and system-level impact analysis, drawing on ERA5 and TerraClimate data."
    },
    {
      name: "Renewable Resource Assessment\nJharkhand",
      type: "Industry Project",
      icon: "fa-solid fa-solar-panel",
      description: "Solar (utility-scale, rooftop, agricultural, floating), wind, pumped-hydro storage, and bioenergy potential estimated at block, district, and state resolution."
    },
    {
      name: "Downscaling & Bias-Corrected\nERA5 Datasets (Solar/Wind), South Asia",
      type: "Industry Project",
      icon: "fa-solid fa-chart-line",
      description: "High-resolution downscaling of historical ERA5 solar/wind data using Kriging and NWP, with ANN/LSTM/XGBoost stacked models for bias correction across South Asia."
    },
    {
      name: "AI/ML for Summer Monsoon\nRainfall Prediction",
      type: "Academic Research",
      icon: "fa-solid fa-brain",
      description: "ANN, SVR, CNN, and LSTM models for Indian Summer Monsoon Rainfall (ISMR) prediction across homogeneous regions — presented at INTROMET'21."
    },
    {
      name: "WRF Model Simulation\nfor Cyclones",
      type: "Industry Project and Academic Research",
      icon: "fa-solid fa-cloud-sun",
      description: "Nested-domain WRF-ARW simulations using FNL data to track cyclones MAHA and BULBUL, improving cyclone-path accuracy and forecasting."
    },
    {
      name: "Physical & Transition\nRisk Assessment",
      type: "Industry Project",
      icon: "fa-solid fa-umbrella",
      description: "Cyclonic-event analysis using historical ERA5 data and continuous improvement of weather datasets (CMIP5, CMIP6, CORDEX) to score physical and transition risk."
    }
  ];

  var filters = ["All", "Industry Project", "Academic Research"];

  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.getElementById("projectsGrid");
    var filterRow = document.getElementById("projectFilters");
    var modalVeil = document.getElementById("readMoreModal");
    var modalBody = document.getElementById("readMoreModalBody");
    if (!grid) return;

    var activeFilter = "All";

    function matches(project, filter) {
      return filter === "All" || project.type.indexOf(filter) !== -1;
    }

    function openReadMoreModal(project) {
      modalBody.innerHTML =
        "<h3>" + project.name.replace(/\n/g, " ") + "</h3>" +
        "<p>" + project.description + "</p>" +
        '<div class="modal-foot">' +
        '<span class="mono-tag">' + project.type + "</span>" +
        '<a class="btn btn-sm btn-primary" href="contact.html">Ask about this <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>' +
        "</div>";
      modalVeil.classList.add("is-open");
    }

    function closeReadMoreModal() {
      modalVeil.classList.remove("is-open");
    }

    function render() {
      grid.innerHTML = "";
      projects
        .filter(function (p) { return matches(p, activeFilter); })
        .forEach(function (project) {
          var hasLink = !!project.link;
          var el = document.createElement(hasLink ? "a" : "button");
          el.className = "project-card card glass reveal";
          if (hasLink) {
            el.href = project.link;
          } else {
            el.type = "button";
          }

          var iconWrap = document.createElement("span");
          iconWrap.className = "icon-ring";
          var icon = document.createElement("i");
          project.icon.split(" ").forEach(function (c) { icon.classList.add(c); });
          icon.setAttribute("aria-hidden", "true");
          iconWrap.appendChild(icon);

          var title = document.createElement("h3");
          title.textContent = project.name;

          var desc = document.createElement("p");
          desc.className = "project-desc";
          desc.textContent = project.description;

          var foot = document.createElement("div");
          foot.className = "card-foot";
          var typeTag = document.createElement("span");
          typeTag.className = "mono-tag";
          typeTag.textContent = project.type;
          var arrow = document.createElement("span");
          arrow.className = "cta-arrow";
          arrow.innerHTML = (hasLink ? "Open dashboard" : "Read more") + ' <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
          foot.appendChild(typeTag);
          foot.appendChild(arrow);

          el.appendChild(iconWrap);
          el.appendChild(title);
          el.appendChild(desc);
          el.appendChild(foot);

          if (!hasLink) {
            el.addEventListener("click", function () { openReadMoreModal(project); });
          }

          grid.appendChild(el);
        });

      if (window.SiteComponents) window.SiteComponents.observeReveals(grid);
    }

    if (filterRow) {
      filters.forEach(function (f) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "filter-chip" + (f === activeFilter ? " is-active" : "");
        chip.textContent = f;
        chip.addEventListener("click", function () {
          activeFilter = f;
          filterRow.querySelectorAll(".filter-chip").forEach(function (c) { c.classList.remove("is-active"); });
          chip.classList.add("is-active");
          render();
        });
        filterRow.appendChild(chip);
      });
    }

    if (modalVeil) {
      modalVeil.addEventListener("click", function (e) {
        if (e.target === modalVeil) closeReadMoreModal();
      });
      var closeBtn = modalVeil.querySelector(".modal-close");
      if (closeBtn) closeBtn.addEventListener("click", closeReadMoreModal);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeReadMoreModal();
      });
    }

    render();
  });
})();


