// SCENE 5 BELOW

let tl4 = gsap.timeline({scrollTrigger: {trigger: "#scene-5-background", scrub: 1}})
.to("#scene-5-background", {
  opacity: 1,
  x: 50,
  ease: "power3.out",
}).to("#scene-5-background", {
  opacity: 0,
})

let tl5 = gsap.timeline({scrollTrigger: {trigger: "#scene-5-pandora", start: "top bottom+=100px", end:"top top", scrub: 1}})
  .to("#scene-5-pandora", {
  opacity: 0.8,
  ease: "power3.out",
}).to("#scene-5-smoke", {
  opacity: 0.1,
  height: "35%",
  width: "35%",
  top:"40%",
  left:"20%",
}).to("#scene-5-smoke", {
  height: "60%",
  width: "60%",
  top:"20%",
  left:"15%",
  opacity:0.8,
}).to("#scene-5-pandora", {
  opacity: 0,
  ease: "power3.out",
})

let tl6 = gsap.timeline({scrollTrigger: {trigger: "#scene-5-paragraph", scrub: 1}})
  .to("#scene-5-paragraph", {
    opacity:1
  }).to("#scene-5-paragraph", {
    opacity:0
  })
