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
        if (child.geometry instanceof THREE.BoxGeometry) {
            scene.remove(child);
        }
    });  
    
    // Create cubes
    array.forEach((subArray, subIndex) => {
        subArray.forEach((innerArray, outerIndex) => {
            innerArray.forEach((values, innerIndex) => {
                const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
                const cubeMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0xffffff,
                    map: minecraftGlass,
                    transparent: true, 
                    refractionRatio: 0.9, 
                    metalness: 0.5, 
                    roughness: 0.2,
                });
                const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;
                cube.receiveShadow = true;
                const xPos = innerIndex - (innerArray.length - 1);
                const yPos = outerIndex;
                const zPos = subIndex; 
                cube.position.set(xPos, yPos, zPos);
                cube.userData.isCube = true; // Flag to identify cubes for raycasting
                
                // Create sprite
                const spriteCanvas = document.createElement('canvas');
                spriteCanvas.width = 64; 
                spriteCanvas.height = 64; 
                const spriteContext = spriteCanvas.getContext('2d');
                spriteContext.font = '20px Arial';
                spriteContext.fillStyle = 'white';
                spriteContext.fillText(values, 25, 35); 
                
                const spriteTexture = new THREE.CanvasTexture(spriteCanvas);
                spriteTexture.needsUpdate = true;
                
                const spriteMaterial = new THREE.SpriteMaterial({ 
                    map: spriteTexture,
                    depthTest: false  });
                const sprite = new THREE.Sprite(spriteMaterial);
                cube.add(sprite); // Attach sprite to cube
                
                scene.add(cube);
            });
        });
    });
}


// THREE

const scene = new THREE.Scene();
const fogColor = 0x000000;
const fogNear = 1; 
const fogFar = 100; 
scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 8);
camera.lookAt(0, 0, 0);

const canvas = document.getElementById("bg");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const controls = new OrbitControls( camera, renderer.domElement );

var ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5); 
directionalLight.castShadow = true;
scene.add(directionalLight);
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

// Add helper for directional light
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);

const textureLoader = new THREE.TextureLoader();
const minecraftGlass = textureLoader.load('../assets/glass.png');

const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    map: minecraftGlass,
    transparent: true, 
    metalness: 0.5, 
    roughness: 0.2,
});
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.castShadow = true;
cube.receiveShadow = true;
scene.add( cube );

const groundGeometry = new THREE.PlaneGeometry(100, 100); 
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x000, }); 

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; 
ground.position.y -= 0.5;
ground.receiveShadow = true;
scene.add(ground);

function animate() {
	requestAnimationFrame( animate );
    controls.update();
	renderer.render( scene, camera );
}
animate();

