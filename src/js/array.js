import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const minecraftglass = "https://i.postimg.cc/KvxghRQm/glass.png";

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x121212, 2, 500);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const textureLoader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), antialias: true, });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2;

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);

scene.background = new THREE.Color(0x121212);
directionalLight.castShadow = true; 

// textures

// models
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshPhongMaterial({
        color: 0xd6fd5d,
        flatShading: false,  
    })
);

cube.castShadow = true; 
cube.receiveShadow = true;

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(999, 999, 10),
    new THREE.MeshStandardMaterial({ 
        color: 0x121212 , 
        side: THREE.DoubleSide,
        roughness: 1,
    }),
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;

// functions
    
// Positions
camera.position.set(0, 10, 20);
directionalLight.position.set(5, 10, 5);
floor.position.setY(-2);
directionalLight.position.set(5, 10, 5);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1); // Set the size of the helper

scene.add( cube, ambientLight, directionalLight, floor, lightHelper );

function animate() {
	requestAnimationFrame( animate );
    controls.update();
	renderer.render( scene, camera );
}
animate();