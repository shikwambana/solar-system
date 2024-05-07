import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';


const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//field of view of camera
camera.position.set(-10, 30, 30);
orbit.update();

//create the object 
const boxGeometry = new THREE.BoxGeometry();
//give it properties
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
//fuse the geometry of the above
const box = new THREE.Mesh(boxGeometry, boxMaterial);
//add the object to the scene
scene.add(box);

//create a plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

//add a grid helper for better visualisation
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

//create a sphere and add it to the scene
const sphereGeometry = new THREE.SphereGeometry(4, 50,50);
const sphereMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x0000ff,
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

//move the sphere
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

//add ambient light 
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper) ;


//working with spotlights

const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(-100,100,0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);


//create a gui instance

const gui = new dat.GUI()

const options = {
 sphereColor: 0x0000ff,
 wireframe: false,
 speed: 0.0001,
 angle: 0.2,
 penumbra: 0,
 intensity: 1
}

gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e;
});

gui.add(options, 'speed',0,0.0001);

gui.add(options, 'angle',0,1);
gui.add(options, 'penumbra',0,1);
gui.add(options, 'intensity',0,1);

let step = 0;
let speed = 0.01;

//animate)
function animate(time) {
    requestAnimationFrame(animate);
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    sLightHelper.update();


    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


