let tl4 = gsap.timeline({scrollTrigger: {trigger: "#cloud-2", scrub: 1}})
.to("#cloud-2", {
  opacity: 1,
  y: 50,
  ease: "power3.out",
}).to("#cloud-2", {
  opacity: 0,
})

let tl5 = gsap.timeline({scrollTrigger: {trigger: "#cloud-2", start: "top bottom+=100px", end:"top top", scrub: 1}})
  .to("#cloud-2", {
  opacity: 0.8,
  ease: "power3.out",
}).to("#character-2", {
  opacity: 0.1,
  height: "35%",
  width: "35%",
  top:"40%",
  left:"20%",
}).to("#character-2", {
  height: "60%",
  width: "60%",
  top:"20%",
  left:"15%",
  opacity:0.8,
}).to("#character-2", {
  opacity: 0,
  ease: "power3.out",
})

let tl6 = gsap.timeline({scrollTrigger: {trigger: "#text-2", scrub: 1}})
  .to("#text-2", {
    opacity:1
  }).to("#text-2", {
    opacity:0
  })