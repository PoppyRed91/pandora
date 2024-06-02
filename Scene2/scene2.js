let tl1 = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-2-background",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  })
  .to(".scene-2-background", {
    //   x: -40,
    scale: 1.3,
    opacity: 1,
  });

let tl2 = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-2-background",
      start: "center bottom",
      end: "bottom top",
      scrub: 1,
    },
  })
  .to(".scene-2-black-box", {
    opacity: 0.7,
  });

let tl3 = gsap
  .timeline({ scrollTrigger: { trigger: ".scene-2-background", scrub: 1 } })
  .to(".scene-2-ground", {
    opacity: 1,
  })
  .to(".scene-2-ground", {
    opacity: 0,
    ease: Power2.easeInOut,
  });

let tl4 = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-2-background",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  })
  .to(".scene-2-character", {
    opacity: 1,
  })
  .to(".scene-2-character", {
    delay: 0.3,
    opacity: 0.2,
    ease: Power3.easeOut,
    x: "30",
  });

let tl5 = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-2-background",
      start: "top+=300 bottom",
      end: "bottom top",
      scrub: 1,
    },
  })
  .to(".scene-2-text", {
    opacity: 1,
    y: "45",
    stagger: 1,
  })
  .to(".scene-2-text", {
    opacity: 0,
    y: "-45",
    stagger: 0.5,
  });
