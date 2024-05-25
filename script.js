import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";


const scene = new THREE.Scene();

/*
    field of view: 75 degrees,
    window.innerWidth/window.innerHeight - aspect ratio
    near clipping plane - objects closer than 0.1 won't be rendered
    far clipping plane - objects further from 1000 won't be rendered
*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//  lights setup

const directLight = new THREE.DirectionalLight(new THREE.Color(0xcc8800), 5)
const ambientLight = new THREE.AmbientLight(new THREE.Color(0xf2f2f2), 5)
const spotLight = new THREE.SpotLight(new THREE.Color(0xb35900), 100)
spotLight.position.setY(150)

/*
    creating renderer instance
    setting color to be transparent so that the background img is visible
    seting the size of the are we want to render
    adding renderer element to div with id #pandoras-box-container
*/

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 0)
renderer.setSize(window.innerWidth, window.innerHeight);
const pandorasBoxContainer = document.getElementById("pandoras-box-container")
pandorasBoxContainer.appendChild(renderer.domElement)

/*
    importing the loader
    making an empty parent for the box_body and the box_lid and attaching it to parent: pandorasBox
    setting the camera position
*/

const loader = new GLTFLoader();
const pandorasBox = new THREE.Scene;

let isBoxClicked = false;
let box_body;
let box_lid

camera.position.setZ(7)
camera.position.setY(3)

loader.load("background2.png", function (gltf) {
    scene.add(temple)
}, undefined, function (error) {
    console.log(error)
})
loader.load("P_Lid/scene.gltf", function (gltf) {
    box_lid = gltf.scene;
    pandorasBox.add(box_lid)
    camera.lookAt(pandorasBox.position)
}, undefined, function (error) {
    console.log(error)
})
loader.load("P_Box/scene.gltf", function (gltf) {
    box_body = gltf.scene;
    pandorasBox.add(box_body)
    camera.lookAt(pandorasBox.position)
}, undefined, function (error) {
    console.log(error)
})

// adding lights to the scene

scene.add(pandorasBox)
scene.add(directLight);
scene.add(ambientLight);
scene.add(spotLight)

// raycaster setup

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

// determining where the pointer is

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

// adding eventListener

window.addEventListener("pointermove", onPointerMove)

window.addEventListener("click", startStorySetup)

/* 
    determining if we clicked on the box, if yes - startStorySetup function will run and call the rotate to front function
    we want the box to rotate to front when the user clicks on it
*/

function isHittingBox() {

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {

        return true;
    }
    else
        return false;
}

function startStorySetup() {
    if (isHittingBox() == true) {
        console.log("moving to story")
        isBoxClicked = true;
        rotateToFront()
    }
}

/*
    After the user clicks on the box, and the box rotate to front, lid should open - setting the rotation
*/

function openBox() {
    requestAnimationFrame(openBox);

    if (box_lid.rotation.z < 1) {
        box_lid.rotateZ(0.001)
        box_lid.position.y += 0.001
    } else {
        isBoxOpen = true;
    }
}

// function which will rotate the box to front once the user clicks on it

function rotateToFront() {
    requestAnimationFrame(rotateToFront)

    if (pandorasBox.rotation.y > -1.55) {
        pandorasBox.rotateY(-0.05)
    }


    if (pandorasBox.rotation.y <= -1.55) {
        openBox()
        zoomIntoBox()
    }
}

/* 
    after the rotation is stopped, lid opens, camera will zoom into the box
    lights also lower so we don't see inside of the model
    when the box zooms to a certain point, startStory function is called
*/

function zoomIntoBox() {
    requestAnimationFrame(zoomIntoBox)
    let speedMultiplier = 2
    if (camera.position.z > -0.5) {
        camera.position.z -= 0.0001 * speedMultiplier
        camera.position.y -= 0.00003 * speedMultiplier
        ambientLight.intensity -= 0.0001 * speedMultiplier
        directLight.intensity -= 0.0001 * speedMultiplier
    } else {
        startStory()
        return;
    }
}

// elementary rotation of the box when the page loads

pandorasBox.rotation.y = -1.55
function update() {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    if (!isBoxClicked) {
        pandorasBox.rotateY(-0.003)
    }
}

/*
    startStory function gets called once the box zooms in, lights go down. 
    it will set the display of the div in which the scene is set to "none"
    when we build the first page of the story itself, element should be queried inside this function.
    
    ! Since the end is blackout, should be good to have in the beginning of the story black screen that slowly fades to an image so the transition isn't too abrupt
*/

function startStory() {
    document.getElementById("pandoras-box-container").style.display = "none";
    // query another element - beginning of the story here
}


update()

