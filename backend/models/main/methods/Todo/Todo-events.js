
model.Todo.events.init = function(event) {
 this.done = false;
};
model.Todo.events.restrict = function(event) {
	return ds.Todo.query("userID == 1", directory.currentUser.ID);
};
model.Todo.events.save = function(event) {
	this.userID = directory.current.User.ID;
};