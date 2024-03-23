import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const minecraftglass = "https://mineblocks.com/1/wiki/images/1/15/Glass.png";

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
const mglass = textureLoader.load(minecraftglass);

// models
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshPhongMaterial({
        flatShading: false,  
        transparent: true,
        map: mglass,
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


// Positions
camera.position.set(0, 10, 20);
directionalLight.position.set(5, 10, 5);
floor.position.setY(-2);
directionalLight.position.set(5, 10, 5);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1); // Set the size of the helper

scene.add( cube, ambientLight, directionalLight, floor, lightHelper );

// functions
function createCubes( positions ) {
    const cubes = [];
    positions.forEach((pos, index) => {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshPhongMaterial({
                flatShading: false,  
                map: mglass,
                transparent: true,
            })
        );
        cube.position.set(pos * 3, 0, 0);
        cubes.push(cube);
    });
    return cubes;
}

const inputArray = [1, 2, 3, 4];
const cubes = createCubes(inputArray);
cubes.forEach(cube => {
    scene.add(cube);
});

function animate() {
	requestAnimationFrame( animate );
    controls.update();
	renderer.render( scene, camera );
}
animate();