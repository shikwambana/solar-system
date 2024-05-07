import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import starsTexture from '../img/stars.jpg'
import sunTexture from '../img/sun.jpg'
import mercuryTexture from '../img/mercury.jpg'
import venusTexture from '../img/venus.jpg'
import earthTexture from '../img/earth.jpg'
import marsTexture from '../img/mars.jpg'
import jupiterTexture from '../img/jupiter.jpg'
import uranusTexture from '../img/uranus.jpg'
import neptuneTexture from '../img/neptune.jpg'
import saturnTexture from '../img/saturn.jpg'
import saturnRingTexture from '../img/saturn-ring.png'

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

camera.position.set(-90, 140, 140);

const orbit = new OrbitControls(camera, renderer.domElement);

orbit.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();

scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
]);

const textuerLoader = new THREE.TextureLoader();

// create saturn's ring

// const saturnRing = new THREE.RingGeometry(10,20,32)
// const saturnRingMat = new THREE.MeshBasicMaterial({
//     map: textuerLoader.load(saturnRingTexture),
//     side: THREE.DoubleSide
// })
// const saturnRingMesh = new THREE.Mesh(saturnRing, saturnRingMat)
// saturnObj.add(saturnRingMesh)
// saturnRingMesh.position.x = 138
// saturnRingMesh.position.y = 1.5


//create the sun 

const sun = addPlanetToSolarSystem(70, sunTexture, 0);

// create mercury

const mercury = addPlanetToSolarSystem(2, mercuryTexture, 100)

//create venus

const venus = addPlanetToSolarSystem(2.8, venusTexture, 130)


//create earth
const earth = addPlanetToSolarSystem(3, earthTexture, 170)


//create mars
const mars = addPlanetToSolarSystem(2.7, marsTexture, 210)

// create Jupiter

const jupiter = addPlanetToSolarSystem(7, jupiterTexture, 250)

//create saturn

const saturn = addPlanetToSolarSystem(5, saturnTexture, 300)

// create uranus

const uranus = addPlanetToSolarSystem(4, uranusTexture, 330)

// create neptune

const neptune = addPlanetToSolarSystem(3.5, marsTexture, 370)

// add 
function addPlanetToSolarSystem(size, texture, position, rotationSpeed){

    const planetGeometry = new THREE.SphereGeometry(size, 30 , 30);
    const planetMaterial = new THREE.MeshBasicMaterial({
        map: textuerLoader.load(texture)
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.x = position;

    const planetObj = new THREE.Object3D();
    planetObj.add(planet);
    scene.add(planetObj);

    return {planetObj, planet};
}

// create a ring for a planet 
function addRingToPlanet(planet, size, texture){

    const ringGeometry = new THREE.RingGeometry(size, size + 1, 32);


}




function animate(){

    sun.planetObj.rotateY(0.001);
    mercury.planetObj.rotateY(0.010);
    venus.planetObj.rotateY(0.005);
    earth.planetObj.rotateY(0.004);
    mars.planetObj.rotateY(0.0035);
    jupiter.planetObj.rotateY(0.0013);
    saturn.planetObj.rotateY(0.0012);
    uranus.planetObj.rotateY(0.0011);
    neptune.planetObj.rotateY(0.0010);

    sun.planet.rotateY(0.001);
    mercury.planet.rotateY(0.010);
    venus.planet.rotateY(0.005);
    earth.planet.rotateY(0.004);
    mars.planet.rotateY(0.0035);
    jupiter.planet.rotateY(0.0013);
    saturn.planet.rotateY(0.0012);
    uranus.planet.rotateY(0.0011);
    neptune.planet.rotateY(0.0010);

    orbit.update();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})