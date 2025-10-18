// Musical Experience Section

document.addEventListener('DOMContentLoaded', () => {
  const experienceMap = {
    Flute: 'FluteExperience',
    Piano: 'PianoExperience',
    Guitar: 'GuitarExperience',
    Drums: 'DrumsExperience',
    FLStudio: 'FLStudioExperience'
  };

  const allExperiences = document.querySelectorAll('#MusicExperience .Instruments');
  const header = document.getElementById('MusicExperienceHeading');

  document.querySelectorAll('.MusicItem').forEach(item => {
    let currentAudio = null;

    // 🔊 Hover: Play sound
    item.addEventListener('mouseenter', () => {
      const label = item.getAttribute('aria-label');
      let soundId = null;

      if (label.includes('Flute')) soundId = 'FluteSound';
      else if (label.includes('Piano')) soundId = 'PianoSound';
      else if (label.includes('Guitar')) soundId = 'GuitarSound';
      else if (label.includes('Drums')) soundId = 'DrumsSound';
      else if (label.includes('FLStudio')) soundId = 'FLStudioSound';

      if (!soundId) return;

      const audio = document.getElementById(soundId);
      if (!audio) return;

      audio.currentTime = 0;
      audio.play().catch(err => console.error('Playback failed:', err));
      currentAudio = audio;
    });

    // 🔇 Mouseleave: Stop sound
    item.addEventListener('mouseleave', () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
      }
    });

    // 📖 Click: Show experience + header
    item.addEventListener('click', () => {
      const label = item.getAttribute('aria-label');
      const key = Object.keys(experienceMap).find(k => label.includes(k));
      const targetId = experienceMap[key];

      allExperiences.forEach(exp => exp.style.display = 'none');

      const target = document.getElementById(targetId);
      if (target) {
        header.style.display = 'block';
        target.style.display = 'block';
        header.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Spotify Playlists

document.addEventListener('DOMContentLoaded', () => {
  const playlistMap = {
    Metal: 'MetalPlaylist',
    Dubstep: 'DubstepPlaylist',
    Alternative: 'AlternativePlaylist',
    Rock: 'RockPlaylist',
    Folk: 'FolkPlaylist'
  };

  const iframeSrcMap = {
    Metal: 'https://open.spotify.com/embed/playlist/6HoLBdXMzv0BeLuywoWrVa?utm_source=generator&theme=0',
    Dubstep: 'https://open.spotify.com/embed/playlist/1oCqn0z2YhsnGmb8Xwe45q?utm_source=generator&theme=0',
    Alternative: 'https://open.spotify.com/embed/playlist/5kMMy71Z23ZYWwWn3Pnwiw?utm_source=generator&theme=0',
    Rock: 'https://open.spotify.com/embed/playlist/5NOiy06pjBvySue4dpsBYU?utm_source=generator&theme=0',
    Folk: 'https://open.spotify.com/embed/playlist/3pCatVALi27pxALYI7R1vJ?utm_source=generator&theme=0'
  };

  const allPlaylists = Object.values(playlistMap).map(id => document.getElementById(id));
  const defaultMessage = document.getElementById('DefaultMessage');

  document.querySelectorAll('.GenreSelection button').forEach(button => {
    button.addEventListener('click', () => {
      const label = button.getAttribute('aria-label');
      const genre = Object.keys(playlistMap).find(key => label.includes(key));
      const targetId = playlistMap[genre];

      // Hide all playlists
      allPlaylists.forEach(row => {
        row.style.display = 'none';
        const iframe = row.querySelector('iframe');

        if (iframe) {
          iframe.src = ''; // Unload
          setTimeout(() => {
            iframe.src = iframeSrcMap[iframe.id]; // Reload
          }, 50);
        }
      });

      // Hide default message
      if (defaultMessage) defaultMessage.style.display = 'none';

      // Show selected playlist
      const targetRow = document.getElementById(targetId);
      if (targetRow) {
        targetRow.style.display = 'table-row';
        targetRow.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
