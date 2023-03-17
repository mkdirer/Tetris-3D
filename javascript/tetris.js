const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 1000;

const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const boundingBoxMesh = new THREE.Mesh(
    new THREE.BoxGeometry(
        BOUNDING_BOX.width, 
        BOUNDING_BOX.height, 
        BOUNDING_BOX.depth,
        BOUNDING_BOX.splitX, 
        BOUNDING_BOX.splitY, 
        BOUNDING_BOX.splitZ
    ),
    new THREE.MeshBasicMaterial({ 
        color: 0x0000fc, 
        wireframe: true 
    })
);

scene.add(boundingBoxMesh);

// moving block 1 time per second
const stepTime = 1000;
var wholeTime = 0;
var isGameOver = false;
var lastTick;

const boundingBox = new BoundingBox(scene, BOUNDING_BOX.splitX, BOUNDING_BOX.splitY, BOUNDING_BOX.splitZ);
const movingBlock = new MovingBlock(scene, boundingBox); 

////////////// LISTENERS

const animate = function () {
    const presentTime = Date.now();
    wholeTime += presentTime - lastTick;    
    lastTick = presentTime;

    if (wholeTime >= stepTime) {
        movingBlock.move(0 ,0, -1);
        wholeTime -= stepTime;
    }

    renderer.render(scene, camera);
    if (!isGameOver) requestAnimationFrame(animate);
};

const newGame = () => {
    lastTick = Date.now()
    document.getElementById('points-box').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    movingBlock.generate();
    animate();
};

window.addEventListener('load', (event) => {
    renderer.render(scene, camera);
    document.getElementById('play-button').onclick = newGame;
});

window.addEventListener('keydown', (event) => {
    switch(event.key.toUpperCase()) {
        case 'ARROWUP': 
            movingBlock.move(0, 1, 0);
            break;
        case 'ARROWDOWN': 
            movingBlock.move(0, -1, 0);
            break;
        case 'ARROWLEFT':
            movingBlock.move(-1, 0, 0);
            break;
        case 'ARROWRIGHT': 
            movingBlock.move(1, 0, 0);
            break;
        case ' ':
            movingBlock.move(0, 0, -1);
            break;
        case 'W':
            movingBlock.rotate(90, 0, 0);
            break;
        case 'S':
            movingBlock.rotate(-90, 0, 0);
            break;
        case 'Q':
            movingBlock.rotate(0, 0, 90);
            break;
        case 'E':
            movingBlock.rotate(0, 0, -90);
            break;   
        case 'A':
            movingBlock.rotate(0, 90, 0);
            break;
        case 'D': 
            movingBlock.rotate(0, -90, 0);
            break;
    }
});