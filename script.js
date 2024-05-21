import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

/*
    field of view: 75 degrees,
    window.innerWidth/window.innerHeight - aspect ratio
    near clipping plane - objects closer than 0.1 won't be rendered
    far clipping plane - objects further from 1000 won't be rendered
*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//  light

const directLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 10)
const ambientLight = new THREE.AmbientLight(new THREE.Color(0xffffff), 5)
const spotLight = new THREE.SpotLight(new THREE.Color(0xffffff), 100)
spotLight.position.setY(150)

/*
    creating renderer instance
    seting the size of the are we want to render
    adding renderer element to body
*/
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

// importing the loader, orbital controls, adding light to the scene

const loader = new GLTFLoader();
const controls = new OrbitControls(camera, renderer.domElement)
camera.position.setZ(5)
camera.position.setX(10)
camera.position.setY(5)
controls.update()

loader.load("pandoras_box/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    scene.add(directLight);
    scene.add(ambientLight);
    scene.add(spotLight)
}, undefined, function (error) {
    console.log(error)
})


// rendering object

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

// adding eventListener / raycaster

window.addEventListener("pointermove", onPointerMove)

window.addEventListener("click", startStory)

function isHittingBox() {

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {

        return true;
    }
    else
        return false;
}

function startStory() {
    if (isHittingBox() == true) {
        console.log("moving to story")
    }
}


function update() {
    requestAnimationFrame(update);
    controls.update()
    renderer.render(scene, camera);
}

update()