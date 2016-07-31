let helpers = require('helpers');
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleFighter = require('role.fighter');
let roleFixer = require('role.fixer');

module.exports.loop = function () {

    helpers.gc();
    
    for(var roomKey in Game.rooms) {

        let room = Game.rooms[roomKey];
        
        // Towers

        let towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

        towers.forEach(t => {

            let hostile = t.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            if(hostile !== null) {

                t.attack(hostile);

            }

        });

        // New Creeps
        
        let attackers = room.find(FIND_MY_CREEPS, {filter: c => c.body.some(b => b.type === ATTACK)});
        let workers = room.find(FIND_MY_CREEPS, {filter: c => c.body.some(b => b.type === WORK)});
        
        let controller = room.controller;
        
        if (attackers.length < controller.level) {

            helpers.createCreep([MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK]);

        } else if (workers.length < controller.level * 5) {

            helpers.createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]);

        }
        
        // Peace keepers
        
        attackers.sort().map((attacker, i) => roleFighter.run(attacker, i));
        
        // workers
        
        let constructionSites = room.find(FIND_CONSTRUCTION_SITES);
        // lets make sure the same broken structure is chosen each tick (so we don't keep moving to random structures)
        let brokenStructures = room.find(FIND_STRUCTURES, {filter: o => o.hits < o.hitsMax});
        

        let needMoreEnergy = room.energyCapacityAvailable - room.energyAvailable > 0;
        workers.sort().map((worker, i) => {
            
            if (i === 0 && worker.length > 1) {

                // make sure someone is always upgrading (unless only 1 worker exists)
                roleUpgrader.run(worker, i);

            } else if (needMoreEnergy) {
                
                // we are not at full capacity - let's harvest!
                roleHarvester.run(worker, i);

            } else if(i > (workers.length / 2) && constructionSites.length !== 0) {
                
                // Use half the workforce to keep building
                roleBuilder.run(worker, i);
                
            } else if(i <= controller.level && brokenStructures.length > 0) {
                
                roleFixer.run(worker, i);

            } else {

                // Everyone else upgrades
                roleUpgrader.run(worker, i);

            }
            
        });
    };

}
