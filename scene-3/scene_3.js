const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let w,
  h,
  balls = [];
let mouse = { x: undefined, y: undefined };
let rgb = ["252, 186, 3", "252, 211, 3"];
const maxBalls = 100;
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
    for (let i = 0; i < 3; i++) {
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
      size: getRandomInt(10, 20), // size range
    };
    this.end = {
      x: this.start.x + getRandomInt(-300, 300),
      y: this.start.y + getRandomInt(-300, 300),
    };

    this.x = this.start.x;
    this.y = this.start.y;
    this.size = this.start.size;

    this.color = rgb[getRandomInt(0, rgb.length - 1)];
    this.opacity = 0.7;

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
    gradient.addColorStop(0.8, `rgba(${this.color}, ${this.opacity * 0.2})`);
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
      this.size = this.start.size * (1 - easeOutQuart(progress));
      this.x += (this.end.x - this.x) * 0.01;
      this.y += (this.end.y - this.y) * 0.01;
    }
    this.time++;
  }
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
