//Structure and Example
var mixins = {
  get(){
    console.log( "get this item" );
  },
  set(){
    console.log( "set this item" );
  },
  delete(){
    console.log( "delete it right away!" );
  }
};
 
// Another skeleton constructor
function aConstructor() {
  this.thatIsAllFolks = function() { 
    console.log('Nope! I refuse to do anything anymore!!!')
  }
}
 
// Extend both protoype with our Mixin
jQuery.extend( aConstructor.prototype, mixins );
 
// Create a new instance of aConstructor
var myMixinConstructor = new aConstructor();

myMixinConstructor.get(); //get this item
myMixinConstructor.thatIsAllFolks(); //Nope! I refuse to do anything anymore!!!
