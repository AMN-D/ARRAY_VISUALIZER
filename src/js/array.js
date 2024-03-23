import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const bgTexture = new THREE.TextureLoader().load('https://i.postimg.cc/FH4sc3tS/background.jpg');
scene.background = bgTexture;

const glassblock = new THREE.TextureLoader().load('https://i.postimg.cc/zXKH9TTt/glass.png');
const moonnormal = new THREE.TextureLoader().load('https://i.postimg.cc/fRTSqChx/lunarrock-n.png');
const moontexture = new THREE.TextureLoader().load('https://i.postimg.cc/xTgcmmbq/lunarrock-s.png');

const gblock = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshStandardMaterial( {
        map: glassblock,
        transparent: true,  
    } )
);

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial( {
        map: moontexture,  
        normalMap: moonnormal,
    } )
);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0xFF6347,
});
const torus = new THREE.Mesh(geometry, material);
scene.add( torus, gblock, moon );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);
pointLight.intensity = 200;

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 1.5;

const lightHelper = new THREE.PointLightHelper(pointLight);

const gridHelper = new THREE.GridHelper(200, 50);

scene.add(pointLight, ambientLight );

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
    
    moon.rotation.x += 0.01;
    moon.rotation.y += 0.01;
    moon.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();
