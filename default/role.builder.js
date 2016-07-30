let helpers = require('helpers');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.role = "builder";

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }

        if(creep.memory.building) {
            
            let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else {

            helpers.harvest(creep);
        }
    }
};

module.exports = roleBuilder;
