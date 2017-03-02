function User(newName){
	this.name = newName;
}
User.prototype.sayHello = function(){
	console.log('Hello, ' + this.name);
}
exports.User = User;
