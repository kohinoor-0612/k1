var rolejunction = {
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
              if(creep.withdraw(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
              }
        }
        else {
        //找存放點
          let mystructure = creep.room.memory.total_structure
          let towers =  mystructure.filter(structure => structure.structureType == STRUCTURE_TOWER)
          if(towers.length > 0) {
              let target = creep.pos.findClosestByPath(towers);
              creep.say('tower!!');
              if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
              }
          }
          else{
              creep.say('no towers');
            }
          }

        }
};

module.exports = rolejunction;
