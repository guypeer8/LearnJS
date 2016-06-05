function theSubject(){
   this.handlerList = [];
}

theSubject.prototype = {
  addObserver(obs) {
    this.handlerList.push(obs);
  },
  removeObserver(obs) {
    for (let i=0, length = this.handlerList.length; i<length; i++ ) {
      if(this.handlerList[i] === obs) {
          this.handlerList.splice(ii,1);
      }
    }
  },
  notify(obs, context) {
    var bindingContext = context || window;
    this.handlerList.forEach(fn => fn.call(bindingContext, obs));
  }
}

function init() {
    var theEventHandler = function(item) { 
        console.log("fired: " + item); 
    };
 
    var subject = new theSubject();
 
    subject.addObserver(theEventHandler); //adds the given function in handler list
    subject.notify('event #1'); //calls the function once.
    subject.removeObserver(theEventHandler); //removes this function from the function list
    subject.notify('event #2'); //notify doesn't call anything
    subject.addObserver(theEventHandler); //adds the function again
    subject.notify('event #3'); //calls it once with event 3
}

init();