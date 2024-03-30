import * as THREE from 'three';

let arr = [1];
const arrayInput = document.getElementById("array-input");

arrayInput.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        try {
            arr = JSON.parse(arrayInput.value);
        } catch (error) {
            console.log("Input is not an array !");
        }
        console.log(arr);
    }
})


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const canvas = document.getElementById("bg");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    console.log(arr);
	renderer.render( scene, camera );
}
animate();