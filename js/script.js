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
import moonTexture from '../img/moon.jpg'


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

//create the sun 

const sun = addPlanetToSolarSystem(70, sunTexture, 0);

// create mercury

const mercury = addPlanetToSolarSystem(2, mercuryTexture, 120)

//create venus

const venus = addPlanetToSolarSystem(2.8, venusTexture, 145)


//create earth
const earth = addPlanetToSolarSystem(3, earthTexture, 160, 1)


//create mars
const mars = addPlanetToSolarSystem(2.7, marsTexture, 180, 2)

// create Jupiter

const jupiter = addPlanetToSolarSystem(7, jupiterTexture, 210, 10)

//create saturn

const saturn = addPlanetToSolarSystem(5, saturnTexture, 270,{
    innerRadius: 8,
    outerRadius: 17,
    texture: saturnRingTexture,
    position: 270
})

// create uranus

const uranus = addPlanetToSolarSystem(4, uranusTexture, 340, 6)

// create neptune

const neptune = addPlanetToSolarSystem(3.5, neptuneTexture, 400,6)

// add a planet to the solar system
function addPlanetToSolarSystem(size, texture, position, ringOrMoons){

    const planetGeometry = new THREE.SphereGeometry(size, 30 , 30);
    const planetMaterial = new THREE.MeshBasicMaterial({
        map: textuerLoader.load(texture)
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.x = position;

    const planetObj = new THREE.Object3D();
    planetObj.add(planet);

    if(ringOrMoons && !Number(ringOrMoons)){

        const ringGeometry = new THREE.RingGeometry(
            ringOrMoons.innerRadius,
            ringOrMoons.outerRadius,
            32
        )
        const RingMat = new THREE.MeshBasicMaterial({
            map: textuerLoader.load(ringOrMoons.texture),
            side: THREE.DoubleSide
        })
        const RingMesh = new THREE.Mesh(ringGeometry, RingMat)
        RingMesh.position.x = ringOrMoons.position
        RingMesh.position.y = -0.5 * Math.PI
        planetObj.add(RingMesh)

    }else if(Number(ringOrMoons)){
        for(let i = 0; i < ringOrMoons; i++){
            // Calculate a random position for the moon
            const moonPositionX = position ;
            const moonPositionY = Math.random() * 20 - 10;
            const moonPositionZ = Math.random() * 20 - 10;


            // add a moon to the planet
            const moonGeometry = new THREE.SphereGeometry(1, 30, 30);
            const moonMaterial = new THREE.MeshBasicMaterial({
                map: textuerLoader.load(moonTexture)
            });
            
            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            // Set the moon's position
            moon.position.set(moonPositionX, moonPositionY, moonPositionZ);

            //add the moon to the planet
            planetObj.add(moon);

        //     // Create a new object to hold the moon and its orbit
        //     const moonObj = new THREE.Object3D();
        //     moonObj.add(moon);

        //    // Set the moon's orbit
        //     moonObj.position.x = position;
        //     moonObj.position.y = i * 5;

        //     // Clamp the moon's orbit to a maximum distance of 10 from the planet
        //     moonObj.position.clampLength(0, 2);

        //     // Add the moon's orbit to the planet
        //     planetObj.add(moonObj);

        //     // Set a random rotation speed for the moon
        //     moonObj.rotation.y = Math.random() * 2 * Math.PI;

        }

    }

    scene.add(planetObj);

    return {planetObj, planet};
}

function animate(){

    //rotate around the sun
    sun.planetObj.rotateY(0.001);
    mercury.planetObj.rotateY(0.010);
    venus.planetObj.rotateY(0.005);
    earth.planetObj.rotateY(0.004);
    mars.planetObj.rotateY(0.0035);
    jupiter.planetObj.rotateY(0.0013);
    saturn.planetObj.rotateY(0.0012);
    uranus.planetObj.rotateY(0.0011);
    neptune.planetObj.rotateY(0.0010);

    // for (let i = 0; i < 10; i++) {
    //     jupiter.planetObj.children[i+1].rotateY(0.001);
    //   }

    //   for(let i = 0; i < 6; i++){
    //     uranus.planetObj.children[i+1].rotateY(0.001)
    //   }

    //   for(let i = 0; i < 6; i++){
    //     neptune.planetObj.children[i+1].rotateY(0.001)
    //   }


    //rotate around the planet's axis
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