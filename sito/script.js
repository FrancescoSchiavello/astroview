import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

// Dimensioni e posizioni iniziali dei pianeti
const planetsData = [
    {
        name: 'sun', 
        texture: 'img/sun.jpg', 
        width: 8, 
        rotationSpeed: 0.00025, 
        orbitSpeed: 0,
        position: { x: 0, y: 0, z: 0 }
    },
    {
        name: 'mercury', 
        texture: 'img/mercury.jpg', 
        width: 1, 
        rotationSpeed: 0.000024, 
        orbitSpeed: 0.000408, 
        position: { x: 16, y: 0, z: 0 }
    },
    {
        name: 'venus', 
        texture: 'img/venus.jpg', 
        width: 2, 
        rotationSpeed: -0.00000148, 
        orbitSpeed: 0.000163, 
        position: { x: 16, y: 0, z: 0 }
    },
    {
        name: 'earth', 
        texture: 'img/earth.jpg', 
        width: 2, 
        rotationSpeed: 0.000694, 
        orbitSpeed: 0.0000995, 
        position: { x: 16, y: 0, z: 0 }
    },
    {
        name: 'mars', 
        texture: 'img/mars.jpg', 
        width: 2, 
        rotationSpeed: 0.000707, 
        orbitSpeed: 0.0000538, 
        position: { x: 16, y: 0, z: 0 }
    },
    {
        name: 'jupiter', 
        texture: 'img/jupiter.jpg', 
        width: 6, 
        rotationSpeed: 0.00241, 
        orbitSpeed: 0.00000823, 
        position: { x: 18, y: 0, z: 0 }
    },
    {
        name: 'saturn', 
        texture: 'img/saturn.jpg', 
        width: 4, 
        rotationSpeed: 0.00226, // 10.7 ore terrestri per una rotazione
        orbitSpeed: 0.00000339, // 10759 giorni terrestri per un'orbita
        position: { x: 20, y: 0, z: 0 }, 
        rotation: THREE.MathUtils.degToRad(26.73),
        rings: 'img/saturn_ring.png'
    },
    {
        name: 'uranus', 
        texture: 'img/uranus.jpg', 
        width: 4, 
        rotationSpeed: -0.00165, // 17.2 ore terrestri per una rotazione
        orbitSpeed: 0.00000119, // 30687 giorni terrestri per un'orbita
        position: { x: 22, y: 0, z: 0 }, 
        rotation: THREE.MathUtils.degToRad(97.77),
        rings: 'img/uranus_ring.png'
    },
    {
        name: 'neptune', 
        texture: 'img/neptune.jpg', 
        width: 4, 
        rotationSpeed: 0.00162, // 16.1 ore terrestri per una rotazione
        orbitSpeed: 0.00000060, // 60190 giorni terrestri per un'orbita
        position: { x: 22, y: 0, z: 0 }, 
        rotation: THREE.MathUtils.degToRad(28.32) ,
        rings: 'img/uranus_ring.png'
    },
    {
        name: 'pluto', 
        texture: 'img/pluto.jpg', 
        width: 2, 
        rotationSpeed: 0.000153, 
        orbitSpeed: 0.00000041, 
        position: { x: 22, y: 0, z: 0 }
    }
];

const moonsData = [
    {
        name: 'moon',
        texture: 'img/moon.jpg',
        width: 0.5,
        rotationSpeed: 0.00027,
        orbitSpeed: 0.00027,
        parent: 'earth',
        position: { x: 5, y: 0, z: 0 }
    }
];

// Inizializzazione caricatore di texture
const textureLoader = new THREE.TextureLoader();

// Variabile per tenere traccia delle texture caricate
let loadedTextures = 0;
const totalTextures = planetsData.length + moonsData.length + 1; // pianeti + lune + background

function onTextureLoad() {
    loadedTextures++;
    if (loadedTextures === totalTextures) {
        document.body.classList.add('loaded');
    }
}

// Crea una scena
const scene = new THREE.Scene();

// Crea una telecamera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.z = 90;

// Crea un renderer e imposta le sue dimensioni
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000);

// Aggiungi i controlli della telecamera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI * 0.7;
controls.minPolarAngle = Math.PI * 0.3;
controls.minDistance = 16;
controls.maxDistance = 600;

// Creazione sfera di background
const geometry = new THREE.SphereGeometry(4000, 64, 64);
const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('img/starmapedit.png', onTextureLoad),
    side: THREE.BackSide
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Aggiungi una luce puntiforme al centro del sole
const sunLight = new THREE.PointLight(0xffffff, 4500, controls.maxDistance);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// Variabile per conservare il valore corrente del moltiplicatore
let currentSpeedMultiplier = 100;

// Aggiungi un event listener al cursore
const speedController = document.querySelector('.speed-control')
speedController.addEventListener('input', (event) => {
    const newSpeedMultiplier = event.target.value;
    updateSpeeds(newSpeedMultiplier);
});

// Funzione per aggiornare le velocità dei pianeti in base al valore del cursore
function updateSpeeds(multiplier) {
    if (multiplier == 0) {
        planets.forEach(planetData => {
            planetData.orbitSpeed = 0;
            planetData.rotationSpeed = 0;
        });
        moons.forEach(moonData => {
            moonData.orbitSpeed = 0;
            moonData.rotationSpeed = 0;
        });
    } else {
        planets.forEach(planetData => {
            planetData.orbitSpeed = planetData.originalOrbitSpeed * multiplier;
            planetData.rotationSpeed = planetData.originalRotationSpeed * multiplier;
        });
        moons.forEach(moonData => {
            moonData.orbitSpeed = moonData.originalOrbitSpeed * multiplier;
            moonData.rotationSpeed = moonData.originalRotationSpeed * multiplier;
        });
    }
    currentSpeedMultiplier = multiplier;
}

// Funzione per aggiornare le dimensioni del renderer e della telecamera
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Aggiungi l'evento di resize
window.addEventListener('resize', onWindowResize, false);

// Array per conservare i pianeti aggiunti correttamente
const planets = [];
const moons = [];

// Funzione per aggiungere e orbitare un pianeta attorno al sole
function addOrbitingPlanet(planetData) {
    const { name, texture, rings, width, position, rotationSpeed, orbitSpeed, rotation } = planetData;

    const planetTexture = textureLoader.load(texture, () => {
        onTextureLoad();
        const planetGeometry = new THREE.SphereGeometry(width, 32, 32);
        const planetMaterial = name === 'sun' ? 
            new THREE.MeshBasicMaterial({ map: planetTexture }) :
            new THREE.MeshStandardMaterial({ map: planetTexture });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);

        // Imposta un raggio di orbita per il pianeta
        const orbitRadius = position.x * planetsData.indexOf(planetData);

        planet.position.set(orbitRadius, position.y, position.z);

        scene.add(planet);

        // Aggiungi un oggetto vuoto per fungere da punto focale
        const pivot = new THREE.Object3D();
        scene.add(pivot);
        pivot.add(planet);

        addOrbit(pivot, orbitRadius);

        // Aggiungi gli anelli se esistono
        if (rings) {
            const ringGeometry = new THREE.RingGeometry(1.8 * width, 3 * width, 64);
            const ringMaterial = new THREE.MeshStandardMaterial({
                map: textureLoader.load(rings, onTextureLoad),
                side: THREE.DoubleSide,
                transparent: true
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);

            ring.position.set(orbitRadius, position.y, position.z);
            ring.rotation.set(rotation + THREE.MathUtils.degToRad(90), THREE.MathUtils.degToRad(30), 0);
            pivot.add(ring);
        }

        // Aggiorna i dati del pianeta con le informazioni necessarie
        planetData.orbitRadius = orbitRadius;
        planetData.pivot = pivot;
        planetData.mesh = planet;
        planetData.orbitSpeed = orbitSpeed * currentSpeedMultiplier;
        planetData.rotationSpeed = rotationSpeed * currentSpeedMultiplier;

        // Aggiungi il pianeta all'array dei pianeti
        planets.push(planetData);
    });
}

function addSatellite(moonData) {
    const { name, texture, width, position, rotationSpeed, orbitSpeed, parent } = moonData;

    const moonTexture = textureLoader.load(texture, () => {
        onTextureLoad();
        const moonGeometry = new THREE.SphereGeometry(width, 32, 32);
        const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);

        // Trova il pianeta genitore
        const parentPlanetData = planets.find(planet => planet.name === parent);

        if (parentPlanetData) {
            // Crea un pivot per la luna che orbita attorno al pianeta genitore
            const moonPivot = new THREE.Object3D();
            parentPlanetData.mesh.add(moonPivot);
            moonPivot.add(moon);

            // Posiziona la luna in relazione al pianeta genitore
            moon.position.set(position.x, position.y, position.z);

            // Aggiungi l'orbita visuale per la luna
            addOrbit(moonPivot, position.x);

            // Aggiorna i dati del satellite
            moonData.pivot = moonPivot;
            moonData.mesh = moon;
            moonData.orbitSpeed = orbitSpeed * currentSpeedMultiplier;
            moonData.rotationSpeed = rotationSpeed * currentSpeedMultiplier;

            // Aggiungi il satellite all'array dei satelliti
            moons.push(moonData);
        }
    });
}

// Aggiungere l'orbita visuale
function addOrbit(parentPivot, orbitRadius) {
    const orbitCurve = new THREE.EllipseCurve(
        0, 0,          
        orbitRadius,   
        orbitRadius,   
        0, 2 * Math.PI,
        false,         
        0              
    );
    
    const points = orbitCurve.getPoints(360); // ottenere i punti della curva
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
    
    const orbitMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.2
     });
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2; // Ruota l'orbita in modo che sia nel piano XZ
    
    parentPivot.add(orbit); // Aggiungi l'orbita al pivot del pianeta genitore
}

// Aggiunge pianeti e lune, salva la velocità originale
planetsData.forEach(planetData => {
    addOrbitingPlanet(planetData);
    planetData.originalOrbitSpeed = planetData.orbitSpeed;
    planetData.originalRotationSpeed = planetData.rotationSpeed;
});

moonsData.forEach(moonData => {
    addSatellite(moonData);
    moonData.originalOrbitSpeed = moonData.orbitSpeed;
    moonData.originalRotationSpeed = moonData.rotationSpeed;
});

// Raycaster per il rilevamento dei clic
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Event listener per il click del mouse
window.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;

        // Trova il pianeta o la luna cliccata
        let target = planets.find(planet => planet.mesh === intersectedObject);
        if (!target) {
            target = moons.find(moon => moon.mesh === intersectedObject);
        }

        if (target) {
            // Posiziona la telecamera sull'oggetto cliccato
            const targetPosition = new THREE.Vector3();
            target.mesh.getWorldPosition(targetPosition);

           const startPosition = {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z
            };
            const endPosition = {
                x: targetPosition.x - 30,
                y: targetPosition.y + 15,
                z: targetPosition.z + 20
            };

            new TWEEN.Tween(startPosition)
                .to(endPosition, 1000)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(() => {
                    camera.position.set(startPosition.x, startPosition.y, startPosition.z);
                    controls.target.copy(targetPosition);
                    controls.update();
                })
                .start();

            planets.forEach(planetData => {
                planetData.orbitSpeed = 0;
                planetData.rotationSpeed = 0;
            });
            moons.forEach(moonData => {
                moonData.orbitSpeed = 0;
                moonData.rotationSpeed = 0;
            });

            speedController.value = 0;

        }
    }
}

// Funzione di animazione per far orbitare i pianeti e i satelliti
function animate() {
    requestAnimationFrame(animate);
    
    planets.forEach(planetData => {
        if (planetData.pivot) {
            planetData.pivot.rotation.y += planetData.orbitSpeed;
        }
        if (planetData.mesh) {
            planetData.mesh.rotation.y += planetData.rotationSpeed;
        }
    });

    moons.forEach(moonData => {
        if (moonData.pivot) {
            moonData.pivot.rotation.y += moonData.orbitSpeed;
        }
        if (moonData.mesh) {
            moonData.mesh.rotation.y += moonData.rotationSpeed;
        }
    });

    TWEEN.update();
    controls.update();
    renderer.render(scene, camera);
}

animate();
