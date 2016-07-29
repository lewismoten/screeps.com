let helpers = require('helpers');

var roleFighter = {

    /** @param {Creep} creep **/
    run: function(creep, i) {
        creep.memory.role = "fighter";

        var baddie = creep.room.find(FIND_HOSTILE_CREEPS)[0];

        if (baddie) {
            creep.say('Kill!');
            let r = creep.attack(baddie);
            if(r !== OK) {
                creep.moveTo(baddie);
            }
        }
    }
};

module.exports = roleFighter;
