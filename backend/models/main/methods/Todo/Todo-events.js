
model.Todo.events.init = function(event) {
 this.done = false;
};
//model.Todo.events.restrict = function(event) {
//	return ds.Todo.query("userID == 1", directory.currentUser.ID);
	// TODO : add the selection on the attributed user or the "public" todo
//};
//model.Todo.events.save = function(event) {
//	debugger;
//	this.userID = directory.currentUser.ID;
//};