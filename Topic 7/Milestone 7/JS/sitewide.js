document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".NavLinks");
    console.log("Sitewide script loaded");
    console.log("Toggle found:", toggle);
    console.log("Nav found:", nav);
    console.log("DOM ready");

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        console.log("Toggle clicked");
        nav.classList.toggle("show");

        const expanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !expanded);
      });
    }
  });
