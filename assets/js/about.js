/* ==========================================================================
   about.js — competency radar chart (SVG, drawn to match the site palette).
   ========================================================================== */

(function () {
  "use strict";

  var skills = [
    { label: "Climate & Weather Modelling", value: 95 },
    { label: "Data Engineering (Xarray/NetCDF)", value: 90 },
    { label: "Programming (Py/R/MATLAB)", value: 88 },
    { label: "Machine Learning", value: 85 },
    { label: "Energy Systems (PyPSA)", value: 85 },
    { label: "Statistical Analysis", value: 80 },
    { label: "GIS & Spatial Analysis", value: 75 }
  ];

  function drawRadar() {
    var svg = document.getElementById("radarChart");
    if (!svg) return;

    var cx = 210, cy = 210, R = 150;
    var n = skills.length;
    var levels = 4;
    var html = "";

    for (var l = 1; l <= levels; l++) {
      var r = (R / levels) * l;
      var pts = [];
      for (var i = 0; i < n; i++) {
        var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        pts.push((cx + r * Math.cos(angle)).toFixed(1) + "," + (cy + r * Math.sin(angle)).toFixed(1));
      }
      html += '<polygon points="' + pts.join(" ") + '" fill="none" stroke="var(--glass-border-strong)" stroke-width="1"/>';
    }

    for (var i2 = 0; i2 < n; i2++) {
      var angle2 = (Math.PI * 2 * i2) / n - Math.PI / 2;
      var x = cx + R * Math.cos(angle2), y = cy + R * Math.sin(angle2);
      html += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="var(--glass-border-strong)" stroke-width="1"/>';
    }

    var dataPts = [];
    skills.forEach(function (s, i) {
      var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      var r = (R * s.value) / 100;
      dataPts.push((cx + r * Math.cos(angle)).toFixed(1) + "," + (cy + r * Math.sin(angle)).toFixed(1));
    });
    html += '<polygon points="' + dataPts.join(" ") + '" fill="rgba(47,141,125,0.18)" stroke="var(--teal-500)" stroke-width="2"/>';

    skills.forEach(function (s, i) {
      var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      var r = (R * s.value) / 100;
      var x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
      html += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="4" fill="var(--amber-500)"/>';
    });

    skills.forEach(function (s, i) {
      var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      var lx = cx + (R + 34) * Math.cos(angle), ly = cy + (R + 34) * Math.sin(angle);
      html +=
        '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" dominant-baseline="middle" ' +
        'font-family="IBM Plex Mono, monospace" font-size="10" fill="var(--ink-500)">' + (i + 1) + "</text>";
    });

    svg.innerHTML = html;

    var legend = document.getElementById("legendList");
    if (legend) {
      legend.innerHTML = skills
        .map(function (s, i) {
          return "<li><span>" + (i + 1) + ". " + s.label + "</span><b>" + s.value + "%</b></li>";
        })
        .join("");
    }
  }

  document.addEventListener("DOMContentLoaded", drawRadar);
})();
