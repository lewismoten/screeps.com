let lib = module.exports = {
    get spawns() { return getKeysAsArray(Game.spawns); },
    get creeps() { return getKeysAsArray(Game.creeps); },
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

function createCreep() {

    let s = lib.spawns[0].createCreep([WORK, CARRY, MOVE], randomName());

    if (s === ERR_NOT_ENOUGH_ENERGY) {

        console.log("Not enough energy to create creep");

    }

    
}
