<script>




gsap.registerPlugin(ScrollTrigger);

gsap.to (".text", {
    x: 700,
    duration:3 ,
    scrollTrigger: {
        trigger: ".box",
        start: "top 30",
        markers: true
    }
})

</script>