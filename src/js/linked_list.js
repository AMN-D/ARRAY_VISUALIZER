import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const textureLoader = new THREE.TextureLoader();
const clear = document.getElementById("clearall");
const minecraftGlassStained = textureLoader.load('../assets/white_stained_glass.png');



// THREE

const scene = new THREE.Scene();
const fogColor = 0x000000;
const fogNear = 1; 
const fogFar = 100; 
scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 1, 8);
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

// Create a spotlight
const spotlight = new THREE.SpotLight(0xfdf4dc, 100);
spotlight.position.set(0, 10, 0); // Position the spotlight
spotlight.angle = Math.PI / 6; // Set the spotlight angle
spotlight.penumbra = 0.5; // Softens the edges of the spotlight
spotlight.decay = 2; // How the light intensity attenuates over distance
spotlight.distance = 200; // The distance at which the light intensity is zero
spotlight.castShadow = true; // Enable shadow casting
scene.add(spotlight);

// Helper to visualize the spotlight
// const spotlightHelper = new THREE.SpotLightHelper(spotlight);
// scene.add(spotlightHelper);

// Create directional light facing east
const directionalLightEast = new THREE.DirectionalLight(0xff0000, 0.1);
directionalLightEast.position.set(10, 0, 0); // Position to the east
directionalLightEast.target.position.set(0, 0, 0); // Pointing towards the center
scene.add(directionalLightEast);
scene.add(directionalLightEast.target);

// Create directional light facing west
const directionalLightWest = new THREE.DirectionalLight(0xff0000, 0.1);
directionalLightWest.position.set(-10, 0, 0); // Position to the west
directionalLightWest.target.position.set(0, 0, 0); // Pointing towards the center
scene.add(directionalLightWest);
scene.add(directionalLightWest.target);

// Create directional light facing north
const directionalLightNorth = new THREE.DirectionalLight(0x0000ff, 0.1);
directionalLightNorth.position.set(0, 0, -10); // Position to the north
directionalLightNorth.target.position.set(0, 0, 0); // Pointing towards the center
scene.add(directionalLightNorth);
scene.add(directionalLightNorth.target);

// Create directional light facing south
const directionalLightSouth = new THREE.DirectionalLight(0x0000ff, 0.1);
directionalLightSouth.position.set(0, 0, 10); // Position to the south
directionalLightSouth.target.position.set(0, 0, 0); // Pointing towards the center
scene.add(directionalLightSouth);
scene.add(directionalLightSouth.target);


// Create a point light
const pointLightBottom = new THREE.PointLight(0xffffff, 2); // color, intensity
pointLightBottom.position.set(0, 0, 0); 
scene.add(pointLightBottom);

const pointLightLeft = new THREE.PointLight(0xffffff, 10); // color, intensity
pointLightLeft.position.set(5, 5, 0); 
scene.add(pointLightLeft);

const pointLightRight = new THREE.PointLight(0xffffff, 10); // color, intensity
pointLightRight.position.set(-5, 5, 0); // Adjust position for the right
scene.add(pointLightRight);

const pointLightFront = new THREE.PointLight(0xffffff, 10); // color, intensity
pointLightFront.position.set(0, 5, -5); // Adjust position for the front
scene.add(pointLightFront);

const pointLightBack = new THREE.PointLight(0xffffff, 10); // color, intensity
pointLightBack.position.set(0, 5, 5); // Adjust position for the back
scene.add(pointLightBack);

const minecraftGlass = textureLoader.load('../assets/glass.png');

// Create sprite head
const head = "head";
const spriteCanvas = document.createElement('canvas');
spriteCanvas.width = 80; 
spriteCanvas.height = 80; 
const spriteContext = spriteCanvas.getContext('2d');
spriteContext.font = '25px Arial';
spriteContext.fillStyle = 'gray';
spriteContext.fillText(head, 25, 25); 
const spriteTexture = new THREE.CanvasTexture(spriteCanvas);
spriteTexture.needsUpdate = true;
const spriteMaterial = new THREE.SpriteMaterial({ 
    map: spriteTexture,
    depthTest: false  });
const headsprite = new THREE.Sprite(spriteMaterial);
headsprite.position.set(-3, 0.8, 0);
scene.add(headsprite);

// Create sprite tail
const tail = "tail";
const tailspriteCanvas = document.createElement('canvas');
tailspriteCanvas.width = 80; 
tailspriteCanvas.height = 80; 
const tailspriteContext = tailspriteCanvas.getContext('2d');
tailspriteContext.font = '25px Arial';
tailspriteContext.fillStyle = 'gray';
tailspriteContext.fillText(tail, 25, 25); 
const tailspriteTexture = new THREE.CanvasTexture(tailspriteCanvas);
tailspriteTexture.needsUpdate = true;
const tailspriteMaterial = new THREE.SpriteMaterial({ 
    map: tailspriteTexture,
    depthTest: false  });
const tailsprite = new THREE.Sprite(tailspriteMaterial);
tailsprite.position.set(2, 0.8, 0);
scene.add(tailsprite);

const cubeGeometry = new THREE.BoxGeometry(1.5, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    map: minecraftGlass,
    metalness: 0.5, 
    roughness: 0.2,
    alphaTest: 0.1,
});
const dataCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
dataCube.castShadow = true;
dataCube.receiveShadow = true;
dataCube.position.set(-1, 1, 0);
const nextCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
nextCube.castShadow = true;
nextCube.receiveShadow = true;
nextCube.position.set(0.50, 1, 0);
scene.add(dataCube, nextCube);

// Create sprite for data
const data = "data";
const dataSpriteCanvas = document.createElement('canvas');
dataSpriteCanvas.width = 80; 
dataSpriteCanvas.height = 80; 
const dataSpriteContext = dataSpriteCanvas.getContext('2d');
// Set font and fill style, then draw the text on the canvas
dataSpriteContext.font = '18px Arial';
dataSpriteContext.fillStyle = 'gray';
dataSpriteContext.fillText(data, 10, 50); // Adjusted x and y positions
// Create texture from the canvas and update it
const dataSpriteTexture = new THREE.CanvasTexture(dataSpriteCanvas);
dataSpriteTexture.needsUpdate = true;
// Create sprite material with the texture
const dataSpriteMaterial = new THREE.SpriteMaterial({ 
    map: dataSpriteTexture,
    depthTest: false
});
// Create the sprite and add it to the scene
const dataSprite = new THREE.Sprite(dataSpriteMaterial);
dataSprite.position.set(0.1, 1, 0); // Adjust the position as needed
dataCube.add(dataSprite);

// Create sprite for "next"
const nextText = "next";
const nextSpriteCanvas = document.createElement('canvas');
nextSpriteCanvas.width = 80;
nextSpriteCanvas.height = 80;
const nextSpriteContext = nextSpriteCanvas.getContext('2d');
// Set font and fill style, then draw the text on the canvas
nextSpriteContext.font = '18px Arial';
nextSpriteContext.fillStyle = 'gray';
nextSpriteContext.fillText(nextText, 10, 50); // Adjusted x and y positions
// Create texture from the canvas and update it
const nextSpriteTexture = new THREE.CanvasTexture(nextSpriteCanvas);
nextSpriteTexture.needsUpdate = false;
// Create sprite material with the texture
const nextSpriteMaterial = new THREE.SpriteMaterial({
    map: nextSpriteTexture,
    depthTest: false
});
// Create the sprite and add it to the scene
const nextSprite = new THREE.Sprite(nextSpriteMaterial);
nextSprite.position.set(0.1, 1, 0); // Adjust the position as needed
nextCube.add(nextSprite);

// Create sprite for "inputdata" with text "12"
const inputDataText = "12";
const inputDataCanvas = document.createElement('canvas');
inputDataCanvas.width = 80;
inputDataCanvas.height = 80;
const inputDataContext = inputDataCanvas.getContext('2d');
// Set font and fill style, then draw the text on the canvas
inputDataContext.font = '18px Arial';
inputDataContext.fillStyle = 'gray';
inputDataContext.fillText(inputDataText, 10, 50); // Adjust x and y positions as needed
// Create texture from the canvas and update it
const inputDataTexture = new THREE.CanvasTexture(inputDataCanvas);
inputDataTexture.needsUpdate = true;
// Create sprite material with the texture
const inputDataMaterial = new THREE.SpriteMaterial({
    map: inputDataTexture,
    depthTest: false
});
// Create the sprite and add it to the scene
const inputDataSprite = new THREE.Sprite(inputDataMaterial);
inputDataSprite.position.set(0.2, 0, 0); // Adjust the position as needed
dataCube.add(inputDataSprite);

// Create sprite for "null"
const nullText = "null";
const nullSpriteCanvas = document.createElement('canvas');
nullSpriteCanvas.width = 80;
nullSpriteCanvas.height = 80;
const nullSpriteContext = nullSpriteCanvas.getContext('2d');
// Set font and fill style, then draw the text on the canvas
nullSpriteContext.font = '18px Arial';
nullSpriteContext.fillStyle = 'gray';
nullSpriteContext.fillText(nullText, 10, 50); // Adjust x and y positions as needed
// Create texture from the canvas and update it
const nullSpriteTexture = new THREE.CanvasTexture(nullSpriteCanvas);
nullSpriteTexture.needsUpdate = true;
// Create sprite material with the texture
const nullSpriteMaterial = new THREE.SpriteMaterial({
    map: nullSpriteTexture,
    depthTest: false
});
// Create the sprite and add it to the scene
const nullSprite = new THREE.Sprite(nullSpriteMaterial);
nullSprite.position.set(0.2, 0, 0); // Adjust the position as needed
nextCube.add(nullSprite);


const groundGeometry = new THREE.PlaneGeometry(100, 100); 
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x000, }); 

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; 
ground.position.y -= 0.5;
ground.receiveShadow = true;
scene.add(ground);

// // Y-axis line
// const yPoints = [];
// yPoints.push(new THREE.Vector3(0, 0, 0)); // Start point (at origin)
// yPoints.push(new THREE.Vector3(0, 100, 0)); // End point (along the y-axis)
// const yLineMaterial = new THREE.LineBasicMaterial({ color: 0xBCF5A6 }); // Line color
// const yLineGeometry = new THREE.BufferGeometry().setFromPoints(yPoints);
// const yLine = new THREE.Line(yLineGeometry, yLineMaterial);
// scene.add(yLine);

// // X-axis line
// const xPoints = [];
// xPoints.push(new THREE.Vector3(-100, 0, 0)); // Start point (at origin)
// xPoints.push(new THREE.Vector3(100, 0, 0)); // End point (along the x-axis)
// const xLineMaterial = new THREE.LineBasicMaterial({ color: 0xDB6A6C }); // Line color
// const xLineGeometry = new THREE.BufferGeometry().setFromPoints(xPoints);
// const xLine = new THREE.Line(xLineGeometry, xLineMaterial);
// scene.add(xLine);

// // Z-axis line
// const zPoints = [];
// zPoints.push(new THREE.Vector3(0, 0, -100)); // Start point (at origin)
// zPoints.push(new THREE.Vector3(0, 0, 100)); // End point (along the z-axis)
// const zLineMaterial = new THREE.LineBasicMaterial({ color: 0x658CBB }); // Line color
// const zLineGeometry = new THREE.BufferGeometry().setFromPoints(zPoints);
// const zLine = new THREE.Line(zLineGeometry, zLineMaterial);
// scene.add(zLine);

function animate() {
	requestAnimationFrame( animate );
    controls.update();
	renderer.render( scene, camera );
    
}
animate();

