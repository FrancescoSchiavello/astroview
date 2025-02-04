import * as THREE from './vendor/three/build/three.module.js';
import { OrbitControls } from './vendor/three/examples/jsm/controls/OrbitControls.js';

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
                info: "Il Sole è la stella al centro del nostro sistema solare, una sfera incandescente di gas composta principalmente da idrogeno ed elio. La sua immensa gravità tiene legati tutti i pianeti, gli asteroidi e le comete che orbitano attorno ad esso. Le reazioni nucleari al suo interno producono una quantità enorme di energia, che viene irradiata nello spazio sotto forma di luce e calore. Questa energia è fondamentale per la vita sulla Terra.",
                curiosita: "Sapevi che il Sole è così grande che al suo interno potrebbero stare oltre un milione di Terre? E che la sua età è stimata intorno ai 4,6 miliardi di anni? Sulla superficie del Sole appaiono regolarmente delle macchie scure, chiamate macchie solari, che sono zone più fredde e con un intenso campo magnetico. Queste macchie variano in numero seguendo un ciclo di circa undici anni, influenzando l'attività solare e il clima terrestre. Il Sole emette continuamente un flusso di particelle cariche, chiamato vento solare, che interagisce con i campi magnetici dei pianeti e può causare spettacolari aurore boreali e australi sulla Terra. Nonostante la sua importanza per la vita, il Sole ha una durata limitata. Tra miliardi di anni, quando avrà esaurito tutto il suo combustibile nucleare, si espanderà fino a inghiottire i pianeti interni, compresa la Terra."
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
                info: "Mercurio è il pianeta più vicino al Sole e il più piccolo del sistema solare. A causa della sua vicinanza alla stella, subisce enormi escursioni termiche: durante il giorno la temperatura può superare i 400°C, mentre di notte scende a -180°C. La superficie di Mercurio è fortemente craterizzata, simile a quella della Luna, a causa dell'impatto di numerosi asteroidi e comete.",
                curiosita: "Un aspetto curioso di Mercurio è la sua rotazione estremamente lenta rispetto al suo moto di rivoluzione attorno al Sole. Un giorno su Mercurio dura circa 58 giorni terrestri, mentre un anno appena 88 giorni terrestri. Questo significa che un giorno su Mercurio dura quasi quanto un anno! Inoltre, il nucleo di ferro di Mercurio è sorprendentemente grande, costituendo circa il 70% della sua massa totale. Questa caratteristica lo rende un pianeta molto denso e con un campo magnetico relativamente intenso, nonostante le sue piccole dimensioni."
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
                info: "Venere è il secondo pianeta più vicino al Sole e il più caldo del sistema solare, nonostante non sia il più vicino alla nostra stella. Questa anomalia è dovuta alla sua densa atmosfera, composta principalmente da anidride carbonica, che crea un effetto serra così intenso da rendere la temperatura superficiale superiore a quella di Mercurio. La pressione atmosferica su Venere è circa 90 volte quella terrestre, equivalente a quella che si subirebbe a un chilometro di profondità negli oceani terrestri. A causa di queste condizioni estreme, la superficie di Venere è un luogo inospitale, caratterizzato da temperature elevatissime, una pressione schiacciante e piogge di acido solforico. Nonostante ciò, Venere è stato oggetto di numerose missioni spaziali, che hanno permesso di mappare la sua superficie e di studiare la sua geologia.",
                curiosita: "Un aspetto curioso di Venere è la sua rotazione retrograda, ovvero ruota su se stessa in senso opposto rispetto alla maggior parte dei pianeti. Inoltre, la sua rotazione è estremamente lenta, tanto che un giorno venusiano dura più di un anno venusiano. Si ritiene che in passato Venere potesse essere un pianeta più simile alla Terra, con oceani e un'atmosfera più temperata. Tuttavia, un evento catastrofico, forse legato a un intenso vulcanismo, ha provocato un cambiamento climatico radicale, innalzando di moltissimo la temperatura del pianeta."
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
                info: "La Terra è il terzo pianeta del sistema solare e l'unico che, finora, sappiamo ospitare la vita. La sua superficie è in gran parte coperta da oceani, che le conferiscono quel caratteristico colore azzurro visto dallo spazio. L'atmosfera terrestre, composta principalmente da azoto e ossigeno, protegge la vita dalle radiazioni solari e regola il clima. La Terra è un pianeta dinamico, con una crosta terrestre suddivisa in placche tettoniche che si muovono lentamente. Questo movimento delle placche è responsabile dei terremoti, delle eruzioni vulcaniche e della formazione delle montagne. Il campo magnetico terrestre, generato dal movimento del ferro liquido nel nucleo esterno, ci protegge dal vento solare.",
                curiosita: "Un aspetto affascinante della Terra è il ciclo dell'acqua, un processo continuo di evaporazione, condensazione e precipitazione che modella il nostro pianeta e rende possibile la vita. L'acqua è presente in tutte le sue forme: liquida negli oceani, nei laghi e nei fiumi, solida nei ghiacciai e allo stato gassoso nell'atmosfera. La Luna, il nostro unico satellite naturale, esercita una significativa influenza sulle maree terrestri e sulla durata del giorno. Si ritiene che la Luna si sia formata in seguito a una collisione tra la Terra e un corpo celeste delle dimensioni di Marte, miliardi di anni fa. La Terra è un pianeta estremamente complesso e ancora in gran parte da scoprire. Gli scienziati continuano a studiare i suoi oceani, l'atmosfera, il clima e la geologia, cercando di comprendere meglio i processi che lo governano e le sue origini."
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
                info: "Marte, il quarto pianeta del sistema solare, spesso soprannominato il \"Pianeta Rosso\" per la sua caratteristica colorazione dovuta all'ossido di ferro presente nel suolo. Marte è un pianeta roccioso, più piccolo della Terra, con un'atmosfera sottile composta principalmente da anidride carbonica. La sua superficie presenta caratteristiche geologiche molto varie, tra cui vulcani estinti, canyon immensi e calotte polari. Il Monte Olimpo, il vulcano più grande del sistema solare, si trova proprio su Marte. A causa delle sue condizioni ambientali simili, in parte, a quelle terrestri, Marte è stato a lungo oggetto di speculazioni sulla possibile esistenza di forme di vita. Numerose missioni spaziali hanno esplorato il pianeta rosso, alla ricerca di tracce di acqua, un elemento fondamentale per la vita come la conosciamo. Le sonde hanno scoperto la presenza di ghiaccio d'acqua nelle calotte polari e sotto la superficie, aumentando le speranze di trovare un giorno tracce di vita passata o presente.",
                curiosita: "Le due lune di Marte, Phobos e Deimos, sono piccoli corpi celesti di forma irregolare, probabilmente degli asteroidi catturati dalla gravità marziana. Le tempeste di sabbia sono un fenomeno comune su Marte, a volte così intense da avvolgere l'intero pianeta per settimane. Marte è un pianeta che ha affascinato l'umanità per secoli. È stato oggetto di innumerevoli opere di fantascienza e rappresenta una delle mete più ambite per l'esplorazione spaziale. Diverse agenzie spaziali, tra cui la NASA e SpaceX, stanno lavorando a missioni con equipaggio umano su Marte, con l'obiettivo di portare i primi astronauti sul Pianeta Rosso entro i prossimi decenni."
              }
    },
    {
        name: 'jupiter', 
        texture: 'img/jupiter.jpg', 
        width: 6, 
        rotationSpeed: 0.00141, 
        orbitSpeed: 0.00000823, 
        position: { x: 18, y: 0, z: 0 },
        data: {
                nome: "Giove",
                foto: "img_info/jupiter.jpg",
                distanza: "778.5 milioni di km dal Sole",
                diametro: "139,820 km",
                massa: "1.898 x 10^27 kg",
                info: "Giove è il quinto pianeta in ordine di distanza dal Sole ed è di gran lunga il più grande del sistema solare. La sua massa è più del doppio di quella di tutti gli altri pianeti messi insieme, e la sua gravità è talmente intensa da influenzare le orbite dei pianeti più esterni. Giove è un gigante gassoso, composto principalmente da idrogeno ed elio, e non possiede una superficie solida. La sua atmosfera è caratterizzata da bande colorate e dalla famosa Grande Macchia Rossa, una tempesta anticiclonica più grande della Terra che imperversa da secoli. Il sistema di lune di Giove è uno dei più complessi del sistema solare. Tra le lune più importanti troviamo Io, Europa, Ganimede e Callisto, ognuna con caratteristiche uniche. Io è la luna vulcanicamente più attiva del sistema solare, mentre Europa è sospettata di avere un oceano liquido sotto la sua crosta ghiacciata, rendendola uno dei candidati più promettenti per la ricerca di vita extraterrestre.",
                curiosita: "La magnetosfera di Giove è la più grande del sistema solare e intrappola particelle cariche provenienti dal Sole, creando intense aurore polari. Giove ha svolto un ruolo fondamentale nella formazione del sistema solare, agendo come una sorta di \"aspirapolvere cosmico\" che ha catturato gran parte del materiale presente nel disco protoplanetario."
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
                info: "Saturno è probabilmente il pianeta più riconoscibile del nostro sistema solare, grazie ai suoi spettacolari anelli composti da miliardi di particelle di ghiaccio e roccia. Questi anelli si estendono per migliaia di chilometri e sono visibili anche da telescopi amatoriali. Come Giove, Saturno è un gigante gassoso, composto principalmente da idrogeno ed elio. La sua atmosfera è caratterizzata da bande colorate e da tempeste, sebbene non intense come la Grande Macchia Rossa di Giove. La densità di Saturno è così bassa che, se posto in un oceano abbastanza grande, galleggerebbe!",
                curiosita: "Il sistema di lune di Saturno è molto vasto e comprende decine di satelliti naturali, tra cui Titano, la seconda luna più grande del sistema solare. Titano è l'unico satellite ad avere un'atmosfera densa, composta principalmente da azoto e metano, e presenta caratteristiche geologiche simili alla Terra primordiale. Un altro satellite interessante di Saturno è Encelado, una piccola luna ghiacciata che presenta geyser che eruttano acqua e particelle di ghiaccio nello spazio. Si ritiene che sotto la crosta ghiacciata di Encelado possa esistere un oceano liquido, rendendolo un altro potenziale candidato per la ricerca di vita extraterrestre."
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
                info: "Urano è un pianeta davvero unico nel nostro sistema solare. A differenza degli altri giganti gassosi, Giove e Saturno, Urano è classificato come un \"gigante ghiacciato\", insieme a Nettuno. Ciò significa che, nonostante sia composto principalmente da gas, contiene anche una grande quantità di ghiaccio d'acqua, metano e ammoniaca, che gli conferiscono un colore azzurro caratteristico. Una delle caratteristiche più singolari di Urano è la sua rotazione: è infatti inclinato su un fianco, con un angolo di circa 98 gradi rispetto al piano dell'orbita. Questo significa che Urano ruota \"rotolando\" attorno al Sole, un po' come una palla da bowling. Si pensa che questa insolita inclinazione sia dovuta a una collisione con un oggetto di grandi dimensioni avvenuta miliardi di anni fa.",
                curiosita: "Anche Urano possiede un sistema di anelli, sebbene siano molto meno spettacolari di quelli di Saturno. Inoltre, ha numerose lune, alcune delle quali presentano caratteristiche geologiche molto interessanti. L'atmosfera di Urano è estremamente fredda e ventosa, con tempeste che raggiungono velocità incredibili. La sua composizione chimica, ricca di metano, contribuisce al suo colore azzurro. A causa della sua grande distanza dal Sole, Urano è un pianeta molto freddo e poco studiato. Tuttavia, le missioni spaziali hanno fornito importanti informazioni sulla sua composizione e sulla sua storia."
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
                info: "Nettuno, insieme a Urano, fa parte della categoria dei \"giganti ghiacciati\". Nonostante il nome, la sua composizione è principalmente costituita da gas, ma contiene anche una grande quantità di ghiaccio d'acqua, metano e ammoniaca, che gli conferiscono il caratteristico colore blu intenso. Nettuno è un pianeta estremamente ventoso, con tempeste che raggiungono velocità superiori a quelle dei venti terrestri. La sua famosa Grande Macchia Scura, una tempesta anticiclonica simile alla Grande Macchia Rossa di Giove, è stata osservata dal Voyager 2 nel 1989, ma è scomparsa in immagini successive. Gli scienziati ritengono che queste tempeste siano comuni su Nettuno, ma che abbiano una durata relativamente breve.",
                curiosita: "L'orbita di Nettuno è molto ellittica e inclinata rispetto al piano dell'eclittica, il che lo rende il pianeta con l'orbita più eccentrica tra i giganti gassosi. Inoltre, Nettuno ha un sistema di anelli, sebbene siano molto più sottili e meno visibili rispetto a quelli di Saturno. Nettuno possiede numerose lune, tra cui Tritone, la più grande e la più interessante. Tritone ha un'orbita retrograda, il che suggerisce che in passato potrebbe essere stato un oggetto catturato dalla gravità di Nettuno. La sua superficie è caratterizzata da geyser che eruttano azoto liquido, creando un'atmosfera sottile. A causa della sua grande distanza dal Sole, Nettuno è un pianeta molto freddo e oscuro. Nonostante ciò, le missioni spaziali hanno fornito importanti informazioni sulla sua composizione, sulla sua atmosfera e sul suo sistema di lune."
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
                info: "Plutone, scoperto nel 1930, è stato a lungo considerato il nono pianeta del Sistema Solare. Tuttavia, nel 2006, l'Unione Astronomica Internazionale ha riclassificato Plutone come \"pianeta nano\", una nuova categoria di oggetti celesti che orbitano attorno al Sole ma non soddisfano tutti i criteri per essere considerati pianeti. Plutone si trova nella Fascia di Kuiper, una regione del Sistema Solare oltre l'orbita di Nettuno, popolata da numerosi corpi celesti ghiacciati. La sua orbita è molto eccentrica e inclinata rispetto al piano dell'eclittica, il che significa che a volte si avvicina più al Sole di Nettuno. Plutone è un mondo piccolo e ghiacciato, con una superficie variegata che presenta montagne, pianure e crateri. La sua atmosfera è molto tenue e composta principalmente da azoto, metano e monossido di carbonio.",
                curiosita: "Una delle caratteristiche più interessanti di Plutone è il suo grande satellite, Caronte. Caronte è così grande rispetto a Plutone che i due corpi celesti sono spesso considerati un sistema binario. La missione della sonda New Horizons della NASA, che ha sorvolato Plutone nel 2015, ha rivoluzionato la nostra comprensione di questo mondo lontano. Le immagini inviate dalla sonda hanno rivelato un pianeta nano geologicamente attivo, con montagne ghiacciate, pianure lisce e una vasta regione ghiacciata a forma di cuore."
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
                foto: "",
                distanza: "",
                diametro: "",
                massa: "",
                info: "",
                curiosita: ""
              }
    },
    {
        name: 'phobos',
        texture: 'img/moon.jpg',
        width: 0.5,
        rotationSpeed: 0.00027,
        orbitSpeed: 0.0004,
        parent: 'mars',
        position: { x: 5, y: 0, z: 0 },
        data: {
                nome: "Fobos",
                foto: "",
                distanza: "",
                diametro: "",
                massa: "",
                info: "",
                curiosita: ""
              }
    },
    {
        name: 'deimos',
        texture: 'img/deimos.jpg',
        width: 0.5,
        rotationSpeed: 0.00027,
        orbitSpeed: 0.00027,
        parent: 'mars',
        position: { x: 8, y: 0, z: 0 },
        data: {
                nome: "Deimos",
                foto: "",
                distanza: "",
                diametro: "",
                massa: "",
                info: "",
                curiosita: ""
              }
    },
    {
        name: 'io',
        texture: 'img/io.jpg',
        width: 0.5,
        rotationSpeed: 0.00027,
        orbitSpeed: 0.0002,
        parent: 'jupiter',
        position: { x: 10, y: 0, z: 0 },
        data: {
                nome: "Io",
                foto: "",
                distanza: "",
                diametro: "",
                massa: "",
                info: "",
                curiosita: ""
              }
    },
    {
        name: 'europa',
        texture: 'img/europa.jpg',
        width: 0.5,
        rotationSpeed: 0.00027,
        orbitSpeed: 0.00015,
        parent: 'jupiter',
        position: { x: 12, y: 0, z: 0 },
        data: {
                nome: "Europa",
                foto: "",
                distanza: "",
                diametro: "",
                massa: "",
                info: "",
                curiosita: ""
              }
    },
    {
        name: 'ganymede',
        texture: 'img/ganimede.jpg',
        width: 0.5,
        rotationSpeed: 0.00027,
        orbitSpeed: 0.000010,
        parent: 'jupiter',
        position: { x: 14, y: 0, z: 0 },
        data: {
                nome: "Ganimede",
                foto: "",
                distanza: "",
                diametro: "",
                massa: "",
                info: "",
                curiosita: ""
              }
    },
    {
        name: 'callisto',
        texture: 'img/callisto.jpg',
        width: 0.5,
        rotationSpeed: 0.00027,
        orbitSpeed: 0.00005,
        parent: 'jupiter',
        position: { x: 16, y: 0, z: 0 },
        data: {
                nome: "Callisto",
                foto: "",
                distanza: "",
                diametro: "",
                massa: "",
                info: "",
                curiosita: ""
              }
    },
    {
        name: 'titan',
        texture: 'img/titan.jpg',
        width: 0.5,
        rotationSpeed: 0.00027,
        orbitSpeed: 0.0001,
        parent: 'saturn',
        position: { x: 15, y: 0, z: 0 },
        data: {
                nome: "Titano",
                foto: "",
                distanza: "",
                diametro: "",
                massa: "",
                info: "",
                curiosita: ""
              }
    },
    {
        name: 'charon',
        texture: 'img/titan.jpg',
        width: 0.8,
        rotationSpeed: 0.00027,
        orbitSpeed: 0.00022,
        parent: 'pluto',
        position: { x: 5, y: 0, z: 0 },
        data: {
                nome: "Caronte",
                foto: "",
                distanza: "",
                diametro: "",
                massa: "",
                info: "",
                curiosita: ""
              }
    },
    
];

const textureLoader = new THREE.TextureLoader();

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
    map: textureLoader.load('img/starmapedit.png'),
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
                map: textureLoader.load(rings),
                side: THREE.DoubleSide,
                transparent: true
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);

            ring.position.set(orbitRadius, position.y, position.z);
            ring.rotation.set( THREE.MathUtils.degToRad(90), THREE.MathUtils.degToRad(15), 0);
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

        /*if (!target) {
            target = moons.find(moon => moon.mesh === intersectedObject);
        }*/

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
 /*        if (!target) {
            target = moons.find(moon => moon.mesh === intersectedObject);
        }
 */
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
                x: targetPosition.x - 10,
                y: targetPosition.y + 30,
                z: targetPosition.z + 10
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

const bottoneChiusura = document.querySelector('.main-content .bottone-chiudi');
bottoneChiusura.addEventListener('click', () => {
    mainContent.style.display = 'none';
    isMainContentVisible = false;
    help.style.display = 'flex';
    schermataInizialeQuiz.classList.add('active');
    schermataQuiz.classList.remove('active');
    schermataRiepilogoQuiz.classList.remove('active');
    points = 0;
    quizPoints.innerHTML = 'Punti: 0';
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
            bottoneProfilo.style.display = 'flex';
            bottoneRegistrati.style.display = 'none';
            bottoneAccedi.style.display = 'none';
            fetch('/user-info')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Errore' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    document.querySelector('.sezione-profilo .titolo').textContent = data.nome_utente;
                    document.querySelector('.punti-max-dati').textContent = data.punti_max;
                    document.querySelector('.punti-max-dati-quiz').textContent = 'Punteggio più alto: ' + data.punti_max;

                    let loggedInUserId;

                    // Ottieni l'ID dell'utente loggato
                    fetch('/current-user')
                        .then(response => response.json())
                        .then(data => {
                            loggedInUserId = data.userId;
                            return fetch('/classifica');
                        })
                        .then(response => response.json())
                        .then(data => {
                            const sezioneClassifica = document.querySelector('.sezione-classifica-container');
                
                            // Rimuovi tutti i div con classe 'classificato' se esistono
                            const classificatiEsistenti = sezioneClassifica.querySelectorAll('.classificato');
                           classificatiEsistenti.forEach(classificato => classificato.remove());
                
                            // Aggiungi i nuovi risultati
                            data.forEach((item, index) => {
                                const classificatoDiv = document.createElement('div');
                                classificatoDiv.classList.add('classificato');
                
                                if (item.id_utente === loggedInUserId) {
                                    classificatoDiv.classList.add('active-user');
                                    const posizioneClassificaProfile = document.querySelector('.posizione-classifica-dati');
                                    posizioneClassificaProfile.textContent = index + 1;
                                }
                
                                const posizioneClassifica = document.createElement('div');
                                posizioneClassifica.classList.add('posizione-classifica');
                                posizioneClassifica.textContent = index + 1;
                
                                const nomeClassifica = document.createElement('div');
                                nomeClassifica.classList.add('nome-classifica');
                                nomeClassifica.textContent = item.nome_utente;
                
                                const puntiClassifica = document.createElement('div');
                                puntiClassifica.classList.add('punti-classifica');
                                puntiClassifica.textContent = item.punti_max;
                
                                classificatoDiv.appendChild(posizioneClassifica);
                                classificatoDiv.appendChild(nomeClassifica);
                                classificatoDiv.appendChild(puntiClassifica);
                
                                sezioneClassifica.appendChild(classificatoDiv);
                            });
                        })
                        .catch(error => console.error('Error fetching data:', error));

                })
                .catch(error => {
                    console.error('Errore nel recupero dei dati', error);
                });
        } else {
            bottoneProfilo.style.display = 'none';
            bottoneRegistrati.style.display = 'flex';
            bottoneAccedi.style.display = 'flex';
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

//Logout
document.querySelector('.logout').addEventListener('click', () => {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        window.location.href = '/index.html';
    })
    .catch(error => {
        console.error('Errore durante l\'operazione di logout:', error);
    });
});

//Quiz
const schermataInizialeQuiz = document.querySelector('.schermata-iniziale-quiz');
const schermataQuiz = document.querySelector('.schermata-quiz');
const schermataRiepilogoQuiz = document.querySelector('.schermata-riepilogo-quiz');

const bottoneInizioQuiz = document.querySelector('.schermata-iniziale-quiz .bottone');
bottoneInizioQuiz.addEventListener('click', () => {
    schermataInizialeQuiz.classList.remove('active');
    schermataQuiz.classList.add('active');
    loadRandomQuestion();
});

const quizPoints = document.querySelector('.schermata-quiz .punti');
let points = 0;
quizPoints.innerHTML = 'Punti: ' + points;
let isAnswerSelected = false;

async function loadRandomQuestion() {
    try {
        const response = await fetch('/random-question');
        const data = await response.json();

        if (response.status !== 200) {
            console.error('Errore durante il recupero della domanda:', data.error);
            return;
        }

        const question = data.domanda;
        const answers = data.risposte;

        const titleElement = document.querySelector('.schermata-quiz .titolo');
        titleElement.textContent = question.testo_domanda;

        const answersContainer = document.querySelector('.schermata-quiz .risposte');
        answersContainer.innerHTML = '';

        answers.forEach(answer => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'risposta';
            answerDiv.textContent = answer.testo_risposta;
            answerDiv.dataset.isCorrect = answer.is_correct;
            answerDiv.addEventListener('click', () => {

                if (!isAnswerSelected) {
                    handleAnswerClick(answerDiv);
                }

            });
            answersContainer.appendChild(answerDiv);
            isAnswerSelected = false;
        });
    } catch (error) {
        console.error('Errore:', error);
    }
}

function handleAnswerClick(answerDiv) {
    isAnswerSelected = true;
    const isCorrect = answerDiv.dataset.isCorrect === '1';

    if (isCorrect) {
        answerDiv.style.backgroundColor = 'rgba(0, 128, 0, 0.3)';
        points++;
        quizPoints.innerHTML = 'Punti: ' + points;

        // Carica una nuova domanda dopo un breve ritardo
        setTimeout(loadRandomQuestion, 500);
    } else {
        answerDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';

        // Rimuovere la classe active dalla schermata del quiz e mostrare la schermata di riepilogo
        setTimeout(() => {
            schermataQuiz.classList.remove('active');
            schermataRiepilogoQuiz.classList.add('active');

            // Aggiorna il punteggio nella schermata di riepilogo
            const riepilogoPunti = document.querySelector('.schermata-riepilogo-quiz .punti');
            riepilogoPunti.innerHTML = 'Punteggio finale: ' + points;

            updateScore()
        }, 500);
    }
};

const bottoneFineQuiz = document.querySelector('.schermata-riepilogo-quiz .bottone');
bottoneFineQuiz.addEventListener('click', () => {
    schermataInizialeQuiz.classList.add('active');
    schermataRiepilogoQuiz.classList.remove('active');

    points = 0;
    quizPoints.innerHTML = 'Punti: 0';
});


//Aggiornare punteggio
async function updateScore() {
    try {
        const response = await fetch('/update-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ punti: points })
        });
        checkAuth();
    } catch (error) {
        console.error('Errore nella richiesta di aggiornamento del punteggio:', error);
    }
}