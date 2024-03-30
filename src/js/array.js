import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let arr = [1];
const arrayInput = document.getElementById("array-input");

arrayInput.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        try {
            arr = JSON.parse(arrayInput.value);
            for (let i = 0; i < arr.length; i++) {
                createCubes(arr);
              }
        } catch (error) {
            console.log("Input is not an array !");
        }
        console.log(arr);
    }
})

// Connector

function createCubes(array) {
    scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
            scene.remove(child);
        }
    });

    array.forEach((value, index) => {
        const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
        const cubeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x00ff00,
            wireframe: true,
        });
        const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
        cube.position.set(index * 1 - array.length, 0, 0); 
        scene.add( cube );
    })
}

// THREE

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const canvas = document.getElementById("bg");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );

var ambientLight = new THREE.AmbientLight(0xffffff, 2); 
scene.add(ambientLight);

const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00,
});
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
scene.add( cube );

function animate() {
	requestAnimationFrame( animate );
    controls.update();
    console.log(arr);
	renderer.render( scene, camera );
}
animate();

