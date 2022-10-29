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

var source_corr = [room.memory.sources[0].pos.x,room.memory.sources[0].pos.y]
source_corr = [source_corr[0]-1,source_corr[1]-1]
var source_t = 0
var xi =0
var vi =0
for (var xi = 0; xi < 4; xi++){
  for (var yi = 0; yi < 4; yi++){
    let xii = source_corr[0]+xi-1
    let yii = source_corr[1]+yi-1
    if (room.getTerrain().get(xii,yii) == 1){
    source_t = source_t + room.getTerrain().get(xii,yii)}
  }
}
console.log(source_t)
