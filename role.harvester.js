var roleHarvester = {
    run: function(creep) {
          //決策樹
           if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
            creep.say('⛏️harvest');
	    }
	         if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
	        creep.memory.harvesting = false;	        
          // [0]比較難挖
          let source0 = creep.room.find(FIND_SOURCES)[0].energy;
          let source1 = creep.room.find(FIND_SOURCES)[1].energy;
          if (source0 > source1 && Math.random() > 0.8){
            creep.memory.harvest_target_id = creep.room.find(FIND_SOURCES)[0].id};
            creep.say('🛏️rethinking');
          if (source1 > source0 && Math.random() > 0.4){
              creep.memory.harvest_target_id = creep.room.find(FIND_SOURCES)[1].id};
              creep.say('🛏️rethinking');
	    }




	    if(creep.memory.harvesting == true) {
            let source = Game.getObjectById(creep.memory.harvest_target_id);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source,{reusePath: 5},{visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                let target = creep.pos.findClosestByPath(targets);
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target,{reusePath: 2},{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;
