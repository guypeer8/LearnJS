

(function(exports) {

exports.MaxHeap = function() {
	this.heap = [];
	this.size = 0;
}

exports.MaxHeap.prototype = {
	isEmpty() {
		return this.size == 0;
	},
	heapSize() {
		return this.size;
	},
	getMax() {
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
	deleteMax() {
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
	let largest = i;
	if(left<heap.length && heap[left]>heap[i]) {
		largest = left;
	}	
	if(right<heap.length && heap[right]>heap[largest]) {
		largest = right;
	}
	if(largest !== i) {
		let temp = heap[i];
		heap[i] = heap[largest];
		heap[largest] = temp;
		_heapify(heap,largest);
	}
}

})(window || module.exports);