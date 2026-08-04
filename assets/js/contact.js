/* ==========================================================================
   contact.js — booking tab switcher + custom time request.

   The "Request a Time" form submits directly to Web3Forms, which emails
   the submission straight to Sunny's inbox — no backend to host or
   maintain. The Calendly tab still handles instant self-service booking
   exactly as before. If the network request itself fails (e.g. offline),
   we fall back to opening a pre-filled email so the request is never lost.
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var tabButtons = document.querySelectorAll(".tab-btn");
    var panels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");
        tabButtons.forEach(function (b) { b.classList.remove("is-active"); });
        panels.forEach(function (p) { p.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var panel = document.getElementById(target);
        if (panel) panel.classList.add("is-active");
      });
    });

    var form = document.getElementById("requestForm");
    if (!form) return;
    var statusEl = document.getElementById("requestStatus");
    var submitBtn = form.querySelector("button[type=submit]");

    function mailtoFallback(name, email, date, time, duration, message) {
      var subject = "Meeting request from " + name;
      var bodyLines = [
        "Name: " + name,
        "Email: " + email,
        "Preferred date: " + date,
        "Preferred time: " + time + " IST",
        "Duration: " + duration + " minutes",
        "",
        message || "(no additional message)"
      ];
      var mailto =
        "mailto:sunnykumar57911@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));
      window.location.href = mailto;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("reqName").value.trim();
      var email = document.getElementById("reqEmail").value.trim();
      var date = document.getElementById("reqDate").value;
      var time = document.getElementById("reqTime").value;
      var duration = document.getElementById("reqDuration").value;
      var message = document.getElementById("reqMessage").value.trim();

      if (!name || !email || !date || !time) {
        statusEl.textContent = "Please fill in your name, email, date, and time.";
        return;
      }

      var formData = new FormData(form);
      formData.append("subject", "Meeting request from " + name + " (" + duration + " min, " + date + " " + time + " IST)");
      var payload = Object.fromEntries(formData);

      if (submitBtn) submitBtn.disabled = true;
      statusEl.textContent = "Sending your request…";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          return response.json().then(function (json) { return { ok: response.ok, json: json }; });
        })
        .then(function (result) {
          if (result.ok && result.json.success) {
            statusEl.textContent = "✓ Request sent — I'll get back to you soon.";
            form.reset();
          } else {
            statusEl.textContent = "Couldn't send that — opening an email instead.";
            mailtoFallback(name, email, date, time, duration, message);
          }
        })
        .catch(function () {
          statusEl.textContent = "Network issue — opening an email instead.";
          mailtoFallback(name, email, date, time, duration, message);
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  });
})();
