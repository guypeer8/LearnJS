{

// DOM Elements
const todo = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filter_all = document.getElementById('all');
const filter_active = document.getElementById('active');
const filter_completed = document.getElementById('completed');
const left = document.getElementById('todos-left');
const clear = document.getElementById('clear-completed');

let currentFilter = 'all'; // Visibility Filter
const ENTER_CODE = 13; // Enter Key Code

const slice = Array.prototype.slice; // slice array-like object

// Element Creator Private Function
const createElement = ({ name, children, attrs, listeners }) => {
	let element = document.createElement(name);
	if(children && children.length) {
		children.forEach(child => element.appendChild(child));
	}
	for(let attr in attrs) {
		element.setAttribute(attr, attrs[attr]);
	}
	for(let l in listeners) {
		element.addEventListener(l, listeners[l]);
	}
	return element;
}


// Model
const Todos = {

	init() {
		this.initTodoInputTextListener();
		this.initFiltersListeners();
		this.initClearCompletedListener();
		this.computeLeft();
	},

	initTodoInputTextListener() {
		todo.addEventListener('keypress', (e) => {
			if(e.keyCode === ENTER_CODE) {
				this.renderTodo(e.target.value);
				this.cleanTodo();
			}
		});
	},

	initFiltersListeners() {
		filter_all.addEventListener('click', () => this.setVisibilityFilter('all'));
		filter_active.addEventListener('click', () => this.setVisibilityFilter('active'));
		filter_completed.addEventListener('click', () => this.setVisibilityFilter('completed'));
		this.updateFilterStyle();
	},

	initClearCompletedListener() {
		clear.addEventListener('click', this.clearCompleted);
	},

	setVisibilityFilter(filter) {
		currentFilter = filter;
		this.updateUI();
	},

	updateUI() {
		this.updateFilterStyle();
		this.updateVisibility();
	},

	updateFilterStyle() {
		[filter_all, filter_active, filter_completed].forEach(f => f.style.fontStyle = 'normal');
		currentFilter === 'all' ? 
			filter_all.style.fontStyle = 'italic' : 
			(currentFilter === 'active' ? 
				filter_active.style.fontStyle = 'italic' : 
				filter_completed.style.fontStyle = 'italic'
			);
	},

	updateVisibility() {
		let l = list.querySelectorAll('div');
		if(currentFilter === 'all') {
			for(let i=0; i<l.length; i++) {
				l[i].style.display = 'block';
			}
		}
		else if(currentFilter === 'active') {
			for(let i=0; i<l.length; i++) {
				let el = l[i];
				let isChecked = el.querySelector('input[type="checkbox"]').checked;
				el.style.display = isChecked ? 'none': 'block';
			}			
		}
		else { // currentFilter = 'completed'
			for(let i=0; i<l.length; i++) {
				let el = l[i];
				let isChecked = el.querySelector('input[type="checkbox"]').checked;
				el.style.display = isChecked ? 'block': 'none';
			}			
		}
	},

	clearCompleted() {
		let l = list.querySelectorAll('div');
		for(let i=0; i<l.length; i++) {
			let el = l[i];
			let isChecked = el.querySelector('input[type="checkbox"]').checked;
			if(isChecked)
				el.remove();
		}				
	},

	computeLeft() {
		let l = list.querySelectorAll('div input[type="checkbox"]');
		left.innerHTML = slice.call(l).filter(el => !el.checked).length;	
	},

	renderTodo(text) {
		if(!text || !text.trim()) 
			return;
		
		let input = createElement({
			name: 'input', 
			attrs: { type: 'checkbox' },
			listeners: {
				click: (e) => {
					let el = e.target;
					let parent = el.parentNode;
					let isChecked = el.checked;
					if(currentFilter === 'all')
						parent.style.display = 'block';
					else if(currentFilter === 'active')
						parent.style.display = isChecked ? 'none' : 'block';
					else // currentFilter = 'completed'
						parent.style.display = isChecked ? 'block' : 'none';
					Todos.computeLeft();
				}
			}
		});

		let txt = createElement({
			name: 'span', 
			children: [document.createTextNode(text)]
		});

		let remove = createElement({
			name: 'button', 
			children: [document.createTextNode('x')],
			listeners: {
				click: (e) => {
					let parent = e.target.parentNode;
					let isChecked = parent.firstChild.checked;
					parent.remove();
					if(!isChecked)
						Todos.computeLeft();
				}
			}
		});

		let div = createElement({
			name: 'div', 
			children: [input, txt, remove]
		});

		if(currentFilter === 'completed')
			div.style.display = 'none';
		list.appendChild(div);
		Todos.computeLeft();
	},

	cleanTodo() {
		todo.value = '';
	}

}

Todos.init(); // Init Listeners

}