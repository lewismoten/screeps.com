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
    var faces = [
        '\u{1F600}',
        '\u{1F601}',
        '\u{1F602}',
        '\u{1F603}',
        '\u{1F604}',
        '\u{1F605}',
        '\u{1F606}',
        '\u{1F609}',
        '\u{1F60A}',
        '\u{1F60B}',
        '\u{1F60E}',
        '\u{1F60D}',
        '\u{1F618}',
        '\u{1F617}',
        '\u{1F619}',
        '\u{1F61A}',
        '\u{263A}',
        '\u{1F642}',
        '\u{1F610}',
        '\u{1F611}',
        '\u{1F636}',
        '\u{1F60F}',
        '\u{1F623}',
        '\u{1F625}',
        '\u{1F62E}',
        '\u{1F62F}',
        '\u{1F62A}',
        '\u{1F62B}',
        '\u{1F634}',
        '\u{1F60C}',
        '\u{1F61B}',
        '\u{1F61C}',
        '\u{1F61D}',
        '\u{1F612}',
        '\u{1F613}',
        '\u{1F614}',
        '\u{1F615}',
        '\u{1F632}',
        '\u{2639}',
        '\u{1F641}',
        '\u{1F616}',
        '\u{1F61E}',
        '\u{1F61F}',
        '\u{1F624}',
        '\u{1F622}',
        '\u{1F62D}',
        '\u{1F626}',
        '\u{1F627}',
        '\u{1F628}',
        '\u{1F629}',
        '\u{1F62C}',
        '\u{1F630}',
        '\u{1F631}',
        '\u{1F633}',
        '\u{1F635}',
        '\u{1F621}',
        '\u{1F620}',
        '\u{1F607}',
        '\u{1F637}'
    ];
    name += ' ' + getRandom(faces);

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
