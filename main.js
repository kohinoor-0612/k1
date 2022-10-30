var roleHarvester = require('role.harvester');
var roleHarvester2 = require('role.harvester2');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHauler = require('role.hauler');
var roleJunction = require('role.junction');
var roombuildingtower = require('room_building.tower');
var roomservay = require('room_servay');
var spawnlowlv = require('spawn_lib.lowlv');
var spawnhighlv = require('spawn_lib.highlv');
var test123 = require('servay');
test123.do();
///主伺服器的挖礦已經夠多了
const  maxium_harvester = 4;
const  maxium_builder = 2;
const  maxium_upgrader = 1;
const  maxium_opupgrader = 5;
const  maxium_hauler = 2

//____________________________________只執行一次
//賦予礦點記憶屬性
Object.defineProperty(Source.prototype, 'memory', {
    get: function() {
        if(_.isUndefined(Memory.sources)) {
            Memory.sources = {};
        }
        if(!_.isObject(Memory.sources)) {
            return undefined;
        }
        return Memory.sources[this.id] = Memory.sources[this.id] || {};
    },
    set: function(value) {
        if(_.isUndefined(Memory.sources)) {
            Memory.sources = {};
        }
        if(!_.isObject(Memory.sources)) {
            throw new Error('Could not set source memory');
        }
        Memory.sources[this.id] = value;
    }
});


//礦點偵測
Game.spawns['Spawn1'].room.memory.sources = [];
Game.spawns['Spawn1'].room.memory.sources.push(Game.spawns['Spawn1'].room.find(FIND_SOURCES)[0]);
if (Game.spawns['Spawn1'].room.find(FIND_SOURCES).length > 1){
Game.spawns['Spawn1'].room.memory.sources.push(Game.spawns['Spawn1'].room.find(FIND_SOURCES)[1]);}
roomservay.run(Game.spawns['Spawn1'].room);

//Game.spawns['Spawn1'].room.memory.state = "default"
//____________________________________只執行一次


module.exports.loop = function () {
  var harvester_count = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var hauler_count = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
  var harvester2_count = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
  var builder_count = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  var upgrader_count = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');


//數量追蹤
if (Game.time % 5 === 0) {
  //刪除已經不存在的記憶
      for(var name in Memory.creeps) {
          if(!Game.creeps[name]) {
              delete Memory.creeps[name];
              console.log('Clearing non-existing creep memory:', name);
          }
      }

    if(Game.cpu.bucket == 10000) {
    console.log("picile!")
    Game.cpu.generatePixel();
}
}

if (Game.time % 10 === 0) {
    Game.spawns['Spawn1'].room.memory.total_structure = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES)
}

    var total_energy = Game.spawns.Spawn1.room.energyAvailable;
    var total_energy_cap = Game.spawns.Spawn1.room.energyCapacityAvailable ;

// 追蹤房間內的數值
if (Game.time % 2 === 0) {
  Game.spawns['Spawn1'].room.memory.total_energy = total_energy
  Game.spawns['Spawn1'].room.memory.total_energy_cap = total_energy_cap

  var containersWithEnergy = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
  filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
             i.store[RESOURCE_ENERGY] > 0
  });
  var container_energy = 0
  for (i = 0; i < containersWithEnergy.length; i++)
  {   container_energy = container_energy +containersWithEnergy[i].store[RESOURCE_ENERGY]
      }
      Game.spawns['Spawn1'].room.memory.total_container_energy = container_energy
}

//產出高等單位 使用總能量 遇設關閉
var lowlvbase = false
if ( lowlvbase == true){
for(var name in Game.spawns) {
  var local_spawn = Game.spawns[name];
if(total_energy >= 350) {

  if(total_energy > 500) {
    if(harvester2_count.length+harvester_count.length < maxium_harvester && hauler_count.length > 0 ) {
      let newName = 'harvester-3LV' + Game.time;
      let source = _.sample(local_spawn.room.find(FIND_SOURCES)).id;
      local_spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE], newName,{memory: {role: 'harvester2', harvest_target_id :source}});
    }
  }
     else{
    if(harvester2_count.length+harvester_count.length < maxium_harvester && hauler_count.length > 0 ) {
      let newName = 'harvester-2LV' + Game.time;
      let source = _.sample(local_spawn.room.find(FIND_SOURCES)).id;
      local_spawn.spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester2', harvest_target_id :source}});
    }
  }
  if(hauler_count.length < maxium_hauler) {
                                let newName = 'hauler-2LV' + Game.time;
                                local_spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,{memory: {role: 'hauler'}});
  }
  if(upgrader_count.length < maxium_upgrader) {
                                let newName = 'upgrader-2LV' + Game.time;
                                //350
                                local_spawn.spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName,{memory: {role: 'upgrader'}});
  }
  if((total_energy === total_energy_cap)&&(local_spawn.room.memory.total_container_energy > 6000)) {
    let newName = 'builder-LVmax' + Game.time;
    //500
    local_spawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,{memory: {role: 'builder'}});
  }
}
}
}


for (let spawns in Game.spawns) {
    let spawn = Game.spawns[spawns];
    let room = spawn.room;
    //新版生成LOOP stage 1
    if(room.memory.total_energy < 400 || (harvester2_count.length + harvester_count.length < 2)){
      if(harvester2_count.length + harvester_count.length < 2){
        spawnlowlv.spawnHarvester1(spawn,room,harvester_count.length,maxium_harvester)}
        else{
        spawnlowlv.spawnHarvester1_2(spawn,room,harvester2_count.length,maxium_harvester);
        spawnlowlv.spawnUpgrader(spawn,room,upgrader_count.length,maxium_upgrader);
        spawnlowlv.spawnBuilder(spawn,room,builder_count.length,maxium_builder);
      }
      if(harvester2_count.length > 0){
          spawnlowlv.spawnHauler(spawn,room,hauler_count.length,maxium_hauler);}
  };
  //新版生成LOOP 生成高階單位 stage 3
  if (room.memory.total_energy>=room.memory.total_energy_cap){
    spawnhighlv.spawnHarvester2_d(spawn,room.memory.total_energy,room,harvester2_count.length,maxium_harvester);
    spawnhighlv.spawnBuilder_d(spawn,room.memory.total_energy,room,builder_count.length,maxium_builder);
    //過渡期
    if(room.memory.total_energy > 800)
    {spawnhighlv.spawnHauler_d(spawn,room.memory.total_energy,room,hauler_count.length,maxium_hauler);}
  }
  //生成固定數量
  spawnhighlv.spawnHauler_d(800,room,hauler_count.length,maxium_hauler);
};

//城政中心的產出標記
    if(Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.name,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

//塔行為LOOP

for (let rooms in Game.rooms) {
        let room = Game.rooms[rooms];
        roombuildingtower.run(room);
        //roomspawnlowlv.run(room);
    }

//行為LOOP
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'rolejunction') {
            roleJunction.run(creep);
        }
        if(creep.memory.role == 'harvester2') {
            roleHarvester2.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
    }
}
