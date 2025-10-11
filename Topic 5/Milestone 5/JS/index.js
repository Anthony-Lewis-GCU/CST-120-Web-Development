// Timeline Javascript functions

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".TimelineTrack");
  const events = document.querySelectorAll(".Timeline .Event");
  const prevBtn = document.getElementById("PreviousEvent");
  const nextBtn = document.getElementById("next-event");

  const visibleCount = 4;
  const eventWidth = events[0].offsetWidth + 16; // width + margin
  let currentIndex = 0;

  function updateSliderPosition() 
  {
    const targetEvent = events[currentIndex];
    const offset = targetEvent.offsetLeft;

    track.style.transform = `translateX(-${offset}px)`;

    console.log(`Scrolling to index ${currentIndex}`);
    console.log(`OffsetLeft of target: ${events[currentIndex].offsetLeft}`);
  }

  prevBtn.addEventListener("click", () => 
    {
      if (currentIndex > 0) 
      {
        currentIndex--;
        updateSliderPosition();
      }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex + visibleCount < events.length) 
    {
      currentIndex++;
      updateSliderPosition();
    }
  });

  updateSliderPosition();
});


//   Core Value Javascript functions

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => 
{  
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