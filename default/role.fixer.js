let helpers = require('helpers');
let roleHarvester = require('role.harvester');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, creepIndex) {
        creep.memory.role = "fixer";

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('fix');
        }

        if(creep.memory.building) {
            
            let broken = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: s => s.hits < s.hitsMax});
            if(broken === null) {
                broken = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_WALL, hits: 1}});
            }
            
            if(broken === null) {
                
                let walls = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_WALL}});
                if(walls.length !== 0) {

                    let minHits = walls.reduce((min, wall) => min < wall.hits ? min : wall.hits);
                    
                    // Let's not upgrade our walls too much...
                    if (minHits < creep.room.controller.level * 1000) {
                        broken = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_WALL, hits: minHits}});
                    }
                    
                }
                
            }
            
            if(broken === null) {
                
                roleHarvester.run(creep, creepIndex);
                
                // transfer
            } else {
                let outcome = creep.repair(broken);
                if (outcome === ERR_NOT_IN_RANGE) {
                    creep.moveTo(broken);
                } else if(outcome !== OK) {
                    roleHarvester.run(creep, creepIndex);
                }
            }
        }
        else {

            roleHarvester.run(creep, creepIndex);
        }
    }
};

module.exports = roleBuilder;
