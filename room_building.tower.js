var roombuildingtower = {

run: function (room) {
    const wallreapirgate = 30000
    var mystructure = room.memory.total_structure
    var tower =  mystructure.filter(structure => structure.structureType == STRUCTURE_TOWER)
    var hostiles = room.find(FIND_HOSTILE_CREEPS);
//有些建築物沒有血量 這篇套用三次過濾來抓出有血量且未滿的
    var notwall =  mystructure.filter(structure => structure.structureType != STRUCTURE_WALL)
    notwall = notwall.filter(structure => typeof(structure.hits) != 'undefined')
    notwall = notwall.filter(structure => structure.hits < structure.hitsMax)
    var wall =  mystructure.filter(structure => structure.structureType == STRUCTURE_WALL)
    wall = wall.filter(structure => structure.hits < wallreapirgate)
    if(tower) {
      for (i = 0; i < tower.length; i++) {
         var tower = Game.getObjectById(tower[i].id)
         if(hostiles.length===0){
              //var closestDamagedStructure = tower[i].pos.findClosestByRange({notwall});
        if(notwall[2]) {
          //將長期記憶中的建築資訊拉出來作成短期記憶，然後用這個短期記憶來修復
          let goldfish = [Game.getObjectById(notwall[0].id),Game.getObjectById(notwall[1].id),Game.getObjectById(notwall[2].id)];
          goldfish = goldfish.filter(structure => structure.hits < structure.hitsMax);
          if (goldfish.length != 0){
          tower.repair(Game.getObjectById(goldfish[0].id))};
        }else{
         // console.log("tower has nothing to repair");
          if(wall[0]) {
            let goldfish = [Game.getObjectById(wall[0].id),Game.getObjectById(wall[1].id),Game.getObjectById(wall[2].id)];
            goldfish = goldfish.filter(structure => structure.hits < wallreapirgate);
            tower.repair(Game.getObjectById(goldfish[0].id));
          }

        }

         }else{
             var closestHostile = tower.pos.findClosestByRange(hostiles);
        if(closestHostile) {
            tower.attack(closestHostile);
        }}

         }

    }
}

}


module.exports = roombuildingtower;
