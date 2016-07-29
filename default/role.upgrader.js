let helpers = require('helpers');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, i) {
                creep.memory.role = "upgrader";

        if(creep.memory.unloading && creep.carry.energy === 0) {
            creep.memory.unloading = false;
            creep.say("harvest")
        } else if(!creep.memory.unloading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.unloading = true;
            creep.say("upgrade");
        }
        
        
        if(!creep.memory.unloading) {
            
            helpers.harvest(creep);
            
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;