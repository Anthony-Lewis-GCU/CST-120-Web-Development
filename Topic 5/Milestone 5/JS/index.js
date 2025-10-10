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
