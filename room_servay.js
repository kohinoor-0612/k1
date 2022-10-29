var roomservay = {

run: function (room) {

  for (i = 0; i < 3; i++) {
  // console.log(i+ typeof(room.memory.sources[i]))
  switch (typeof(room.memory.sources[i])) {
      case "undefined":
        //  console.log(room + "notmuchsources");
          break;
     case "object":
     var source_corr = [room.memory.sources[i].pos.x,room.memory.sources[i].pos.y]
     source_corr = [source_corr[0]-1,source_corr[1]-1]
     var source_t = 0     
     for (var xi = 0; xi < 3; xi++){
       for (var yi = 0; yi < 3; yi++){
         var now_corr = [source_corr[0]+xi,source_corr[1]+yi]
         if (room.getTerrain().get(now_corr[0],now_corr[1]) == 1){
         source_t = source_t + room.getTerrain().get(now_corr[0],now_corr[1])}
         //console.log("xy:"+ now_corr)
         //console.log("s_count"+ source_t +"terr" + room.getTerrain().get(now_corr[0],now_corr[1]));
       }
     }
     //因為是計算牆的數量 所以要9-source_t
     Game.getObjectById(room.memory.sources[i].id).memory = 9-source_t
          break;
        };}
}
}
module.exports = roomservay;
