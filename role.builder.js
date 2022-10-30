var roleBuilder = {
//WIP 玩全沒有container時會bug out
    /** @param {Creep} creep **/
    run: function(creep) {
        var total_energy = Game.spawns.Spawn1.room.energyAvailable ;
        var total_energy_cap = Game.spawns.Spawn1.room.energyCapacityAvailable ;

       //給予每個沒有工作的工作
 if (typeof (creep.memory.task) == 'undefined') {
      console.log(creep.name + "nojob");
      creep.memory.task = "withdrawing";
 }

	    if((creep.memory.task =="building" || creep.memory.task =="upgrading" )&& creep.store[RESOURCE_ENERGY] == 0 && total_energy > 300) {
            creep.memory.task = "withdrawing";
            creep.say('🔄 withdrawing');
	    }
	    if(creep.memory.task == "withdrawing" && creep.store.getFreeCapacity() == 0) {
	        creep.memory.task = "building";
	        creep.say('🚧 build');
	    }


	    if(creep.memory.task =="building") {
	          var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	          let target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(targets.length > 0) {

                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target,{reusePath: 5},{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
              var repairtargets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType != STRUCTURE_WALL) &&(structure.hits < structure.hitsMax)}});
              repairtargets.sort((a,b) => a.hits - b.hits);
              if(repairtargets.length > 0) {
                     // 叫他去repair 離太遠無法repair時 移動
                  if(creep.repair(repairtargets[0]) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(repairtargets[0],{reusePath: 5},{visualizePathStyle: {stroke: '#ffffff'}});
                  }
              }
              else {
                 creep.memory.task ="upgrading";
                 creep.say('🚧 upgrade');

      }

          }

	    }
	    if(creep.memory.task =="withdrawing") {
	    var pickup_energy_targets = Game.flags["Flag1"]
        var pickup_energy_targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_STORAGE ||
                            structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                }
        });
        if(creep.room.memory.total_container_energy > 300){
          var pickup_energy_targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                }
        });
        }
        let target = creep.pos.findClosestByPath(pickup_energy_targets)

            if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});

            }

	    }
	    if(creep.memory.task =="upgrading"){
          // nothing to repair, let's do something else?
               if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller,{reusePath: 10},{visualizePathStyle: {stroke: '#ffaa00'}});
            }

	    }
	}
};


module.exports = roleBuilder;
