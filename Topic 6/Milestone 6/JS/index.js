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
    const buttons = document.querySelectorAll(".core-btn");
    const descriptions = document.querySelectorAll(".CoreValueDescription .Slide");

    function isSmallScreen() {
        return window.innerWidth <= 600;
    }

    function hideAllSlides() {
        descriptions.forEach(desc => $(desc).hide());
        $(".CoreValueDescription .default").show();
    }

    function clearAllPlaceholders() {
        document.querySelectorAll(".core-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("aria-controls");
        const placeholder = document.getElementById(targetId + "PH");
        const desc = document.getElementById(targetId);

        // Clear all placeholders
        document.querySelectorAll(".small-desc-placeholder").forEach(ph => ph.innerHTML = "");

        // Clone description and append
        const clone = desc.cloneNode(true);
        clone.style.display = "block";
        placeholder.appendChild(clone);
    });
});
    }

    function showDescription(button) {
        const targetId = button.getAttribute("aria-controls");
        const placeholder = document.getElementById(targetId + "PH");
        const desc = document.getElementById(targetId);
        if (!placeholder || !desc) return;

        // Clear all other placeholders
        clearAllPlaceholders();

        // Clone the description and insert into placeholder
        const clone = desc.cloneNode(true);
        clone.style.display = "block"; // ensures visibility
        placeholder.appendChild(clone);
    }

    function setupButtons() {
        if (isSmallScreen()) {
            hideAllSlides();
            buttons.forEach(btn => {
                btn.onclick = () => showDescription(btn);
            });
        } else {
            hideAllSlides();
            $(".core-btn").off("click").on("click", function () {
                const targetId = $(this).attr("aria-controls");
                $(".CoreValueDescription .Slide").stop(true,true).hide();
                $(".CoreValueDescription .default").hide();
                $("#" + targetId).fadeIn(400);
            });
        }
    }

    setupButtons();
    window.addEventListener("resize", setupButtons);
});