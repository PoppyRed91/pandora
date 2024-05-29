import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

/*
    field of view: 75 degrees,
    window.innerWidth/window.innerHeight - aspect ratio
    near clipping plane - objects closer than 0.1 won't be rendered
    far clipping plane - objects further from 1000 won't be rendered
*/
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//  lights setup

const directLight = new THREE.DirectionalLight(new THREE.Color(0xcc8800), 5);
const ambientLight = new THREE.AmbientLight(new THREE.Color(0xf2f2f2), 5);
const spotLight = new THREE.SpotLight(new THREE.Color(0xb35900), 100);
spotLight.position.setY(150);

/*
    creating renderer instance
    setting color to be transparent so that the background img is visible
    seting the size of the are we want to render
    adding renderer element to div with id #pandoras-box-container
*/

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
const pandorasBoxContainer = document.getElementById("pandoras-box-container");
pandorasBoxContainer.appendChild(renderer.domElement);

/*
    importing the loader
    making an empty parent for the box_body and the box_lid and attaching it to parent: pandorasBox
    setting the camera position
*/

const loader = new GLTFLoader();
const pandorasBox = new THREE.Scene();

let isBoxClicked = false;
let box_body;
let box_lid;

camera.position.setZ(7);
camera.position.setY(3);

loader.load(
  "background2.png",
  function (gltf) {
    scene.add(temple);
  },
  undefined,
  function (error) {
    console.log(error);
  }
);
loader.load(
  "P_Lid/scene.gltf",
  function (gltf) {
    box_lid = gltf.scene;
    pandorasBox.add(box_lid);
    camera.lookAt(pandorasBox.position);
  },
  undefined,
  function (error) {
    console.log(error);
  }
);
loader.load(
  "P_Box/scene.gltf",
  function (gltf) {
    box_body = gltf.scene;
    pandorasBox.add(box_body);
    camera.lookAt(pandorasBox.position);
  },
  undefined,
  function (error) {
    console.log(error);
  }
);

// adding lights to the scene

scene.add(pandorasBox);
scene.add(directLight);
scene.add(ambientLight);
scene.add(spotLight);

// raycaster setup

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

// determining where the pointer is

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

const title = document.querySelector(".homepage-title");

// adding eventListener

window.addEventListener("pointermove", onPointerMove);

window.addEventListener("click", startStorySetup);

/* 
    determining if we clicked on the box, if yes - startStorySetup function will run and call the rotate to front function
    we want the box to rotate to front when the user clicks on it
*/

function isHittingBox() {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    return true;
  } else return false;
}

function startStorySetup() {
  if (isHittingBox() == true) {
    console.log("moving to story");
    isBoxClicked = true;
    rotateToFront();
  }
}

/*
    After the user clicks on the box, and the box rotate to front, lid should open - setting the rotation
*/

function openBox() {
  title.setAttribute("class", "homepage-title-animated");

  requestAnimationFrame(openBox);

  if (box_lid.rotation.z < 1) {
    box_lid.rotateZ(0.001);
    box_lid.position.y += 0.001;
  } else {
    isBoxOpen = true;
  }
}

// function which will rotate the box to front once the user clicks on it

function rotateToFront() {
  requestAnimationFrame(rotateToFront);

  if (pandorasBox.rotation.y > -1.55) {
    pandorasBox.rotateY(-0.05);
  }

  if (pandorasBox.rotation.y <= -1.55) {
    openBox();
    zoomIntoBox();
  }
}

/* 
    after the rotation is stopped, lid opens, camera will zoom into the box
    lights also lower so we don't see inside of the model
    when the box zooms to a certain point, startStory function is called
*/

function zoomIntoBox() {
  requestAnimationFrame(zoomIntoBox);
  let speedMultiplier = 2;
  if (camera.position.z > -0.5) {
    camera.position.z -= 0.0001 * speedMultiplier;
    camera.position.y -= 0.00003 * speedMultiplier;
    ambientLight.intensity -= 0.0001 * speedMultiplier;
    directLight.intensity -= 0.0001 * speedMultiplier;
  } else {
    startStory();
    return;
  }
}

// elementary rotation of the box when the page loads

pandorasBox.rotation.y = -1.55;
function update() {
  requestAnimationFrame(update);
  renderer.render(scene, camera);
  if (!isBoxClicked) {
    pandorasBox.rotateY(-0.003);
  }
}

/*
    startStory function gets called once the box zooms in, lights go down. 
    it will set the display of the div in which the scene is set to "none"
    when we build the first page of the story itself, element should be queried inside this function.
    
    ! Since the end is blackout, should be good to have in the beginning of the story black screen that slowly fades to an image so the transition isn't too abrupt
*/

function startStory() {
  const pandorasBoxContainer = document.getElementById(
    "pandoras-box-container"
  );
  pandorasBoxContainer.classList.add("pandoras-box-container-fadeOut");

  pandorasBoxContainer.addEventListener(
    "animationend",
    () => {
      pandorasBoxContainer.style.display = "none";

      const storyBase = document.querySelector(".storybase");
      const scene1 = storyBase.querySelector(".scene1");
      const scene3 = storyBase.querySelector(".scene3");
      const scene6 = storyBase.querySelector(".scene6");

      scene1.classList.add("scene-visible");
      scene3.classList.add("scene-visible");
      scene6.classList.add("scene-visible");

      // Animation to move text from off-screen to the desired position
      const sceneText = document.getElementById("scene-text1");
      sceneText.classList.add("animate-in");
    },
    { once: true }
  );
}

update();

// canvas mouse animation

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
    this.opacity = 0.5;

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
    }
    this.time++;
  }
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
