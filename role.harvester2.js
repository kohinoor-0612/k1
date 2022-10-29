var roleHarvester2 = {
    run: function(creep) {


      //決策樹 挖滿才重新選目標 不然會一直左右擺動
        let source0 = creep.room.memory.sources[0];
        let source1 = creep.room.memory.sources[1];
        let source0_count = _.filter(Game.creeps, i => i.memory.harvest_target_id == source0.id);
        let source1_count = _.filter(Game.creeps, i => i.memory.harvest_target_id == source1.id);
        if (source0_count.length  < 1){
          creep.memory.harvest_target_id = creep.room.memory.sources[0].id};
        if (source1_count.length  < 1){
            creep.memory.harvest_target_id = creep.room.memory.sources[1].id};
        console.log("0count:"+ source0_count.length + "1count:"+  source1_count.length )
        console.log(Game.getObjectById(source0.id).memory)

       if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
            creep.memory.rethnk = true;
            creep.say('⛏️harvest');
	    }else{

        if(creep.store.getFreeCapacity() == 0) {
          creep.memory.harvesting = false;
          creep.memory.rethnk = false;
            }
          }

//＿挖礦洞作

	    if(creep.memory.harvesting == true) {
            let source = Game.getObjectById(creep.memory.harvest_target_id);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                 creep.say('go to1');
                creep.moveTo(source,{reusePath: 5},{visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            creep.drop(RESOURCE_ENERGY);
            creep.memory.harvesting = false;
        }
	}
};

module.exports = roleHarvester2;
