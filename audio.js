document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-audio");
  const soundToggle = document.getElementById("sound-toggle");

  const audioPlaying = sessionStorage.getItem("audioPlaying") === "true";

  if (audioPlaying) {
    audio.play().catch((error) => {
      console.log("Audio play was prevented by the browser:", error);
    });
    soundToggle.style.backgroundImage = "url('/public/musicon.png')";
    soundToggle.classList.remove("pause");
  }

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

  //  play audio automatically when the page loads
  if (!audioPlaying) {
    audio.play().catch((error) => {
      console.log("Audio play was prevented by the browser:", error);
    });
    sessionStorage.setItem("audioPlaying", "true");
  }
});
