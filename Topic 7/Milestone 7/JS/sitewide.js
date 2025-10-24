document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".NavLinks");

  /* troubleshooting logs uncomment if an issue is present 
  console.log("Sitewide script loaded");
  console.log("Toggle found:", toggle);
  console.log("Nav found:", nav);
  console.log("DOM ready"); */

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      console.log("Toggle clicked");
      nav.classList.toggle("show");

      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !expanded);
    });
  }
});

/* --- Sitewide: Expand Notification --- */
document.addEventListener("DOMContentLoaded", function () {
  window.showExpandNotification = function(message, scrollTarget = null) {
    // Toast creation
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0,0,0,0.85)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = 10000;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);

    if (scrollTarget) {
        scrollTarget.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // scrolls up or down as needed
        });
    }
  };
});
