(function() {

// DOM Elements
let $todo = $('#todo-input');
let $list = $('#todo-list');
let $filter_all = $('#all');
let $filter_active = $('#active');
let $filter_completed = $('#completed');
let $left = $('#todos-left');
let $clear = $('#clear-completed');

let currentFilter = 'all'; // Visibility Filter
const ENTER_CODE = 13; // Enter Key Code


// Model
const Todos = {

	init() {
		this.initTodoInputTextListener();
		this.initFiltersListeners();
		this.initClearCompletedListener();
		this.computeLeft();
	},

	initTodoInputTextListener() {
		$todo.on('keypress', (e) => {
			if(e.keyCode === ENTER_CODE) {
				this.renderTodo($(e.target).val());
				this.cleanTodo();
			}
		});
	},

	initFiltersListeners() {
		$filter_all.on('click', () => this.setVisibilityFilter('all'));
		$filter_active.on('click', () => this.setVisibilityFilter('active'));
		$filter_completed.on('click', () => this.setVisibilityFilter('completed'));
		this.updateFilterStyle();
	},

	initClearCompletedListener() {
		$clear.on('click', this.clearCompleted);
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
		$([$filter_all, $filter_active, $filter_completed]).each((i,f) => f.css('font-style','normal'));
		currentFilter === 'all' ? 
			$filter_all.css('font-style','italic') : 
			(currentFilter === 'active' ? 
				$filter_active.css('font-style','italic') : 
				$filter_completed.css('font-style','italic')
			);
	},

	updateVisibility() {
		if(currentFilter === 'all') {
			$list.children().each((i,el) => $(el).css('display','block'));
		}
		else if(currentFilter === 'active') {
			$list.children().each((i,el) => {
				let isChecked = $(el).find('input[type="checkbox"]').prop('checked');
				$(el).css('display', isChecked ? 'none' : 'block');
			});	
		}
		else { // currentFilter = 'completed'
			$list.children().each((i,el) => {
				let isChecked = $(el).find('input[type="checkbox"]').prop('checked');
				$(el).css('display', isChecked ? 'block' : 'none');
			});			
		}
	},

	clearCompleted() {
		$list.children().each((i,el) => {
			let isChecked = $(el).find('input[type="checkbox"]').prop('checked');
			if(isChecked)
				$(el).remove();
		});
	},

	computeLeft() {
		$left.html($.grep($list.find('input[type="checkbox"]'), (el,i) => !$(el).prop('checked')).length);	
	},

	renderTodo(text) {
		if(!text || !text.trim()) 
			return;
		
		let $input = $('<input>')
					.attr({type:'checkbox'})
					.click((e) => {
						let $el = $(e.target);
						let $parent = $el.parent();
						let isChecked = $el.prop('checked');
						if(currentFilter === 'all')
							$parent.css('display','block');
						else if(currentFilter === 'active')
							$parent.css('display', isChecked ? 'none' : 'block');
						else // currentFilter = 'completed'
							$parent.css('display', isChecked ? 'block' : 'none');
						Todos.computeLeft();
					});

		let $txt = $('<span>').text(text);

		let $remove = $('<button>')
						.text('x')
						.click((e) => {
							let $el = $(e.target);
							let $parent = $el.parent();
							let isChecked = $parent.children().first().prop('checked');
							$parent.remove();
							if(!isChecked)
								Todos.computeLeft();
						});

		let $div = $('<div>').append($input, $txt, $remove);

		if(currentFilter === 'completed')
			$div.css('display','none');
		$list.append($div);
		Todos.computeLeft();
	},

	cleanTodo() {
		$todo.val('');
	}

}

Todos.init(); // Init Listeners

})();