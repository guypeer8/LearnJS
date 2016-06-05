{

const app = angular.module('Todo-Angular', []);

app.filter('capitalize', function() {
	return val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
});

app.controller('todoController', function($scope) {
	$scope.newTodo = '';
	$scope.todos = [];
	$scope.visibility = 'all';
	$scope.visibilityFilters = ['all', 'active', 'completed'];

	$scope.setVisibility = (filter) => {
		$scope.visibility = filter;
	}

	$scope.addTodo = (e) => {
		if(e.keyCode == 13) {
			let text = $scope.newTodo;
			if(!text || !text.trim()) {
				return;
			}
			$scope.todos.push({ text, checked: false });
			$scope.newTodo = '';
		}
	}

	$scope.removeTodo = (index) => {
		$scope.todos.splice(index,1);
	}

	$scope.clearCompleted = () => {
		$scope.todos = $scope.todos.filter(todo => !todo.checked);
	}

	$scope.shouldShow = (index) => {
		let show = $scope.visibility;
		let todo = $scope.todos[index];
		return show == 'all' ? true : (show == 'active' ? !todo.checked : todo.checked);
	}

	$scope.todosLeft = () => {
		return $scope.todos.filter(todo => !todo.checked).length;
	}

});

}