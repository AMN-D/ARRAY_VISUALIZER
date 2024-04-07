import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let arr = [1];
const arrayInput = document.getElementById("array-input");

arrayInput.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        try {
            arr = JSON.parse(arrayInput.value);
            for (let i = 0; i < arr.length*2; i++) {
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
        if (child instanceof THREE.Mesh || child instanceof THREE.Sprite) {
            scene.remove(child);
        }
    });    
    
    array.forEach((subArray, subIndex) => {
        subArray.forEach((innerArray, outerIndex) => {
            innerArray.forEach((values, innerIndex) => {
                const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
                const cubeMaterial = new THREE.MeshStandardMaterial({ 
                    color: "#d6fd5d",
                    transparent: true,
                    wireframe: true, 
                    // opacity: 0.1 
                });
                const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                // Calculate positions based on outer and inner indices
                const xPos = innerIndex - (innerArray.length - 1);
                const yPos = outerIndex; // Adjust yPos based on subIndex
                const zPos = subIndex; // Adjust zPos based on subIndex
    
                cube.position.set(xPos, yPos, zPos);
                scene.add(cube);
            });
        });
    
    
        // // Create a sprite for the text
        // const spriteCanvas = document.createElement('canvas');
        // const spriteContext = spriteCanvas.getContext('2d');
        // spriteContext.font = 'Bold 24px Arial';
        // spriteContext.fillStyle = '#ffffff';
        // spriteContext.fillText(value.toString(), 0, 24);
    
        // const texture = new THREE.CanvasTexture(spriteCanvas);
        // texture.needsUpdate = true;
    
        // const spriteMaterial = new THREE.SpriteMaterial({ map: texture, depthTest: false });
        // const sprite = new THREE.Sprite(spriteMaterial);
        // sprite.position.set(index * 1 - array.length, 0, 0);
        // scene.add(sprite);
    });
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
    color: "#d6fd5d",
});
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
scene.add( cube );

function animate() {
	requestAnimationFrame( animate );
    controls.update();
	renderer.render( scene, camera );
}
animate();

