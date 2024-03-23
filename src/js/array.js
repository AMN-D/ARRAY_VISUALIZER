import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Textures
const minecraftglass = "https://mineblocks.com/1/wiki/images/1/15/Glass.png";
const textureLoader = new THREE.TextureLoader();
const mglass = textureLoader.load(minecraftglass);

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x121212);
scene.fog = new THREE.Fog(0x121212, 2, 500);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 10, 10);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2;

// Lights setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.position.set(20, 15, 25);
scene.add(ambientLight, directionalLight);

// Helpers setup
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);

// Floor setup
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(999, 999, 10),
    new THREE.MeshStandardMaterial({
        color: 0x121212,
        roughness: 1,
    }),
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.position.setY(-1.5);
scene.add(floor);

// Functions
function createCubes(positions) {
    const cubes = [];
    positions.reverse().forEach((row, rowIndex) => {
        const rowCubes = [];
        row.forEach((pos, colIndex) => {

            const cube = new THREE.Mesh(
                new THREE.BoxGeometry(3, 3, 3),
                new THREE.MeshPhongMaterial({
                    flatShading: true,
                    map: mglass,
                    transparent: true,
                    shininess: 100,
                    specular: 0xffffff,
                    reflectivity: 1,
                })
            );
            cube.position.set(pos * 0, rowIndex * 3, colIndex * 3);
            cube.castShadow = true;
            rowCubes.push(cube);
        });
        cubes.push(rowCubes);
    });
    return cubes;
}

// Main setup
const inputArray = [
    [1, 2, 3],
];

const cubes = createCubes(inputArray);
cubes.forEach(row => {
    row.forEach(cube => {
        scene.add(cube);
    });
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
