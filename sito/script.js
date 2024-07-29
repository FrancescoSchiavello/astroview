import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

const planetsData = [
    {
        name: 'sun', 
        texture: 'img/sun.jpg', 
        width: 8, 
        rotationSpeed: 0.00025, 
        orbitSpeed: 0,
        position: { x: 0, y: 0, z: 0 },
        data: {
                nome: "Sole",
                foto: "img_info/sun.jpg",
                distanza: "--",
                diametro: "1,392,700 km",
                massa: "1.989 x 10^30 kg",
                info: "Il Sole è la stella al centro del nostro sistema solare. È una sfera quasi perfetta di plasma incandescente.",
                curiosita: "Il Sole contiene il 99.86% della massa totale del sistema solare."
              }
    },
    {
        name: 'mercury', 
        texture: 'img/mercury.jpg', 
        width: 1, 
        rotationSpeed: 0.000024, 
        orbitSpeed: 0.000408, 
        position: { x: 16, y: 0, z: 0 },
        data: {
                nome: "Mercurio",
                foto: "img_info/mercury.jpg",
                distanza: "57.91 milioni di km dal Sole",
                diametro: "4,880 km",
                massa: "3.285 x 10^23 kg",
                info: "Mercurio è il pianeta più vicino al Sole e il più piccolo del sistema solare.",
                curiosita: "Mercurio ha il giorno più lungo di qualsiasi altro pianeta del sistema solare, con un giorno che dura circa 176 giorni terrestri."
              }
    },
    {
        name: 'venus', 
        texture: 'img/venus.jpg', 
        width: 2, 
        rotationSpeed: -0.00000148, 
        orbitSpeed: 0.000163, 
        position: { x: 16, y: 0, z: 0 },
        data: {
                nome: "Venere",
                foto: "img_info/venus.jpg",
                distanza: "108.2 milioni di km dal Sole",
                diametro: "12,104 km",
                massa: "4.867 x 10^24 kg",
                info: "Venere è il secondo pianeta dal Sole ed è simile alla Terra per dimensioni e composizione.",
                curiosita: "Venere ruota all'indietro rispetto alla maggior parte degli altri pianeti del sistema solare."
              }
    },
    {
        name: 'earth', 
        texture: 'img/earth.jpg', 
        width: 2, 
        rotationSpeed: 0.000694, 
        orbitSpeed: 0.0000995, 
        position: { x: 16, y: 0, z: 0 },
        data: {
                nome: "Terra",
                foto: "img_info/earth.jpg",
                distanza: "149.6 milioni di km dal Sole",
                diametro: "12,742 km",
                massa: "5.972 x 10^24 kg",
                info: "La Terra è il terzo pianeta dal Sole e l'unico conosciuto per ospitare la vita.",
                curiosita: "Circa il 71% della superficie terrestre è coperta da acqua."
              }
    },
    {
        name: 'mars', 
        texture: 'img/mars.jpg', 
        width: 2, 
        rotationSpeed: 0.000707, 
        orbitSpeed: 0.0000538, 
        position: { x: 16, y: 0, z: 0 },
        data: {
                nome: "Marte",
                foto: "img_info/mars.jpg",
                distanza: "227.9 milioni di km dal Sole",
                diametro: "6,779 km",
                massa: "6.39 x 10^23 kg",
                info: "Marte è il quarto pianeta dal Sole e è noto come il pianeta rosso per il suo colore caratteristico.",
                curiosita: "Marte ha la montagna più alta del sistema solare, il Monte Olimpo, alto circa 22 km."
              }
    },
    {
        name: 'jupiter', 
        texture: 'img/jupiter.jpg', 
        width: 6, 
        rotationSpeed: 0.00241, 
        orbitSpeed: 0.00000823, 
        position: { x: 18, y: 0, z: 0 },
        data: {
                nome: "Giove",
                foto: "img_info/jupiter.jpg",
                distanza: "778.5 milioni di km dal Sole",
                diametro: "139,820 km",
                massa: "1.898 x 10^27 kg",
                info: "Giove è il pianeta più grande del sistema solare e il quinto dal Sole.",
                curiosita: "Giove ha almeno 79 lune, inclusa Ganimede, la più grande luna del sistema solare."
              }
    },
    {
        name: 'saturn', 
        texture: 'img/saturn.jpg', 
        width: 4, 
        rotationSpeed: 0.00226,
        orbitSpeed: 0.00000339,
        position: { x: 20, y: 0, z: 0 }, 
        rotation: THREE.MathUtils.degToRad(26.73),
        rings: 'img/saturn_ring.png',
        data: {
                nome: "Saturno",
                foto: "img_info/saturn.jpg",
                distanza: "1.434 miliardi di km dal Sole",
                diametro: "116,460 km",
                massa: "5.683 x 10^26 kg",
                info: "Saturno è il sesto pianeta dal Sole e il secondo più grande del sistema solare.",
                curiosita: "Saturno è noto per i suoi anelli estesi e complessi fatti principalmente di ghiaccio e polvere."
              }
    },
    {
        name: 'uranus', 
        texture: 'img/uranus.jpg', 
        width: 4, 
        rotationSpeed: -0.00165,
        orbitSpeed: 0.00000119,
        position: { x: 22, y: 0, z: 0 }, 
        rotation: THREE.MathUtils.degToRad(97.77),
        rings: 'img/uranus_ring.png',
        data: {
                nome: "Urano",
                foto: "img_info/uranus.jpg",
                distanza: "2.871 miliardi di km dal Sole",
                diametro: "50,724 km",
                massa: "8.681 x 10^25 kg",
                info: "Urano è il settimo pianeta dal Sole ed è noto per la sua inclinazione assiale estrema.",
                curiosita: "Urano ruota su un fianco, con un'inclinazione assiale di 97.77 gradi rispetto al piano della sua orbita."
              }
    },
    {
        name: 'neptune', 
        texture: 'img/neptune.jpg', 
        width: 4, 
        rotationSpeed: 0.00162,
        orbitSpeed: 0.00000060,
        position: { x: 22, y: 0, z: 0 }, 
        rotation: THREE.MathUtils.degToRad(28.32) ,
        rings: 'img/uranus_ring.png',
        data: {
                nome: "Nettuno",
                foto: "img_info/neptune.jpg",
                distanza: "4.495 miliardi di km dal Sole",
                diametro: "49,244 km",
                massa: "1.024 x 10^26 kg",
                info: "Nettuno è l'ottavo pianeta dal Sole ed è noto per i suoi venti estremamente forti.",
                curiosita: "Nettuno è l'unico pianeta del sistema solare non visibile ad occhio nudo."
              }
    },
    {
        name: 'pluto', 
        texture: 'img/pluto.jpg', 
        width: 2, 
        rotationSpeed: 0.000153, 
        orbitSpeed: 0.00000041, 
        position: { x: 22, y: 0, z: 0 },
        data: {
                nome: "Plutone",
                foto: "img_info/pluto.jpg",
                distanza: "5.906 miliardi di km dal Sole",
                diametro: "2,377 km",
                massa: "1.309 x 10^22 kg",
                info: "Plutone è un pianeta nano nel sistema solare, un tempo considerato il nono pianeta.",
                curiosita: "Plutone ha cinque lune conosciute, la più grande delle quali è Caronte."
              }
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
        position: { x: 5, y: 0, z: 0 },
        data: {
                nome: "Luna",
                foto: "img_info/moon.jpg",
                distanza: "384,400 km dalla Terra",
                diametro: "123",
                massa: "7.342 x 10^22 kg",
                info: "La Luna è l'unico satellite naturale della Terra ed è il quinto satellite naturale più grande del sistema solare.",
                curiosita: "La Luna ha un'influenza significativa sulle maree terrestri a causa della sua forza gravitazionale."
              }
    }
];


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
controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
};

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

//Variabile di stato main content
let isMainContentVisible = false;

// Variabili per tenere traccia dello stato del mouse
let isMouseDown = false;
let mouseMoved = false;

// Event listener per il mousedown
window.addEventListener('mousedown', (event) => {
    if (event.button === 0) { // Assicurati che sia il tasto sinistro del mouse
        isMouseDown = true;
        mouseMoved = false;
    }
});

// Event listener per il mousemove
window.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        mouseMoved = true;
    }

    // Aggiungi controllo per il cursore
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;

        // Trova il pianeta o la luna sotto il cursore
        let target = planets.find(planet => planet.mesh === intersectedObject);
        if (!target) {
            target = moons.find(moon => moon.mesh === intersectedObject);
        }

        if (target) {
            // Cambia il cursore in pointer
            document.body.style.cursor = 'pointer';
        } else {
            // Ripristina il cursore
            document.body.style.cursor = 'default';
        }
    } else {
        // Ripristina il cursore se non ci sono intersezioni
        document.body.style.cursor = 'default';
    }
});

// Modifica il listener per il mouseup per chiamare onMouseClick solo se il mouse non è stato mosso
window.addEventListener('mouseup', (event) => {
    if (event.button === 0) { // Assicurati che sia il tasto sinistro del mouse
        isMouseDown = false;
        if (!mouseMoved) {
            onMouseClick(event);
        }
    }
});

var infoPianeta = document.querySelector(".info-pianeta");

function onMouseClick(event) {

    if (isMainContentVisible || help.classList.contains('expanded')) {
        return;
    }

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
     
            document.querySelector(".info-pianeta .nome").textContent = target.data.nome;
            document.querySelector(".info-pianeta .distanza").textContent = `Distanza: ${target.data.distanza}`;
            document.querySelector(".info-pianeta .diametro").textContent = `Diametro: ${target.data.diametro}`;
            document.querySelector(".info-pianeta .massa").textContent = `Massa: ${target.data.massa}`;
            document.querySelector(".info-pianeta .img-pianeta").style.backgroundImage = `url(${target.data.foto})`;
            document.querySelector(".info-pianeta .contenuto-info").textContent = target.data.info;
            document.querySelector(".info-pianeta .contenuto-curiosita").textContent = target.data.curiosita;

            infoPianeta.classList.add("expanded");
        }
    }
}

const bottoneChiudi = document.querySelector(".bottone-chiudi");
bottoneChiudi.addEventListener("click",(event) => {
    event.stopPropagation();
    infoPianeta.classList.remove("expanded");
});

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


//Bottoni login e registrazione
const mainContent = document.querySelector('.main-content');
const bottoneAccedi = document.querySelector('.accedi');
const bottoneRegistrati = document.querySelector('.registrati');
const bottoneProfilo = document.querySelector('.bottone-profilo');

const formLogin = document.querySelector('.login');
const formRegistrazione = document.querySelector('.registrazione');

bottoneAccedi.addEventListener('click', () => {
    mainContent.style.display = 'flex';
    formLogin.style.display = 'flex';
    formRegistrazione.style.display = 'none';
    isMainContentVisible = true;
    infoPianeta.classList.remove("expanded");
    help.classList.remove("expanded");
    help.style.display = 'none';
    arrow.src = 'img/arrow_white.png';
});

bottoneRegistrati.addEventListener('click', () => {
    mainContent.style.display = 'flex';
    formRegistrazione.style.display = 'flex';
    formLogin.style.display = 'none';
    isMainContentVisible = true;
    infoPianeta.classList.remove("expanded");
    help.classList.remove("expanded");
    help.style.display = 'none';
    arrow.src = 'img/arrow_white.png';
});

const bottoniChiusura = document.querySelectorAll('.main-content .bottone-chiudi');
bottoniChiusura.forEach((b) => {
    b.addEventListener('click', () => {
        mainContent.style.display = 'none';
        isMainContentVisible = false;
        help.style.display = 'flex';
    });
});

//Link form
const linkForm = document.querySelectorAll('.main-content .link-form');
linkForm.forEach((l) => {
    l.addEventListener('click', () => {
        if (formRegistrazione.style.display == 'flex') {
            formRegistrazione.style.display = 'none'; 
            formLogin.style.display = 'flex';    
        } else {
            formRegistrazione.style.display = 'flex'; 
            formLogin.style.display = 'none';    
        }
        
    });
});

//Bottone help
const help = document.querySelector('.help');
const arrow = document.querySelector('.arrow-img');
document.querySelector('.close-arrow').addEventListener('click', function(event) {
    event.stopPropagation();

    if (isMainContentVisible) {
        return
    }
    
    help.classList.toggle('expanded');
    infoPianeta.classList.remove('expanded');

    if (help.classList.contains('expanded')) {
        arrow.src = 'img/arrow_black.png';
    } else {
        arrow.src = 'img/arrow_white.png';
    }
});

//Sezione help che appare per tre secondi
document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        help.classList.add('expanded');
        arrow.src = 'img/arrow_black.png';
    }, 500);


    setTimeout(() => {
        help.classList.remove('expanded');
        arrow.src = 'img/arrow_white.png';
    }, 5000);
});

//Funzione per mostrare la sezione desiderata
function showSection(sezione) {
    const sezioni = document.querySelectorAll('.contenuto-scheda > div');
    sezioni.forEach((el) => {
        el.classList.remove('active');
    });
    document.querySelector('.sezione-' + sezione).classList.add('active');

    const schede = document.querySelectorAll('.schede > div');
    schede.forEach((el) => {
        el.classList.remove('active');
    });
    document.querySelector('.' + sezione).classList.add('active');
}

//Click sulla sezione
document.querySelectorAll('.schede div').forEach((el) => {
    el.addEventListener('click', (event) => {
        event.stopPropagation();
        showSection(el.classList[0]);
    });
});

//Login
document.querySelector('.form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    var data = {};
    formData.forEach(function(value, key) {
        data[key] = value;
    });

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        if (response.status === 200) {
            onSuccessfullFormSubmit();
        } else if (response.status === 401) {
            throw new Error('E-mail o password errata.');
        } else {
            throw new Error('Errore durante la richiesta.');
        }
    })
    .catch(function(error) {
        document.querySelector('.login .error').textContent = error.message;
    });
});


//Registrazione
document.querySelector('.form-registrazione').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    var data = {};
    formData.forEach(function(value, key) {
        data[key] = value;
    });

    fetch('/registrazione', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        switch(response.status) {
            case 200: onSuccessfullFormSubmit();
            break;
            case 400: throw new Error('Questa e-mail è già in uso');
            break;
            case 401:  throw new Error('Questo nome utente è già in uso');
            break;
            default: throw new Error('Errore durante la richiesta.');
        }
    })
    .catch(function(error) {
        document.querySelector('.registrazione .error').textContent = error.message;
    });
});

//Funzione avvenuta registrazione/login
const containerSezioni = document.querySelector('.container-sezioni');

function onSuccessfullFormSubmit() {
    formLogin.style.display = 'none';
    formRegistrazione.style.display = 'none';
    containerSezioni.style.display = 'flex';
    checkAuth();
};


//Check sessione utente
async function checkAuth() {
    try {
        const response = await fetch('/check-auth');
        const result = await response.json();

        if (result.authenticated) {
            bottoneAccedi.classList.add('hidden');
            bottoneRegistrati.classList.add('hidden');
            bottoneProfilo.classList.remove('hidden');
        } else {
            bottoneAccedi.classList.remove('hidden');
            bottoneRegistrati.classList.remove('hidden');
            bottoneProfilo.classList.add('hidden');
        }
    } catch (error) {
        console.error('Errore durante il controllo dell\'autenticazione:', error);
    }
}

checkAuth();

//Bottone profilo
document.querySelector('.bottone-profilo').addEventListener('click', () => {
    containerSezioni.style.display = 'flex';
    mainContent.style.display = 'flex';
    isMainContentVisible = true;
    infoPianeta.classList.remove("expanded");
    help.classList.remove("expanded");
    help.style.display = 'none';
    arrow.src = 'img/arrow_white.png';
});