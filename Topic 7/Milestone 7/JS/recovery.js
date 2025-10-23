// Journey Rercovery Coin Flips

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.RecoveryChip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('flipped');
    });
  });
});

// Resource Hub Coin Flips and Navigation

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

    document.querySelectorAll('.ResourceChip').forEach(chip => {
    chip.addEventListener('click', () => {
      const label = chip.getAttribute('aria-label');
      const descriptionId = descriptionMap[label];
      const link = linkMap[label];
      const descriptionEl = descriptionId ? document.getElementById(descriptionId) : null;

      const isFlipped = chip.classList.contains('flipped');
      chip.classList.toggle('flipped');

      if (!isFlipped) {
        if (descriptionEl) descriptionEl.hidden = false;
      } else {
        if (descriptionEl) descriptionEl.hidden = true;
        if (link) window.open(link, '_blank');
      }
    });
  });
});
