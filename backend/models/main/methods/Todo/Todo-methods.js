
(model.Todo.entityMethods.removeTodo = function() {
	ds.User_Todo.query('todo.ID === :1', this.getKey()).remove();
  this.remove();
}).scope = 'public';
