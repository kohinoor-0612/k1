var spawnhighlv = {
  spawnHarvester2_d: function (spawn,cost,livingroom,job_count_now,maxium_job) {
    if(job_count_now < maxium_job) {
            let newName = 'd_harvester2' + livingroom + Game.time;
            let source0 = spawn.room.memory.sources[0];
            let source1 = spawn.room.memory.sources[1];
            let source0_count = _.filter(Game.creeps, i => i.memory.harvest_target_id == source0.id);
            let source1_count = _.filter(Game.creeps, i => i.memory.harvest_target_id == source1.id);
            if (source0_count.length  < source1_count.length ){
              var source = spawn.room.memory.sources[0].id
              }else {
                source = spawn.room.memory.sources[1].id
              };
            //生成身體結構 3個零件數量都相等
            var numberOfParts = Math.floor((cost-200) / 150);
            if(numberOfParts > 6){ numberOfParts = 6}
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                 body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            //計算完之後多給他一個MOVE
            body.push(MOVE);
            body.push(MOVE);
            body.push(CARRY);
            body.push(CARRY);
if (spawn.spawnCreep(body,newName,{memory:{role: 'harvester2', harvest_target_id :source}},{dryRun: true})===0)
{spawn.spawnCreep(body,newName,{
  memory:
        {role: 'harvester2', harvest_target_id :source}
      });}
      else{console.log("can't spawn D-max-harvester")}
    }
  },
  spawnHauler_d: function (spawn,cost,livingroom,job_count_now,maxium_job) {
    if(job_count_now < maxium_job) {
            let newName = 'd_hauler' + livingroom + Game.time;
            //生成身體結構 零件數量都相等
            var numberOfParts = Math.floor((cost-50) / 100);
            var body = [];
            //set maxium part
            if(numberOfParts > 10){ numberOfParts = 10}
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            //計算完之後多給他一個MOVE
            body.push(MOVE);
if (spawn.spawnCreep(body,newName,{memory:{role: 'hauler'}},{dryRun: true})===0)
{spawn.spawnCreep(body,newName,{
  memory:
        {role: 'hauler'}
      });}
      else{console.log("can't spawn D-max-hauler")}
    }
  },
  spawnBuilder_d: function (spawn,cost,livingroom,job_count_now,maxium_job) {
    if(job_count_now < maxium_job) {
            let newName = 'd_builder' + livingroom + Game.time;
            //生成身體結構 3個零件數量都相等
            var numberOfParts = Math.floor(cost/ 200);
            var body = [];
            //set maxium part
            if(numberOfParts > 10){ numberOfParts = 10}
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
if (spawn.spawnCreep(body,newName,{memory:{role: 'builder'}},{dryRun: true})===0)
{spawn.spawnCreep(body,newName,{
  memory:
        {role: 'builder'}
      });}
      else{console.log("can't spawn D-max-hauler")}
    }
  },
}

module.exports = spawnhighlv;
