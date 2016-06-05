(function() {
/***************
  Define Model
 ***************/
let TodoModel = Skeleton.Model({
	defaults: {
		text: '',
		isCompleted: false
	}
});
/**************
  Define List
 **************/
let TodosList = Skeleton.List({
	model: TodoModel,
	element: 'todo-list',
	template: {templateId: 'todo-template'}
});
/*************
  Define Form
 *************/
Skeleton.form({
	name: 'todo-form',
	inputs: {
		text: 'todo-input'
	},
	submit: {
		input: 'text',
		keyCode: 13 // Enter Key Code
	},
	onSubmit(e) {
		let text = this.text.value;
		if(!text) {
			return;
		}
		TodosList.push({ text }); // push and render todo
		Skeleton.form.clear(this.name); // clear form input
	}
});
/******************
  Define Functions
 ******************/
// Remove Todo
window.removeTodo = (index) => {
	TodosList.remove(index);
}

// Toggle Todo
window.toggleTodo = (index) => {
	let isCompleted = !TodosList.get(index).isCompleted;
	TodosList.edit(index, { isCompleted }); // Edit todo
}

// Filter Todos
window.filterTodos = (type) => {
	if(type === 'all') {
		TodosList.filter(todo => true);
		styleFilter('all');
	}
	else if(type === 'active') {
		TodosList.filter(todo => !todo.isCompleted);
		styleFilter('active');
	}
	else { // type = 'completed'
		TodosList.filter(todo => todo.isCompleted);
		styleFilter('completed');
	}
	Skeleton.storage.save({ filter: type });
}

// Clear Completed
window.clearCompleted = () => {
	TodosList.forEach(todo => {
		if(todo.isCompleted) {
			window.removeTodo(todo.index);
		}
	});
}

// Remove All Todos
window.removeAll = () => {
	TodosList.removeAll();
}

// Update Size
var todosSize = document.getElementById('todos-size');
window.updateSize = () => {
	todosSize.textContent = TodosList.models().filter(todo => !todo.isCompleted).length;
} 

// Style on choosing filter
var filters = {
	all: document.getElementById('filter-all'),
	active: document.getElementById('filter-active'),
	completed: document.getElementById('filter-completed')
}

function styleFilter(filter) {
	Object.keys(filters).forEach(fltr => {
		if(fltr === filter) {
			return filters[fltr].style.fontStyle = 'italic';
		}
		return filters[fltr].style.fontStyle = 'normal';
	});
}
/**********************
  Define Subscriptions
 **********************/
TodosList.subscribe(['push','edit'], () => {
	let filter = Skeleton.storage.fetch('filter') || 'all';
	if(filter) {
		window.filterTodos(filter);
	}
});

TodosList.subscribe(['push','remove','edit','removeAll'], () => {
	updateSize();
	Skeleton.storage.save({ 
		models: TodosList.models() 
	});
});

TodosList.subscribe('pushAll', updateSize);
/************************
  Run On First Page Load
 ************************/
TodosList.pushAll(Skeleton.storage.fetch('models') || []);
window.filterTodos(Skeleton.storage.fetch('filter') || 'all');
})();