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


//   Core Value Javascript functions

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Select all core value buttons
  const coreButtons = document.querySelectorAll('.core-btn');

  // Select all articles inside the description region
  const descriptions = document.querySelectorAll('.CoreValueDescription article');

  // Add click event to each button
  coreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('aria-controls');

      // Hide all descriptions
      descriptions.forEach(article => {
        article.hidden = true;
      });

      // Show the selected description
      const targetArticle = document.getElementById(targetId);
      if (targetArticle) {
        targetArticle.hidden = false;
        targetArticle.focus(); // Optional: focus for screen readers
      }
    });
  });
});