
{

const app = {};

let todoId = 0;
let visibilityFilter = 'all';

/*************
  Todo Model
*************/
app.TodoModel = Backbone.Model.extend({

	defaults: {
		text: '',
		checked: false,
		shouldShow: true
	},

	initialize() {
		this.set('id', todoId++);
	},

	toggle() {
		this.set({ checked : !this.get('checked') });
	},

	setVisibility(shouldShow) {
		this.set({ shouldShow });
	}

});

/******************
  Todo Collection
******************/
app.TodoCollection = Backbone.Collection.extend({

	model: app.TodoModel,

	active() {
		return this.where({ checked : false });
	},

	completed() {
		return this.where({ checked : true });
	},

	todosLeft() {
		return this.active().length;
	},

	setActiveTodosVisibility(shouldShow) {
		this.active().forEach(todo => todo.setVisibility(shouldShow));
	},

	setCompletedTodosVisibility(shouldShow) {
		this.completed().forEach(todo => todo.setVisibility(shouldShow));
	},

	filterVisibility() {
		if(visibilityFilter === 'all') {
			this.models.forEach(todo => todo.setVisibility(true));
		}
		else if(visibilityFilter === 'active') {
			this.setActiveTodosVisibility(true);
			this.setCompletedTodosVisibility(false);
		}
		else { // filter = 'completed'
			this.setActiveTodosVisibility(false);
			this.setCompletedTodosVisibility(true);
		}
	}

});

/*************
  Todo View
*************/
app.TodoView = Backbone.View.extend({

	tagName: 'div',

	template: _.template($('#todo-template').html()),

	events: {
		'click input[type="checkbox"]': 'toggleTodo'
	},

	initialize() {
		this.model.on('change', this.render, this);
	},

	toggleTodo() {
		this.model.toggle();
	},

	render() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});

/*************
  Todos View
*************/
app.TodosView = Backbone.View.extend({

	el: '#todo-list',

	initialize() {
		this.todos = this.collection.models;
		this.render();
	},

	render() {
		this.$el.empty();
		this.todos.forEach(model => {
			let todoView = new app.TodoView({ model });
			this.$el.append(todoView.render().el);
		});
	}

});

/*************
   App View
*************/
app.AppView = Backbone.View.extend({

	el: '#container',

	initialize() {
		this.todoInput = $('#todo-input');
		this.todosLeft = $('#todos-left');
		this.filterAll = $('#filters #all');
		this.filterActive = $('#filters #active');
		this.filterCompleted = $('#filters #completed');

		this.todosList = new app.TodoCollection();
		this.todosList.on('add', this.render, this); // rerender on add to collection
		this.todosList.on('change', this.render, this); // rerender when a model changes
	},

	events: {
		'keyup #todo-input': 'addTodo',
		'click #todo-list button': 'removeTodo',
		'click #clear-completed': 'clearCompleted',
		'click #filters #all': 'showAll',
		'click #filters #active': 'showActive',
		'click #filters #completed': 'showCompleted',
	},

	addTodo(e) {
		if(e.keyCode !== 13) {
			return;
		}
		let text = e.target.value;
		if(!text || !text.trim()) {
			return;
		}
		let todo = new app.TodoModel({ text });
		this.todosList.add(todo);
		e.target.value = '';
	},

	removeTodo(e) {
		let id = e.target.parentNode.getAttribute('data-id');
		this.todosList.remove(id);
		this.render();
	},

	clearCompleted() {
		this.todosList.remove(this.todosList.completed());
		this.render();
	},

	showAll(e) {
		this.showByFilter(e,'all');
	},

	showActive(e) {
		this.showByFilter(e,'active');
	},

	showCompleted(e) {
		this.showByFilter(e,'completed');
	},

	showByFilter(e, filter) {
		visibilityFilter = filter;
		this.removeClass();
		$(e.target).addClass('italic');
		this.render();
	},

	removeClass() {
		[this.filterAll, this.filterActive, this.filterCompleted].forEach(filter => filter.removeClass('italic'));
	},

	render() {
		this.todosLeft.text(this.todosList.todosLeft());
		this.todosList.filterVisibility();
		new app.TodosView({ collection: this.todosList });
	}

});

new app.AppView();

}