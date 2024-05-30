// SCENE 4 BELOW

let tl = gsap.timeline({scrollTrigger: {trigger: "#scene-4-pandora", scrub: 1}})
  .to("#scene-4-pandora", {
  x: -50,
  opacity: 0.8,
  ease: "power3.out",
}).to("#scene-4-pandora", {
  opacity: 0,
  x: 30,
});

let tl2 = gsap.timeline({scrollTrigger: {trigger: "#scene-4-background", scrub: 1}})
  .to("#scene-4-background", {
  opacity: 1,
  scale: 1.1,
  ease: "power3.out",
}).to ("#scene-4-background", {
  opacity: 0,
  scale: 1,
})


let tl3 = gsap.timeline({scrollTrigger: {trigger: "#scene-4-paragraph", scrub: 1}})
  .to("#scene-4-paragraph", {
    opacity:1
  }).to("#scene-4-paragraph", {
    opacity:0
  })

  