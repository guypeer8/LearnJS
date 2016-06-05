// Mediator pattern is used to reduce communication 
// complexity between multiple objects or classes.
function Mediator() {
	let users = [];

	return {
		addUser(user) {
			users.push(user);
		},
		// Message sending business logic
		publishMessage(msg, receiver) {
			if(receiver) {
				receiver.messages.push(msg);
			}
			else {
				users.forEach(user => user.messages.push(msg));				
			}
		}
	}
}

// Usage Example
const mediator = Mediator(); // Initialize mediator
// Define user class
class User {
	constructor(name) {
		this.name = name;
		this.messages = [];
		mediator.addUser(this);
	}
	sendMessage (msg, receiver) {
		msg = '[' + this.name + ']: ' + msg;
		mediator.publishMessage(msg,receiver);
	}
}

// Initialize users
var u1 = new User('Donald');
var u2 = new User('Peter');
var u3 = new User('Anna'); 
// Message sending
u1.sendMessage('Hi, anybody here?');
u2.sendMessage('Hi Donald, nice to meet you.', u1);
u3.sendMessage('Hi Guys!');