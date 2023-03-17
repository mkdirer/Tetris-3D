BOUNDING_BOX = {
    width: 600,
    height: 600,
    depth: 2000,
    splitX: 6,
    splitY: 6,
    splitZ: 20
};

CUBE = {
    size: BOUNDING_BOX.width / BOUNDING_BOX.splitX
}

STATIC_BLOCK_COLORS = [
    0x797d0e, 
    0x087865, 
    0x620769, 
    0x0b7a2c, 
    0x47228a, 
    0x85220c, 
    0x477a10, 
    0x704c0d, 
    0x5d0a6e, 
    0x096b37, 
    0x434709, 
    0x131f54, 
    0x611452, 
    0x1b626b, 
    0x7a121b, 
    0x736308, 
    0x912b14, 
    0x402621
];

const COLLISION = {
    NONE: 1, 
    WALL:1, 
    GROUND: 2
};

const FIELD = {
    EMPTY: 0,
    MOVING: 1,
    STATIC: 2
}

SHAPES = [
    [
        {x: 0, y: 0, z: 0},//
        {x: 0, y: 1, z: 0},// | 
        {x: 0, y: 2, z: 0},// |
    ],
    [
        {x: 0, y: 0, z: 0},//
        {x: 1, y: 0, z: 0},//  |
        {x: 1, y: 1, z: 0},// _|
        {x: 1, y: 2, z: 0}//
    ],
    [
        {x: 0, y: 0, z: 0},// 
        {x: 0, y: 1, z: 0},//  
        {x: 1, y: 0, z: 0},// |_|
        {x: 1, y: 1, z: 0}//
    ],
    [
        {x: 0, y: 0, z: 0},// 
        {x: 0, y: 1, z: 0},// |_
        {x: 0, y: 2, z: 0},// |
        {x: 1, y: 1, z: 0}//
    ],
    [
        {x: 0, y: 0, z: 0},//  
        {x: 0, y: 1, z: 0},//  _|
        {x: 1, y: 1, z: 0},// |
        {x: 1, y: 2, z: 0}//
    ]
]

Object.freeze(COLLISION);
Object.freeze(FIELD);
Object.freeze(SHAPES); //Object. freeze() is used to make an object immutable, makes existing properties non-writable and non-configurable.
Object.freeze(STATIC_BLOCK_COLORS);
Object.freeze(CUBE);
Object.freeze(BOUNDING_BOX);