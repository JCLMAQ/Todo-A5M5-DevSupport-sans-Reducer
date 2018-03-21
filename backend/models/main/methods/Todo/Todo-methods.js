
(model.Todo.entityMethods.removeTodo = function() {
	ds.TodoUser.query('todo.ID === :1', this.getKey()).remove();
  this.remove();
}).scope = 'public';
