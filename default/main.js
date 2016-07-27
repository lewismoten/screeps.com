let helpers = require('helpers');
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let workers = 10;

module.exports.loop = function () {
    

    if(helpers.creeps.length < workers) {
        
        helpers.createCreep([WORK, CARRY, MOVE]);

    }
    
    // TODO: Re-evaluate priorities (strategy)
    // TODO: Let worker say when they are complete full task (mine, then deposit) - before being reassigned
    
    /*
    
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
        roleHarvester.run(creep, i);
    } else {
        roleUpgrader.run(creep, i);
    }
        // creep.memory.role = "harvester"; 


    });
    
}