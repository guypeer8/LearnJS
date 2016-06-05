(function() {

// Capitalize
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

// Todo-List Reuseable Component
ko.components.register('todo-list', {
	viewModel: function(params) {
		let todos = params && params.todos;
		let visibility = params && params.visibility;
		if(!visibility) {
			this.filteredTodos = todos;
		}
		else {
			this.filteredTodos = ko.pureComputed(() => {
				let filter = ko.unwrap(visibility);
				let todoList = ko.unwrap(todos);
				return filter === 'all' ? 
						todoList : 
					  	(filter === 'active' ? 
					  		todoList.filter(todo => !todo.completed()) :
					  		todoList.filter(todo => todo.completed())
					  	); 
			});
		}
	},
	template: 
		'<div data-bind="foreach:filteredTodos">\
			<div>\
				<input type="checkbox" data-bind="checked:completed" />\
				<span data-bind="text:text"></span>\
				<button data-bind="click:removeTodo">X</button>\
			</div>\
		</div>'
});

// Todo Class
class Todo {
	constructor(text) {
		this.text = text;
		this.completed = ko.observable(false);
	}

	removeTodo() {
		Todos.todos.remove(this);
	}
}

// Todos View Model
const Todos = {
	newTodo: ko.observable(''),
	todos: ko.observableArray([]),
	visibilityFilters: ['all', 'active', 'completed'],
	visibility: ko.observable('all'),

	addTodo(_,e) {
		if(e.keyCode == 13) {
			let txt = this.newTodo();
			if(!txt || !txt.trim())
				return;
			this.todos.push(new Todo(txt));
			this.newTodo('');
		}
	},

	clearCompleted() {
		this.todos(this.todos().filter(todo => !todo.completed()));
	},

	open() {
		ko.applyBindings(this, document.getElementById('container'));
	}
}

Todos.todosLeft = ko.pureComputed(() => {
	return Todos.todos().filter(todo => !todo.completed()).length;
});

Todos.open();

})();