let lib = module.exports = {
    get spawns() { return getKeysAsArray(Game.spawns); },
    get creeps() { return getKeysAsArray(Game.creeps); },
    get rooms() { return getKeysAsArray(Game.rooms); },
    createCreep: createCreep,
    get randomName() { return randomName(); }
};

function getKeysAsArray(obj) {

    return Object.keys(obj).map(name => obj[name]);

}

function randomName() {
    
    let constants = "bcdfghjklmnpqrstvwxz";
    let vowels = "aeiou";
    let name = "";
    
    for(let i = 0; i < 3; i++) {
    
        name += getRandom(constants);
        name += getRandom(vowels);
    
        
    }

    name += getRandom(constants);

    return name;

}

function getRandom(items) {
    
    return items[Math.floor(Math.random() * items.length)];

}

function createCreep(bodyParts) {
    
    // evaluate energy needed for body parts

    let name = randomName();
    let spawnner = lib.spawns[0];
    let s = spawnner.createCreep(bodyParts, name);

    if (s === ERR_NOT_ENOUGH_ENERGY) {
        
        //console.log("Create creep failed");

    } else if(s === ERR_BUSY) {
        
        console.log("Too busy to create creep");

    } else {
        
        console.log(`Creating ${name}`, s);

    }

    
}
