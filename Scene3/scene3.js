const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let w,
  h,
  balls = [];
let mouse = { x: undefined, y: undefined };
let rgb = ["252, 186, 3", "252, 211, 3"];
const maxBalls = 50;
let lastMouseMoveTime = 0;
const mouseMoveInterval = 50;

function init() {
  resizeReset();
  animationLoop();
}

function resizeReset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function animationLoop() {
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";
  drawBalls();

  balls = balls.filter((ball) => ball.time <= ball.ttl);

  requestAnimationFrame(animationLoop);
}

function drawBalls() {
  balls.forEach((ball) => {
    ball.update();
    ball.draw();
  });
}

function mousemove(e) {
  const currentTime = Date.now();
  if (currentTime - lastMouseMoveTime < mouseMoveInterval) return;

  lastMouseMoveTime = currentTime;
  mouse.x = e.x;
  mouse.y = e.y;

  if (balls.length < maxBalls) {
    for (let i = 0; i < 2; i++) {
      if (balls.length < maxBalls) {
        balls.push(new Ball());
      }
    }
  }
}

function mouseout() {
  mouse.x = undefined;
  mouse.y = undefined;
}

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

class Ball {
  constructor() {
    this.start = {
      x: mouse.x + getRandomInt(-20, 20),
      y: mouse.y + getRandomInt(-20, 20),
      size: getRandomInt(10, 13),
    };
    this.end = {
      x: this.start.x + getRandomInt(-300, 300),
      y: this.start.y + getRandomInt(-300, 300),
    };

    this.x = this.start.x;
    this.y = this.start.y;
    this.size = this.start.size;

    this.color = rgb[getRandomInt(0, rgb.length - 1)];
    this.initialOpacity = 0.5; // Initial opacity
    this.opacity = this.initialOpacity; // Current opacity

    this.time = 0;
    this.ttl = 120;
  }

  draw() {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size
    );
    gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
    gradient.addColorStop(0.8, `rgba(${this.color}, ${this.opacity * 0.6})`);
    gradient.addColorStop(1, `rgba(${this.color}, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    if (this.time <= this.ttl) {
      let progress = 1 - (this.ttl - this.time) / this.ttl;
      let easedProgress = easeOutQuart(progress);
      this.size = this.start.size * (1.5 - easedProgress);
      this.x += (this.end.x - this.x) * 0.02;
      this.y += (this.end.y - this.y) * 0.02;

      // to fade
      this.opacity = this.initialOpacity * easeOutQuart(1 - progress);
    }
    this.time++;
  }
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);

gsap.registerPlugin(ScrollTrigger);

gsap.from("#scene3img", {
  opacity: 0,
  y: "50",
  duration: 1,
  scrollTrigger: {
    trigger: "#scene3img",
    start: "top 90%",
    end: "top -5%",
    scrub: 1,
  },
});

gsap.to("#scene3img", {
  opacity: 0,
  y: "50",
  scrollTrigger: {
    trigger: "#scene3img",
    start: "top -20%",
    end: "top 50%",
    scrub: 1,
  },
});

gsap.to(".scene-3-paragraph", {
  opacity: 0,
  y: "-25",
  duration: 1,
  scrollTrigger: {
    trigger: ".scene-3-paragraph",
    start: "top 50%",
    end: "top 30%",
    scrub: 1,
  },
});
