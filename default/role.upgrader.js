var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, i) {
        
        if(creep.memory.unloading && creep.carry.energy === 0) {
            creep.memory.unloading = false;
            creep.say("harvesting")
        } else if(!creep.memory.unloading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.unloading = true;
            creep.say("upgrading");
        }
        
        
        if(!creep.memory.unloading) {
            var sources = creep.room.find(FIND_SOURCES);
            var source = sources[0];//i % sources.length];
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;