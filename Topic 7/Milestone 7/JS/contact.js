document.addEventListener('DOMContentLoaded', () => {
  // Elements for "Other Reason" toggle
  const reasonSelect = document.getElementById('reason');
  const otherReasonGroup = document.getElementById('otherReasonGroup');
  const otherReasonInput = document.getElementById('otherReason');

  reasonSelect.addEventListener('change', () => {
    if (reasonSelect.value === 'other') {
      otherReasonGroup.style.display = 'block';
      otherReasonInput.setAttribute('required', 'true');
    } else {
      otherReasonGroup.style.display = 'none';
      otherReasonInput.removeAttribute('required');
      otherReasonInput.value = '';
    }
  });

  // Bootstrap-style validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // Trigger validity check
      if (!form.checkValidity()) {
        event.preventDefault(); // Stop form from submitting
        event.stopPropagation(); // Stop bubbling
      }
      form.classList.add('was-validated'); // Apply Bootstrap validation styling
    }, false);
  });
});