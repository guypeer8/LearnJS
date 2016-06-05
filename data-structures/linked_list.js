

(function(exports) {

exports.LinkedList = function() {
	this.first = null;
	this.last = null;
	this.size = 0;
}

exports.LinkedList.prototype = {
	isEmpty() {
		return this.size == 0;;
	},
	push(value) {
		let node = { value };
		if(this.isEmpty()) {
			Object.assign(node, { next: null, prev: null });
			this.first = this.last = node;
		}
		else {
			let temp = this.last;
			Object.assign(node, { next: null, prev: temp });
			temp.next = node;
			this.last = node;
		}
		this.size++;
	},
	pop() {
		if(this.isEmpty()) {
			throw 'Empty!';
		}
		let prevLast = this.last;
		if(this.last == this.first) {
			this.size = 0;
			this.first = null;
			this.last = null;
		}
		else {
			let prevLast = this.last;
			let beforeLast = this.last.prev;
			beforeLast.next = null;
			this.last = beforeLast;
			this.size--;
		}
		return prevLast;
	},
	unshift(value) {
		let node = { value };
		if(this.isEmpty()) {
			Object.assign(node, { next: null, prev: null });
			this.first = this.last = node;
		}
		else {
			let temp = this.first;
			temp.prev = node;
			node.prev = null;
			node.next = temp;
			this.first = node;
		}
		this.size++;
	},
	shift() {
		if(this.isEmpty()) {
			throw 'Empty!';
		}
		let prevFirst = this.first;
		if(this.last == this.first) {
			this.size = 0;
			this.first = null;
			this.last = null;
		}
		else {
			var afterFirst = this.first.next;
			afterFirst.prev = null;
			this.first = afterFirst;
			this.size--;
		}
		return prevFirst;
	},
	getNodeList() {
		if(this.isEmpty()) {
			return [];
		}
		if(this.last == this.first) {
			return [this.first];
		}
		let list = [];
		let temp = this.first;
		while(temp.next) {
			list.push(temp);
			temp = temp.next;
		}
		list.push(this.last);
		return list;
	},
	getSize() {
		return this.size;
	},
	firstNode() {
		if(this.isEmpty()) {
			throw 'Empty';
		}
		return this.first;
	},
	lastNode() {
		if(this.isEmpty()) {
			throw 'Empty';
		}
		return this.last;
	},
	getNode(number) {
		if(number < 0 || number > this.size-1) {
			throw 'The index does not exist';
		}
		let counter = 0;
		let element = this.first;
		while(counter < number) {
			element = element.next;
			counter++;
		}
		return element;
	},
	removeNode(number) {
		if(number < 0 || number > this.size-1) {
			throw 'The index does not exist';
		}
		let counter = 0;
		let element = this.first;
		while(counter < number) {
			element = element.next;
			counter++;
		}
		if(element == this.first) {
			this.shift();
		}
		else if(element == this.last) {
			this.pop();
		}
		else {
			let before = element.prev;
			let after = element.next;
			before.next = element.next;
			after.prev = element.prev;
		}	
		return element;
	}
}

})(window || module.exports);