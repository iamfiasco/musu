module.exports = {
  init: function(){
    
    //returns last element of the list
    if(Array.prototype.last === undefined){
      Array.prototype.last = function(){
        return this[this.length - 1]
      }
    }
  
  }
}
