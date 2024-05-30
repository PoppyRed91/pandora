const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let w, h;
let ballsPool = [];
let activeBalls = [];
let mouse = { x: undefined, y: undefined };

const rgb = ["252, 186, 3", "252, 211, 3"];
const maxBalls = 20;
const mouseMoveInterval = 100;
let lastMouseMoveTime = 0;

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);

function init() {
  resizeReset();
  createBallsPool();
  animationLoop();
}

function resizeReset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function createBallsPool() {
  ballsPool = [];
  for (let i = 0; i < maxBalls; i++) {
    ballsPool.push(new Ball());
  }
}

function animationLoop() {
  ctx.clearRect(0, 0, w, h);
  drawBalls();
  requestAnimationFrame(animationLoop);
}

function drawBalls() {
  activeBalls.forEach((ball) => {
    ball.update();
    ball.draw();
  });
}

function mousemove(e) {
  const currentTime = Date.now();
  if (currentTime - lastMouseMoveTime < mouseMoveInterval) return;
  lastMouseMoveTime = currentTime;

  mouse.x = e.clientX;
  mouse.y = e.clientY;

  if (activeBalls.length < maxBalls) {
    const ball = ballsPool.pop();
    if (ball) {
      ball.reset();
      activeBalls.push(ball);
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
    this.reset();
  }

  reset() {
    this.start = {
      x: mouse.x + getRandomInt(-20, 20),
      y: mouse.y + getRandomInt(-20, 20),
      size: getRandomInt(5, 9),
    };
    this.end = {
      x: this.start.x + getRandomInt(-50, 50),
      y: this.start.y + getRandomInt(-50, 50),
    };
    this.x = this.start.x;
    this.y = this.start.y;
    this.size = this.start.size;
    this.color = rgb[getRandomInt(0, rgb.length - 1)];
    this.opacity = 0.5;
    this.time = 0;
    this.ttl = 30;
  }

  draw() {
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    if (this.time <= this.ttl) {
      const progress = 1 - (this.ttl - this.time) / this.ttl;
      const easedProgress = easeOutQuart(progress);
      this.size = this.start.size * (1.5 - easedProgress);
      this.x += (this.end.x - this.x) * 0.1;
      this.y += (this.end.y - this.y) * 0.1;
      this.opacity -= 0.01;
    } else {
      const index = activeBalls.indexOf(this);
      if (index !== -1) {
        activeBalls.splice(index, 1);
        ballsPool.push(this);
      }
    }
    this.time++;
  }
}
