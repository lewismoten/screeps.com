let helpers = require('helpers');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, i) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var source = sources[i % sources.length];
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            if(creep.transfer(helpers.spawns[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(helpers.spawns[0]);
            }
        }
    }
};

module.exports = roleHarvester;