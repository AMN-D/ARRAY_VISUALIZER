import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const bgTexture = new THREE.TextureLoader().load('https://i.postimg.cc/FH4sc3tS/background.jpg');
scene.background = bgTexture;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0xFF6347,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);

const gridHelper = new THREE.GridHelper(200, 50);

scene.add(pointLight, ambientLight, lightHelper, gridHelper);

const controls = new OrbitControls( camera, renderer.domElement );

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25);
    const material = new THREE.MeshStandardMaterial({
        color: 0x161616,
    })
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array.from({ length: 3 }, () => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add( star );
}

Array.from({ length: 200 }).forEach(addStar);

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();
