// Timeline Javascript functions

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".TimelineTrack");
  const events = Array.from(document.querySelectorAll(".Timeline .Event"));
  const prevBtn = document.getElementById("PreviousEvent");
  const nextBtn = document.getElementById("next-event");

  const visibleCount = 4;
  let currentIndex = 0;

  function updateSliderPosition() {
    if (!track || events.length === 0) return;

    const firstRect = events[0].getBoundingClientRect();
    const secondRect = events[1]?.getBoundingClientRect() || firstRect;
    const eventWidth = firstRect.width;
    const gap = Math.max(0, secondRect.left - (firstRect.left + eventWidth));
    const slot = eventWidth + gap;

    const maxIndex = Math.max(0, events.length - visibleCount);
    currentIndex = Math.min(Math.max(0, currentIndex), maxIndex);

    track.style.transition = "transform 0.45s ease";
    track.style.transform = `translateX(-${Math.round(currentIndex * slot)}px)`;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex--;
    updateSliderPosition();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex++;
    updateSliderPosition();
  });

  setTimeout(updateSliderPosition, 50);
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".core-btn");    // All Corte Value Buttons buttons
  const descriptions = document.querySelectorAll(".Slide");  // All slide descriptions
  const defaultArticle = document.querySelector(".default"); // Intro message

  function isSmallScreen() {
    return window.innerWidth <= 650;
  }

  // Hide all slides
  function initializeSlides() {
    descriptions.forEach(desc => desc.classList.remove("show"));
  }

  // Show selected slide
  function showDescription(button) {
    const targetId = button.getAttribute("aria-controls");
    const slide = document.getElementById(targetId);
    if (!slide) return;

    // Hide the default article once the first button is clicked
    if (defaultArticle) {
      defaultArticle.style.display = "none";
    }

    // Hide all other slides
    descriptions.forEach(d => d.classList.remove("show"));

    // Show selected slide
    slide.classList.add("show");

    // Scroll if the element is not fully visible
    const rect = slide.getBoundingClientRect();
    const isVisible =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    if (!isVisible) {
      slide.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Setup button handlers
  function setupButtons() {
    initializeSlides();
    buttons.forEach(btn => {
      btn.onclick = () => showDescription(btn);
    });
  }

  setupButtons();
  window.addEventListener("resize", setupButtons);
});