let lib = module.exports = {
    get spawns() { return getKeysAsArray(Game.spawns); },
    get creeps() { return getKeysAsArray(Game.creeps); },
    get rooms() { return getKeysAsArray(Game.rooms); },
    createCreep: createCreep,
    get randomName() { return randomName(); },
    gc: gc,
    harvest: harvest
};

function harvest(creep) {
    
    let droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 4);
    
    if (droppedEnergy.length > 0) {

        let x = creep.pickup(droppedEnergy[0]);
        if(x !== OK) {
            creep.moveTo(droppedEnergy[0]);
        } else {
          creep.say('Ninja!');
        }
        return;

    }
    
    let source = creep.pos.findClosestByRange(FIND_SOURCES);
    if(typeof source !== 'undefined') {
        
        let status = creep.harvest(source);
        if (status === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }

}
function gc() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

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
    name += ' ' + getRandom(['😃','😁','😂','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😚','😇','😐','😶','😏','😣','😥','😪','😫','😌','😜','😝','😒','😓','😔','😲','😷','😖','😞','😤','😢','😭','😨','😩','😰','😱','😳','😵','😡','😠','😈','👿']);
    
    return name;

}

function getRandom(items) {
    
    return items[Math.floor(Math.random() * items.length)];

}

function createCreep(bodyParts) {
    
    // evaluate energy needed for body parts

    let name = randomName();
    let spawnner = lib.spawns[0];

    let cost = bodyParts.reduce((sum, p) => sum + BODYPART_COST[p] , 0);
    if (cost > spawnner.room.energyAvailable) {
        console.log(`Can not create. Only have ${spawnner.room.energyAvailable} of ${cost}`);
        return;
    }
    
    let s = spawnner.createCreep(bodyParts, name);

    if (s === ERR_NOT_ENOUGH_ENERGY) {
        
        //console.log("Create creep failed");

    } else if(s === ERR_BUSY) {
        
       // console.log("Too busy to create creep");

    } else {
        
        console.log(`Creating ${name}`, s);

    }

    
}
