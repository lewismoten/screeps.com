let helpers = require('helpers');
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    

    if(helpers.creeps.length < 2) {
        
        helpers.createCreep([WORK, CARRY, MOVE], new Date().toISOString());

    }
    
    helpers.creeps.map(creep => {

       creep.memory.role = "upgrader"; 

       roleUpgrader.run(creep);

    });
    
}