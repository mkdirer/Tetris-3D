class BoundingBox {
    blocks = [];
    staticBlocks = []; // needed for checking if level is completed
    scene = null;
    points = 0;

    constructor(scene, x, y, z) {
        this.scene = scene;

        for (let i = 0; i < x; i++) {
            this.blocks[i] = [];
            for (let j = 0; j < y; j++) {
                this.blocks[i][j] = [];
                for (let k = 0; k < z; k++) {
                    this.blocks[i][j][k] = FIELD.EMPTY;
                }
            }
        }
    }

    addStaticBlock = (x, y, z) => {
        if(this.staticBlocks[x] === undefined) this.staticBlocks[x] = [];
        if(this.staticBlocks[x][y] === undefined) this.staticBlocks[x][y] = [];
        
        
        let meshSolidColor = new THREE.Mesh(new THREE.BoxGeometry(CUBE.size, CUBE.size, CUBE.size), new THREE.MeshBasicMaterial({ 
            color: STATIC_BLOCK_COLORS[z],
            reflectivity: 0.0,
        }));
        let meshWireFrame = new THREE.Mesh(new THREE.BoxGeometry(CUBE.size, CUBE.size, CUBE.size), new THREE.MeshStandardMaterial({color: 0x000000, transparent: true,  wireframe: true, wireframeLinewidth: 20}));
        
        let mesh = new THREE.Group();
        mesh.add(meshSolidColor)
        mesh.add(meshWireFrame)
        
        mesh.position.x = (x - BOUNDING_BOX.splitX / 2) * CUBE.size + CUBE.size / 2;
        mesh.position.y = (y - BOUNDING_BOX.splitY / 2) * CUBE.size + CUBE.size / 2;
        mesh.position.z = (z - BOUNDING_BOX.splitZ / 2) * CUBE.size + CUBE.size / 2;
        mesh.overdraw = true;

        this.scene.add(mesh);
        this.staticBlocks[x][y][z] = mesh;
    };

    checkIfLevelCompleted = () => {
        let sum = 0;
        let points = 0;
        let expected = BOUNDING_BOX.splitX * BOUNDING_BOX.splitY;
        let rebuild = false;
    
        for (let z = 0; z < BOUNDING_BOX.splitZ; z++) {
            sum = 0;
            for (let y = 0; y < BOUNDING_BOX.splitY; y++) {
                for (let x = 0; x < BOUNDING_BOX.splitX; x++) {
                    if (this.blocks[x][y][z] === FIELD.STATIC) sum++;
                }
            }
    
            if (sum === expected) {
                points += 1 + points;
    
                for (let x = 0; x < BOUNDING_BOX.splitX; x++) {
                    for (let y = 0; y < BOUNDING_BOX.splitY; y++) {
                        for (let z = 0; z < BOUNDING_BOX.splitZ; z++) {
                            this.blocks[x][y][z] = this.blocks[x][y][z + 1];
                        }
                        this.blocks[x][y][BOUNDING_BOX.splitZ - 1] = FIELD.EMPTY;
                    }
                }
    
                rebuild = true;
                z--;
            }
        }
    
        if (points) {
            this.points += points;
            document.getElementById('points-box').innerHTML = `${this.points}`;
        }
    
        if (rebuild) {
            for (let x = 0; x < BOUNDING_BOX.splitX; x++) {
                for (let y = 0; y < BOUNDING_BOX.splitY; y++) {
                    for (let z = 0; z < BOUNDING_BOX.splitZ; z++) {
                        if (this.blocks[x][y][z] === FIELD.STATIC && !this.staticBlocks[x][y][z]) {
                            this.addStaticBlock(x, y, z);
                        }
                        if (this.blocks[x][y][z] === FIELD.EMPTY && this.staticBlocks[x][y][z]) {
                            this.scene.remove(this.staticBlocks[x][y][z]);
                            this.staticBlocks[x][y][z] = undefined;
                        }
                    }
                }
            }
        }
    }
}
