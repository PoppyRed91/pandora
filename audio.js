document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-audio");
  const soundToggle = document.getElementById("sound-toggle");

  // Check if the audio was playing in the previous session
  const audioPlaying = sessionStorage.getItem("audioPlaying") === "true";

  // Set initial state of audio and sound toggle
  if (audioPlaying) {
    audio.play().catch((error) => {
      console.log("Audio play was prevented by the browser:", error);
    });
    soundToggle.style.backgroundImage = "url('/public/musicon.png')";
    soundToggle.classList.remove("pause");
  }

  // Toggle audio playback and update session storage
  soundToggle.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch((error) => {
        console.log("Audio play was prevented by the browser:", error);
      });
      soundToggle.style.backgroundImage = "url('/public/musicon.png')";
      soundToggle.classList.remove("pause");
      sessionStorage.setItem("audioPlaying", "true");
    } else {
      audio.pause();
      soundToggle.style.backgroundImage = "url('/public/musicoff.png')";
      soundToggle.classList.add("pause");
      sessionStorage.setItem("audioPlaying", "false");
    }
  });

  // Optionally, play audio automatically when the page loads
  if (!audioPlaying) {
    audio.play().catch((error) => {
      console.log("Audio play was prevented by the browser:", error);
    });
    sessionStorage.setItem("audioPlaying", "true");
  }
});
