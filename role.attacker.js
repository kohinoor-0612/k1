var roleAttacker = {

    run: function (creep) {
        var hostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    /*    var tower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
            filter: (structure) => {
            return structure.structureType === STRUCTURE_TOWER;
             }
        });
        var structure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
            filter: (structure) => {
            return structure.structureType !== STRUCTURE_CONTROLLER;
             }
        }); */
        //確認有用但是需要特定名字的奇 暫時用步到
    /*    if (Game.flags.attackflag != null) {
            if (!creep.memory.attackflag) {
                creep.moveTo(Game.flags.attackflag, {visualizePathStyle: {stroke: '#ffffff'}})
                if(creep.pos.isNearTo(Game.flags.attackflag)) {
                    creep.memory.attackflag = true;
                }
            }} */
        if (hostile) {
            creep.say("Attack!")
            creep.moveTo(hostile, {visualizePathStyle: {stroke: '#FF0000'}})
            creep.attack(hostile)  }

    }
};

module.exports = roleAttacker;
