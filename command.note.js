//這只是一個方便使用的筆記本

//產小兵
//15*50=750 超級建築工 同一時間只能有一個 因為名字會一樣
Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],"Wall-e the builder",{ memory:{role: 'builder'}});
Game.spawns['Spawn1'].spawnCreep([MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],"Wall-e the mover",{ memory:{role: 'hauler'}});


Game.cpu.getUsed()
Game.cpu.bucket


Game.spawns['Spawn1'].room.find(FIND_SOURCES)[0]

var spawnhighlv = require('spawn_lib.highlv');
spawnhighlv.spawnAttacker_d(Game.spawns['Spawn1'],Game.spawns['Spawn1'],800,0,2);
