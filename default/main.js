let helpers = require('helpers');
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleFighter = require('role.fighter');
let workers = 15;

module.exports.loop = function () {
    
    helpers.gc();
    
    // eval if a type of creep is near end of life and create a new one.

    if(helpers.creeps.length < workers) {

        if(helpers.creeps.length > 5 && !helpers.creeps.some(c => c.body.some(b => b.type === ATTACK))) {
            helpers.createCreep([MOVE, ATTACK, ATTACK, ATTACK]);
        } else {
            helpers.createCreep([WORK, CARRY, CARRY, MOVE]);
        }

    } else {

        if(helpers.creeps.length > 5) {
            // do we have any fighters?
            if(!helpers.creeps.some(c => c.body.some(b => b.type === ATTACK))) {
                // lets create a fighter
                console.log('make me a fighter...');
                helpers.createCreep([MOVE, ATTACK, ATTACK, ATTACK]);
            }
        }

    }
    
    // TODO: Re-evaluate priorities (strategy)
    // TODO: Let worker say when they are complete full task (mine, then deposit) - before being reassigned
    
    /*
    construct extension
    heal
    attack
    spawn
    upgrade
    build
    mine
    
    consider suicide to create different worker types quickly - ie, create fighters when attacked and you have lots of miners

    out of energy - mine energy
    upgrade structure
    build defense
    attack
    heal
    
    */
    
    // TODO: re-assign each worker based on capabilities, and better candidate than others (location, carry, etc.)
    
    helpers.creeps.map((creep, i) => {
       
    // only harvest while energy is not at cap
    let room = helpers.rooms[0];
    
    //console.log('test', ATTACK, creep.name, creep.body.map(m => m.type));
    
    if(creep.body.some(w => w.type === ATTACK)) {
        roleFighter.run(creep, i);
        
        
    } else if(room.energyCapacityAvailable - room.energyAvailable > 0) {
            //creep.say('harvester');
        roleHarvester.run(creep, i);
    } else if (i > 4 && creep.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
        
            //creep.say('builder');
        roleBuilder.run(creep, i);
    } else {
            //creep.say('upgrader');
        
        roleUpgrader.run(creep, i);
    }
        // creep.memory.role = "harvester"; 


    });
    
}