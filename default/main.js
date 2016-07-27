let helpers = require('helpers');
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    

    if(helpers.creeps.length < 4) {
        
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

    out of energy - mine energy
    upgrade structure
    build defense
    attack
    heal
    
    */
    
    // TODO: re-assign each worker based on capabilities, and better candidate than others (location, carry, etc.)
    
    helpers.creeps.map((creep, i) => {

    if(helpers.creeps.length < 4) {
        roleHarvester.run(creep, i);
    } else {
        roleUpgrader.run(creep, i);
    }
        // creep.memory.role = "harvester"; 


    });
    
}