let helpers = require('helpers');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, i) {
        creep.memory.role = "harvester";
        if(creep.carry.energy === 0) {
            
            if (creep.memory.unloading) {
                creep.say("harvesting")
            }
            creep.memory.unloading = false;
        } else if(creep.carry.energy === creep.carryCapacity) {
            if (!creep.memory.unloading) {
                creep.say("transferring");
            }
            creep.memory.unloading = true;
        }
        
        if(creep.memory.unloading) {
            
            let x = creep.transfer(helpers.spawns[0], RESOURCE_ENERGY);
            
             if(x == ERR_NOT_IN_RANGE) {
                creep.moveTo(helpers.spawns[0]);
            }
        }
        else {
            
            var sources = creep.room.find(FIND_SOURCES);
            var source = sources[0];//i % sources.length];
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
           
        }
    }
};

module.exports = roleHarvester;