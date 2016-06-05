

(function(exports) {

exports.MinHeap = function() {
	this.heap = [];
	this.size = 0;
}

exports.MinHeap.prototype = {
	isEmpty() {
		return this.size == 0;
	},
	heapSize() {
		return this.size;
	},
	getMin() {
		if(this.isEmpty()) {
			throw 'Empty';
		}
		return this.heap[0];
	},
	insert(value) {
		this.heap.push(value);
		this.size++;
		_buildHeap(this.heap);
	},
	deleteMin() {
		if(this.isEmpty()) {
			throw 'Empty';
		}
		this.heap.shift();
		this.size--;
		if(!this.isEmpty())
			_buildHeap(this.heap);
	}
}

function _buildHeap(arr) {
	for(let i=Math.floor(arr.length/2); i>=0; i--) {
		_heapify(arr,i);
	}
}

function _heapify(heap,i) {
	let left = 2*i + 1;
	let right = 2*i + 2;
	let smallest = i;
	if(left<heap.length && heap[left]<heap[i]) {
		smallest = left;
	}
	if(right<heap.length && heap[right]<heap[smallest]) {
		smallest = right;
	}
	if(smallest !== i) {
		let temp = heap[i];
		heap[i] = heap[smallest];
		heap[smallest] = temp;
		_heapify(heap,smallest);
	}
}

})(window || module.exports);