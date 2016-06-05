// Perhaps the most used pattern in javascript web development.
// MVC(Model-View-Controller) seperates data model representation 
// from data visuallization.
// The glue that connects the model changes and view updates
// is the contoller.


// Define Account Model
class AccountModel {

	constructor(owner, balance) {
		this.owner = owner;
		this.balance = balance;
	}

	getOwner() {
		return this.owner;
	}

	getBalance() {
		return this.balance;
	}

}

// Define Account View
class AccountView {
	showAccountDetails(owner, balance) {
		console.log('Account owner: ' + owner);
		console.log('Account balance: ' + balance);
	}
}


// Define Account Controller
function AccountController(model, view) {
	this.accountView = function() {
		view.showAccountDetails(model.getOwner(), model.getBalance());
	}
	this.deposit = function(amount) {
		this.setBalance(model.getBalance() + amount);
		this.accountView();
	}
	this.discount = function(amount) {
		this.setBalance(model.getBalance() - amount);
		this.accountView();
	}
	this.setOwner = function(newOwner) {
		model.owner = newOwner;
		this.accountView();
	}
	this.setBalance = function(newBalance) {
		model.balance = newBalance;
		this.accountView();
	}
}

// Usage Example
const controller = new AccountController(new AccountModel('Ben', 15000), new AccountView());
controller.accountView();
// Account owner: Ben
// Account balance: 15000
controller.deposit(500);
// Account owner: Ben
// Account balance: 15500
controller.discount(120);
// Account owner: Ben
// Account balance: 15380
controller.setOwner('Bob');
// Account owner: Bob
// Account balance: 15380
controller.setBalance(0);
// Account owner: Bob
// Account balance: 0
controller.deposit(1000000);
// Account owner: Bob
// Account balance: 1000000