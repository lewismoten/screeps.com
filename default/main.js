let helpers = require('helpers');
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let workers = 20;

module.exports.loop = function () {
    
    helpers.gc();

    if(helpers.creeps.length < workers) {
        
        helpers.createCreep([WORK, CARRY, MOVE]);

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
    if(room.energyCapacityAvailable - room.energyAvailable > 0) {
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