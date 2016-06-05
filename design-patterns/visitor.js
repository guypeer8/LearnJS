// Visitor lets you define a new operation without changing 
// the class of the elements on which it operates.


// Define 'Employee' Class
function Employee(name, salary, vacation) {
	this.name = name;
	this.salary = salary;
	this.vacation = vacation;
}
Employee.prototype = {
	getName() {
		return this.name;
	},
	getSalary() {
		return this.salary;
	},
	setSalary(newSalary) {
		this.salary = newSalary;
	},
	getVacation() {
		return this.vacation;
	},
	setVacation(vacation_days) {
		this.vacation = vacation_days;
	},		

	// Let visitor apply its functionallity
	// on the instance, by passing the instance
	// object to the 'visit' function.
	accept(visitor) {
		visitor.visit(this);
	}
}

// Define Visitors
function RaiseSalary() {} // Salaray raise visitor
RaiseSalary.prototype.visit = function(employee) {
	employee.setSalary(employee.getSalary() * 1.2);
}
function AddVacationDays() {} // Vacation days addition visitor
AddVacationDays.prototype.visit = function(employee) {
	employee.setVacation(employee.getVacation() + 3);
}


/****************
  Usage Example
 ***************/
 // data logger
 function logData(employees, msg) {
 	console.log(msg);
 	console.log('--------------------------');
 	employees.forEach(employee => {
		console.log('Name: ' + employee.getName());
		console.log('Salary: ' + employee.getSalary());
		console.log('Vacation Days: ' + employee.getVacation());
		console.log('---');
	});
	console.log('\n\n\n');
 }
 // set employees
var employees = [
	new Employee('Guy', 17000, 10),
	new Employee('Dor', 8000, 7),
	new Employee('Josh', 11000, 12),
]; 
// initialize visitors
var salaryVisitor = new RaiseSalary();
var vacationVisitor = new AddVacationDays();

// log data before accepting visitors
logData(employees, 'Before accepting visitors:');

// apply visitors functionallity
employees.forEach(employee => {
	employee.accept(salaryVisitor);
	employee.accept(vacationVisitor);
});

// log data to see the changes after accepting visitors
logData(employees, 'After accepting visitors:');