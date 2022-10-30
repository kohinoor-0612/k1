var roleHauler = {
    run: function(creep) {
          //決策樹

           if(!creep.memory.pickingup && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.pickingup = true;
            creep.say('picking');
	         }
	        if(creep.memory.pickingup && creep.store.getFreeCapacity() == 0) {
	        creep.memory.pickingup = false;
	        creep.say('droping');}

	    if(creep.memory.pickingup == true) {
	        //撿起來
            var droppedRessource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            var pickupcontainer = Game.getObjectById(Memory.outputid[0]);
            if(pickupcontainer.store[RESOURCE_ENERGY] > 200){
              creep.say("gonan pick u up");
              if(creep.withdraw(pickupcontainer,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(pickupcontainer, {visualizePathStyle: {stroke: '#ffaa00'}})
              }
            }else{
              if(creep.pickup(droppedRessource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedRessource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }}
            if (creep.room.memory.state == "filling"){
              creep.say("gonna full u up")
              if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
              }
            }else{
            if (creep.room.memory.total_container_energy >9000){
              let targets2 =  creep.room.memory.total_structure.filter(structure => structure.structureType == STRUCTURE_CONTAINER)
              let target = Game.getObjectById(targets2[0].id)
              if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
              }
            }
          }
        }
        else {
        //找存放點
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
              creep.say('普通目標');
              if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
              }
          }
          else{
              creep.say('普通目標全滿了');
              var targets2 =  creep.room.memory.total_structure.filter(structure => structure.structureType === STRUCTURE_CONTAINER);
               targets2 = targets2.filter(structure => structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
            if(typeof (targets2[0]) != "undefined") {
                let target = Game.getObjectById(targets2[0].id)
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target,{reusePath: 2},{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if(typeof (targets2[0]) == "undefined"||creep.room.memory.total_container_energy>5900){
              creep.say("中等目標也滿了")
              if(creep.transfer(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
              }


            }
          }

        }
	}
};

module.exports = roleHauler;
