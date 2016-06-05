(function() {

// Todo Class
class Todo {
	constructor(text) {
		this.text = text;
		this.checked = false;
	}
}

// Vue Model
const Todos = new Vue({
	el: '#container',

	data: {
		newTodo: '',
		visibility: 'all',
		todos: [],
		visibilityfilters: ['all', 'active', 'completed']
	},

	computed: {
		todosLeft() {
			return this.todos.filter(todo => !todo.checked).length;
		},
		filteredTodos() {
			let visibility = this.visibility;
			let todos = this.todos;
			return visibility == 'all' ? 
					todos : 
					(visibility == 'active' ?
					 todos.filter(todo => !todo.checked) :
					 todos.filter(todo => todo.checked)
					);
		}
	},

	methods: {
		addTodo() {
			let txt = this.newTodo;
			if(!txt || !txt.trim())
				return;
			this.todos.push(new Todo(txt));
			this.newTodo = '';
		},
		removeTodo(todo) {
			this.todos.$remove(todo);
		},
		clearCompleted() {
			this.todos = this.todos.filter(todo => !todo.checked);
		}
	}
});

})();