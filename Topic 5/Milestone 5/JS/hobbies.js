// Anime Poster Javascript Functions

document.addEventListener("DOMContentLoaded", () => {
  const posters = document.querySelectorAll(".AnimePoster");
  const descriptions = document.querySelectorAll(".AnimeDescription");
  const defaultDescription = document.getElementById("DefaultAnimeDescription");

  // Map poster keys to description IDs
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
    if (target) {
      target.style.display = "block";
    } else {
      defaultDescription.style.display = "block";
    }
  }

  posters.forEach(poster => {
    poster.addEventListener("click", () => {
      const labelId = poster.getAttribute("aria-labelledby")?.split(" ")[0]; // e.g., "SAO-title"
      const key = labelId?.replace("-title", ""); // e.g., "SAO"
      showDescription(key);
    });
  });

  // Initial state
  showDescription("DefaultAnimeDescription");
});


// Viedo Game Javascript Functions

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

    const descId = descriptionMap[key];
    const videoId = videoMap[key];

    const descEl = document.getElementById(descId);
    const videoContainer = document.getElementById(videoId);
    const videoEl = videoContainer?.querySelector("video");

    if (descEl) descEl.style.display = "block";
    if (videoContainer) videoContainer.style.display = "block";
    if (videoEl) videoEl.play();
  }

  posters.forEach(poster => {
    poster.addEventListener("click", () => {
      const labelId = poster.getAttribute("aria-labelledby")?.split(" ")[0]; // e.g., "zelda-title"
      const key = labelId?.split("-")[0]; // e.g., "zelda"
      if (key && descriptionMap[key] && videoMap[key]) {
        showGameContent(key);
      } else {
        hideAllContent();
        if (defaultDesc) defaultDesc.style.display = "block";
      }
    });
  });

  // Initial state
  hideAllContent();
  if (defaultDesc) defaultDesc.style.display = "block";
});


