

(function(exports) {

exports.BinaryTree = function() {
	this.root = null;
	this.size = 0;
}

exports.BinaryTree.prototype = {
	isEmpty() {
		return this.size == 0;
	},
	insert(value) {
		let node = { value, left: null, right: null};	
		if(this.isEmpty()) {
			node.parent = null;
			this.root = node;
		}
		else {
			let current = this.root;
			while(true) {
				if(value > current.value) {
					if(!current.right) {
						break;
					}
					current = current.right;
				}
				else {
					if(!current.left) {
						break;
					}
					current = current.left;
				}
			}
			node.parent = current;
			if(current.value > value) {
				current.left = node;
			}
			else {
				current.right = node;
			}
		}
		this.size++;
	},
	remove(value) {
		if(this.isEmpty()) {
			throw 'Empty';
		}
		let current = this.root;
		while(current) {
			if(current.value === value) {
				break;
			}
			else if(current.value < value) {
				if(!current.right) {
					current = null;
					break;
				}
				current = current.right;
			}
			else {
				if(!current.left) {
					current = current.left;
					break;
				}
				current = current.left;
			}
		}
		if(!current) {
			throw 'No such value in the tree';
		}
		if(current !== this.root) {
			let nodes = _createTreeList(current).splice(0,1);
			if(current.parent.right && current.parent.right.value === value) {
				current.parent.right = null;
			}
			if(current.parent.left && current.parent.left.value === value) {
				current.parent.left = null;
			}
			current.parent = null;
			nodes.forEach(node => this.insert(node.value)});
		}
		this.size--;
	},
	maxNode() {
		if(this.isEmpty()) {
			throw 'Empty';
		}
		let current = this.root;
		while(current.right) {
			current = current.right;
		}
		return current;
	},
	minNode() {
		if(this.isEmpty()) {
			throw 'Empty';
		}
		var current = this.root;
		while(current.left) {
			current = current.left;
		}
		return current;		
	},
	search(value) {
		if(this.isEmpty()) {
			return null;
		}
		let current = this.root;
		while(true) {
			if(value == current.value)  {
				break;
			}
			else if(value > current.value) {
				if(!current.right) {
					current = null;
					break;
				}
				current = current.right;
			}
			else {
				if(!current.left) {
					current = null;
					break;
				}
				current = current.left;
			}
		}
		return current;				
	},
	getTreeList() {
		if(this.isEmpty()) {
			return [];
		}
		return _createTreeList(this.root);
	}
}

Array.prototype.extend = function(arr) {
	arr.forEach(item => this.push(item));
}

function _createTreeList(node) {
	var list = [];
	list.push(node);
	if(node.left) {
		list.extend(_createTreeList(node.left));
	}
	if(node.right) {
		list.extend(_createTreeList(node.right));
	}
	return list;
}

})(window || module.exports);