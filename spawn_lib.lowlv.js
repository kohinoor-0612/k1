var spawnlowlv = {

//spawnlowlv.spawnHarvester1(spawn, room,harvester_count.length,maxium_harvester);
spawnHarvester1: function (spawn,livingroom,job_count_now,maxium_job) {
  if(job_count_now < maxium_job) {
          let newName = 'harvester' + livingroom + Game.time;
          let source = _.sample(spawn.room.find(FIND_SOURCES)).id;
          spawn.spawnCreep([WORK,CARRY,MOVE], newName,{
            memory:
                  {role: 'harvester', harvest_target_id :source}
                });
  }
},
spawnHarvester1_2: function (spawn,livingroom,job_count_now,maxium_job) {
  if(job_count_now < maxium_job) {
          let newName = 'harvester2' + livingroom + Game.time;
          let source = _.sample(spawn.room.find(FIND_SOURCES)).id;
          spawn.spawnCreep([WORK,CARRY,MOVE], newName,{
            memory:
                  {role: 'harvester2', harvest_target_id :source}
                });
  }
},
spawnUpgrader: function (spawn,livingroom,job_count_now,maxium_job) {
  if(job_count_now < maxium_job) {
          let newName = 'upgrader' + livingroom + Game.time;
          spawn.spawnCreep([WORK,CARRY,MOVE], newName,{
            memory:
             {role: 'upgrader'}
           });
  }
},
spawnBuilder: function (spawn,livingroom,job_count_now,maxium_job) {
  if(job_count_now < maxium_job) {
          let newName = 'builder' + livingroom + Game.time;
          spawn.spawnCreep([WORK,CARRY,MOVE], newName,{
            memory:
             {role: 'builder'}
           });
  }
},
spawnHauler: function (spawn,livingroom,job_count_now,maxium_job) {
  if(job_count_now < maxium_job) {
          let newName = 'hauler' + livingroom + Game.time;
          spawn.spawnCreep([CARRY,CARRY,MOVE,MOVE], newName,{
            memory:
             {role: 'hauler'}
           });
  }
}
}
module.exports = spawnlowlv;
