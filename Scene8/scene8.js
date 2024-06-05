// GSAP animations
let tl1 = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#scene-8-background",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
  })
  .to("#scene-8-background", {
    opacity: 0.5, // Set opacity to 0.5 so it doesn't disappear completely
    ease: "power3.out",
  });

let tl2 = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scene-8-overlay",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
  })
  .to(".scene-8-overlay", {
    x: -330, // Move the overlay 50 pixels to the left
    ease: "power3.out",
  });

// Function to create multiple bats
function createBats() {
  var r = Math.random,
    n = 0,
    d = document,
    w = window;

  // Get the container element
  const container = d.querySelector(".scene-8-container");

  // Function to create a single bat element
  function createBat() {
    var i = d.createElement("img"),
      z = d.createElement("div"),
      zs = z.style,
      a = container.offsetWidth * r(), // Use container's width
      b = container.offsetHeight * r(); // Use container's height

    zs.position = "absolute"; // Changed to absolute to position within the container
    zs.left = 0;
    zs.top = 0;
    zs.opacity = 0;
    zs.zIndex = 300; // Higher z-index
    zs.width = "200px"; // Larger size
    zs.height = "200px"; // Larger size

    z.appendChild(i);
    i.src =
      "data:image/gif;base64,R0lGODlhMAAwAJECAAAAAEJCQv///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAQACACwAAAAAMAAwAAACdpSPqcvtD6NcYNpbr4Z5ewV0UvhRohOe5UE+6cq0carCgpzQuM3ut16zvRBAH+/XKQ6PvaQyCFs+mbnWlEq0FrGi15XZJSmxP8OTRj4DyWY1lKdmV8fyLL3eXOPn6D3f6BcoOEhYaHiImKi4yNjo+AgZKTl5WAAAIfkECQEAAgAsAAAAADAAMAAAAnyUj6nL7Q+jdCDWicF9G1vdeWICao05ciUVpkrZIqjLwCdI16s+5wfck+F8JOBiR/zZZAJk0mAsDp/KIHRKvVqb2KxTu/Vdvt/nGFs2V5Bpta3tBcKp8m5WWL/z5PpbtH/0B/iyNGh4iJiouMjY6PgIGSk5SVlpeYmZqVkAACH5BAkBAAIALAAAAAAwADAAAAJhlI+py+0Po5y02ouz3rz7D4biSJbmiabq6gCs4B5AvM7GTKv4buby7vsAbT9gZ4h0JYmZpXO4YEKeVCk0QkVUlw+uYovE8ibgaVBSLm1Pa3W194rL5/S6/Y7P6/f8vp9SAAAh+QQJAQACACwAAAAAMAAwAAACZZSPqcvtD6OctNqLs968+w+G4kiW5omm6ooALeCusAHHclyzQs3rOz9jAXuqIRFlPJ6SQWRSaIQOpUBqtfjEZpfMJqmrHIFtpbGze2ZywWu0aUwWEbfiZvQdD4sXuWUj7gPos1EAACH5BAkBAAIALAAAAAAwADAAAAJrlI+py+0Po5y02ouz3rz7D4ZiCIxUaU4Amjrr+rDg+7ojXTdyh+e7kPP0egjabGg0EIVImHLJa6KaUam1aqVynNNsUvPTQjO/J84cFA3RzlaJO2495TF63Y7P6/f8vv8PGCg4SFhoeIg4UQAAIfkEBQEAAgAsAAAAADAAMAAAAnaUj6nL7Q+jXGDaW6+GeXsFdFL4UaITnuVBPunKtHGqwoKc0LjN7rdes70QQB/v1ykOj72kMghbPpm51pRKtBaxoteV2SUpsT/Dk0Y+A8lmNZSnZlfH8iy93lzj5+g93+gXKDhIWGh4iJiouMjY6PgIGSk5eVgAADs=";
    container.appendChild(z); // Append to the container

    function R(o, m) {
      return Math.max(Math.min(o + (r() - 0.5) * 400, m - 50), 50);
    }

    function A() {
      var x = R(a, container.offsetWidth), // Use container's width
        y = R(b, container.offsetHeight), // Use container's height
        d = 5 * Math.sqrt((a - x) * (a - y) + (b - y) * (b - y));
      zs.opacity = n;
      n = 1;
      zs.transition = zs.webkitTransition = d / 1e3 + "s linear";
      zs.transform = zs.webkitTransform = "translate(" + x + "px," + y + "px)";
      i.style.transform = i.style.webkitTransform = a > x ? "" : "scaleX(-1)";
      a = x;
      b = y;
      setTimeout(A, d);
    }

    setTimeout(A, r() * 3e3);
  }

  // Create 10-15 bats
  for (let j = 0; j < Math.floor(Math.random() * 6) + 10; j++) {
    createBat();
  }
}

// Create bats only when the user scrolls to the specific section
gsap.utils.toArray("#scene-8-background").forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    onEnter: createBats,
    once: true, // Ensures bats are created only once
  });
});
