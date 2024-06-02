
let start = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".start-story",
      start: "center center",
      end: "bottom top",
      scrub: 1,
    },
}).to(".start-story", {
    opacity: 0,
    y:-20,
  })

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
    y: 30,
    opacity: 0.9,
  })
  .to(".scene-1-character", {
    opacity: 0,
    y: -3,
  });

let tl3 = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-1-background",
      start: "top bottom",
      end: "center top",
      scrub: 1,
    },
  })
  .to(".scene-1-text", {
    opacity: 1,
    y: "45",
    stagger: 1,
  })
  .to(".scene-1-text", {
    opacity: 0,
    y: "-45",
    stagger: 0.5,
  });
