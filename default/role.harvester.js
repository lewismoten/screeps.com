let helpers = require('helpers');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, i) {
        creep.memory.role = "harvester";
        if(creep.carry.energy === 0) {

            if (creep.memory.unloading) {
                creep.say("harvest")
            }
            creep.memory.unloading = false;
        } else if(creep.carry.energy === creep.carryCapacity) {
            if (!creep.memory.unloading) {
                creep.say("xfer");
            }
            creep.memory.unloading = true;
        }

        if(creep.memory.unloading) {

            //find a place to unload that can be unloaded into
            //creep.room.find(FIND_CONSTRUCTION_SITES)

            let structure = creep.room.find(FIND_MY_STRUCTURES).filter(s => s.energy < s.energyCapacity)[0];

            let x = creep.transfer(structure, RESOURCE_ENERGY);
//            let x = creep.transfer(helpers.spawns[0], RESOURCE_ENERGY);

             if(x == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
        }
        else {

            helpers.harvest(creep);

        }
    }
};

module.exports = roleHarvester;
