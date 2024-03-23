import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const minecraftglass = "https://i.postimg.cc/KvxghRQm/glass.png";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const textureLoader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.background = new THREE.Color(0x000);
directionalLight.castShadow = true; 

// textures
const minecraftGlassTexture = textureLoader.load('https://i.postimg.cc/x1656gcm/tinted-glass.png');

// models
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshStandardMaterial({
        map: minecraftGlassTexture,
        transparent: true,  
    })
);
cube.castShadow = true; 
cube.receiveShadow = true;

const floor = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 15),
    new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide }),
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;

// functions
    
// Positions
camera.position.set(0, 10, 20);
directionalLight.position.set(5, 10, 5);
floor.position.setY(-10);

scene.add( cube, ambientLight, directionalLight, floor );

function animate() {
	requestAnimationFrame( animate );
    controls.update();
	renderer.render( scene, camera );
}
animate();