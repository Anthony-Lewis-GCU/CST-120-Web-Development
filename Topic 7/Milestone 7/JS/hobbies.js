document.addEventListener("DOMContentLoaded", () => {
  const posters = document.querySelectorAll(".AnimePoster");
  const descriptions = document.querySelectorAll(".AnimeDescription");
  const defaultDescription = document.getElementById("DefaultAnimeDescription");

  const animeMap = {
    SAO: "SAODescription",
    AOT: "AOTDescription",
    BlackClover: "BlackCloverDescription",
    Bleach: "BleachDescription",
    Avatar: "AvatarDescription"
  };

  function hideAllDescriptions() {
    descriptions.forEach(desc => {
      desc.style.display = "none";
    });
  }

  function showDescription(key) {
  hideAllDescriptions();

  const descId = animeMap[key];
  const target = document.getElementById(descId);

  // Helper: check if element is visible in viewport
  function isElementVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= vh &&
      rect.right <= vw
    );
  }

  if (target) {
    target.style.display = "block";

    const isVisible = isElementVisible(target);

    // Show notification if on small screen OR element is off-screen
    if (window.innerWidth <= 768 || !isVisible) {
      showExpandNotification("Section expanded! Scroll down to see it.", target);;
    }
  } else {
    defaultDescription.style.display = "block";

    const isVisible = isElementVisible(defaultDescription);

    if (window.innerWidth <= 768 || !isVisible) {
      showExpandNotification("Section expanded! Scroll down to see it.", defaultDescription);
    }
  }
  }

  posters.forEach(poster => {
    poster.addEventListener("click", () => {
      const labelId = poster.getAttribute("aria-labelledby")?.split(" ")[0]; 
      const key = labelId?.replace("-title", "");
      showDescription(key);
    });
  });

  // Initial state
  showDescription("DefaultAnimeDescription");
});

// Plex section
document.addEventListener('DOMContentLoaded', () => {

  // Helper to check if element is fully visible in viewport
  function isElementVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= vh &&
      rect.right <= vw
    );
  }

  document.querySelectorAll('.PlexBannerWrapper').forEach(banner => {
    banner.addEventListener('click', () => {
      const targetId = banner.getAttribute('aria-controls');
      const target = document.getElementById(targetId);
      const isExpanded = banner.getAttribute('aria-expanded') === 'true';

      // Toggle expanded state
      banner.setAttribute('aria-expanded', String(!isExpanded));
      target.classList.toggle('visible');

      // Check visibility
      const isVisible = isElementVisible(target);

      // Show notification if the section just expanded AND it's small screen OR off-screen
      if (!isExpanded && (window.innerWidth <= 768 || !isVisible)) {
        showExpandNotification("Section expanded! Scroll down to see it.", target);
      }
    });
  });
});

// Video game section
document.addEventListener("DOMContentLoaded", () => {
  const posters = document.querySelectorAll(".GamesPosters .Titles");

  const descriptionMap = {
    zelda: "ZeldaDescription",
    kh: "KingdomHeartsDescription",
    pokemon: "PokemonDescription",
    magic: "MagicDescription"
  };

  const videoMap = {
    zelda: "ZeldaVideo",
    kh: "KingdomHeartsVideo",
    pokemon: "PokemonVideo",
    magic: "MagicVideo"
  };

  const defaultDesc = document.getElementById("DefaultGameDescription");

  function hideAllContent() {
    Object.values(descriptionMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });

    Object.values(videoMap).forEach(id => {
      const container = document.getElementById(id);
      if (container) {
        container.style.display = "none";
        const video = container.querySelector("video");
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }
    });

    if (defaultDesc) defaultDesc.style.display = "none";
  }

  function showGameContent(key) {
  hideAllContent();

  const descEl = document.getElementById(descriptionMap[key]);
  const videoContainer = document.getElementById(videoMap[key]);
  const videoEl = videoContainer?.querySelector("video");

  // Helper to check if element is fully visible in viewport
  function isElementVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= vh &&
      rect.right <= vw
    );
  }

  if (descEl) {
    descEl.style.display = "block";

    const isVisible = isElementVisible(descEl);

    // Show notification if small screen OR element is off-screen
    if (window.innerWidth <= 768 || !isVisible) {
      showExpandNotification("Section expanded! Scroll down to see it.", descEl);
    }
  }

  if (videoContainer) videoContainer.style.display = "block";
  if (videoEl) videoEl.play();
}

  posters.forEach(poster => {
    poster.addEventListener("click", () => {
  const labelId = poster.getAttribute("aria-labelledby")?.split(" ")[0]; 
  const key = labelId?.split("-")[0]; 

  // Helper to check if element is fully visible
  function isElementVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= vh &&
      rect.right <= vw
    );
  }

  if (key && descriptionMap[key] && videoMap[key]) {
    showGameContent(key);
  } else {
    hideAllContent();
    if (defaultDesc) defaultDesc.style.display = "block";

    const isVisible = isElementVisible(defaultDesc);

    // Show notification if small screen OR element is off-screen
    if (window.innerWidth <= 768 || !isVisible) {
      showExpandNotification("Section expanded! Scroll down to see it.", defaultDesc);
    }
  }
});
  });

  // Initial state
  hideAllContent();
  if (defaultDesc) defaultDesc.style.display = "block";
});