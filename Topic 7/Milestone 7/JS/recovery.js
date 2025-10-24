// Resource Hub Coin Flips and Navigation + Auto Scroll
document.addEventListener('DOMContentLoaded', () => {
  const descriptionMap = {
    "Inpatient Services Resource": "Inpatient",
    "Psychologist Services Resource": "Psychologists",
    "Call Center Resource": "SupportHotline",
    "Peer Support Resource": "PeerSupport"
  };

  const linkMap = {
    "Inpatient Services Resource": "https://www.inpatient-centers.org/treatment/california/sonoma-county.html?msclkid=70f63ca8e79d1e4df5ac54597271dbfa&utm_source=bing&utm_medium=cpc&utm_campaign=CentersOrg&utm_term=inpatient%20treatment%20centers%20Sonoma%20County%20CA&utm_content=CentersOrg%20-%20Sonoma%20County,%20CA",
    "Psychologist Services Resource": "https://www.psychologytoday.com/us/therapists?category=substance-abuse&msockid=13804d8e488e66d42e3358b949d067ce",
    "Call Center Resource": "https://www.dhcs.ca.gov/individuals/Pages/SUD_County_Access_Lines.aspx",
    "Peer Support Resource": "https://sonomacounty.gov/health-and-human-services/health-services/divisions/behavioral-health/services/substance-use-disorder-and-community-recovery-services"
  };

  let activeChip = null; // Track the currently flipped coin

  document.querySelectorAll('.ResourceChip').forEach(chip => {
    chip.addEventListener('click', () => {
      const label = chip.getAttribute('aria-label');
      const descriptionId = descriptionMap[label];
      const link = linkMap[label];
      const descriptionEl = descriptionId ? document.getElementById(descriptionId) : null;

      const isFlipped = chip.classList.contains('flipped');

      // Flip back any active chip
      if (activeChip && activeChip !== chip) {
        const prevLabel = activeChip.getAttribute('aria-label');
        const prevDescriptionId = descriptionMap[prevLabel];
        const prevDescriptionEl = prevDescriptionId ? document.getElementById(prevDescriptionId) : null;

        activeChip.classList.remove('flipped');
        if (prevDescriptionEl) prevDescriptionEl.hidden = true;
      }

      // Toggle this chip
      chip.classList.toggle('flipped');

      if (!isFlipped) {
        // Show description
        if (descriptionEl) {
          descriptionEl.hidden = false;

          // Scroll into view after it becomes visible
          setTimeout(() => {
            descriptionEl.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 150); // short delay ensures element is rendered before scroll
        }

        activeChip = chip;
      } else {
        // Hide description and open link
        if (descriptionEl) descriptionEl.hidden = true;
        if (link) window.open(link, '_blank');
        activeChip = null;
      }
    });
  });
});

/* FORM Submission Script */

/* Show/Hide "Other" Explanation Field Based on Motivation Selection */
document.addEventListener('DOMContentLoaded', () => {
    const motivationSelect = document.getElementById('motivation');
    const otherGroup = document.getElementById('otherMotivationGroup');
    const otherInput = document.getElementById('explanation');

    motivationSelect.addEventListener('change', () => {
      if (motivationSelect.value === 'other') {
        otherGroup.style.display = 'block';
        otherInput.setAttribute('required', 'true');
      } else {
        otherGroup.style.display = 'none';
        otherInput.removeAttribute('required');
        otherInput.value = '';
      }
    });

    // Bootstrap validation
    (() => {
      'use strict';
      const forms = document.querySelectorAll('.needs-validation');
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          // Custom validation for radio group
          const attendedRadios = form.querySelectorAll('input[name="attended"]');
          let radioValid = false;
          attendedRadios.forEach(radio => {
            if (radio.checked) radioValid = true;
          });
          if (!radioValid) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
          }

          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    })();
});