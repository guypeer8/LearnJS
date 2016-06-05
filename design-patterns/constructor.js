//Structure
function aFunction(a,b) {
	this.a = a;
	this.b = b;
}

aFunction.prototype.protoFunction = function(){
	return this.a;
}

const instance = new aFunction('a','b');
console.log(instance.protoFunction()); // 'a'

