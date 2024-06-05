// GSAP animation for the final scene
let tlScene9 = gsap.timeline({
  scrollTrigger: {
    trigger: "#scene-9-box",
    start: "center center", // Start the animation when the box is in the center of the viewport
    end: "bottom center",
    scrub: 1,
  },
});

// Animate the margin-top of the overlay to move it upwards
tlScene9.to("#scene-9-box", {
  marginTop: "53rem", // Adjust this value to control the final position
  ease: "power1.out",
});

// Animate the background to become darker
tlScene9.to(
  "#scene-9-background",
  {
    opacity: 0.4, // Adjust this value to control how dark the background gets
    ease: "power3.out",
  },
  0
); // Adding 0 here means both animations start simultaneously
