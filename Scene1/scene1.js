let tl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-1-wrapper",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  })
  .to(".scene-1-background", {
    opacity: 0.9,
  })
  .to(".scene-1-background", {
    opacity: 0,
  });

let t2 = gsap
  .timeline({ scrollTrigger: { trigger: ".scene-1-character", scrub: 1 } })
  .to(".scene-1-character", {
    delay: 0.03,
    y: 40,
    opacity: 0.9,
  })
  .to(".scene-1-character", {
    opacity: 0,
    y: -40,
  });

let tl3 = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-1-background",
      start: "top-=250 bottom",
      end: "center top",
      scrub: 1,
    },
  })
  .to(".scene-1-text-container", {
    opacity: 1,
    y: "45",
    stagger: 0.05,
  }).to(".lens-flare", {
    opacity: 1,
    y: "45",
    stagger: 0.05,
  })
  .to(".scene-1-text", {
    opacity: 1,
    stagger: 0.05,
  }).to(".scene-1-text-container", {
    opacity: 0.5,
    y: "-35",
    stagger: 0.05,
  }).to(".lens-flare", {
    opacity: 0.5,
    y: "-35",
    stagger: 0.05,
  })
  .to(".scene-1-text", {
    opacity: 0,
    stagger: 0.05,
  })

gsap.to("#black-screen", {
  duration: 3,
  opacity: 0,
  onComplete: () => {
    document.getElementById("black-screen").style.display = "none";
  },
});
