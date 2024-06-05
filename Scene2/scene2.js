document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Timeline for scaling the background
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
      scale: 1.3,
      opacity: 1,
    });

  // Timeline for opacity of black box
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

  // Timeline for opacity of ground
  let tl3 = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".scene-2-background",
        scrub: 1,
      },
    })
    .to(".scene-2-ground", {
      opacity: 1,
    })
    .to(".scene-2-ground", {
      opacity: 0,
      ease: Power2.easeInOut,
    });

  // Timeline for character opacity and movement
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

  // Timeline for text opacity and movement
  let tl5 = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".scene-2-background",
        start: "top+=200 bottom",
        end: "center top",
        scrub: 1,
      },
    })
    .to(".scene-2-text", {
      opacity: 1,
      y: "20",
      stagger: 0.3,
    })
    .to(".scene-2-text", {
      opacity: 0,
      y: "-20",
      stagger: 0.3,
    });

  // animation for .scene-2-text-2
  gsap.fromTo(
    ".scene-2-text-2",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 2,
      scrollTrigger: {
        trigger: ".scene-2-text-2",
        start: "top 50%",
        end: "top 20%",
      },
    }
  );
});
