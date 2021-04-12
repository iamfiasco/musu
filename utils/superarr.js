module.exports = {
  init: function(){
    if(Array.prototype.last === undefined){
      Array.prototype.last = function(){
        return this[this.length - 1]
      }
    }
  }
}
