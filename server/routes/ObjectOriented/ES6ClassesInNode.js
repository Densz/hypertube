"use strict";
/* 
	x = 3.14; // This will cause an error because x is not declared
	// With strict mode, you can not, for example, use undeclared variables.
*/ 

class User {
	constructor(username, email, password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	static countUsers() {
		console.log('There are 50 users');
	}

	register() {
		console.log(this.username + ' is registered');
	}

}

// let bob = new User('Bob', 'bob@email.com', '12345');
// bob.register();

// // No need to instanciate new User
// User.countUsers();

class Member extends User {
	constructor(username, email, password, memberPackage) {
		// Super calls the parent constructor
		super(username, email, password);
		this.package = memberPackage;
	}

	static countPackage() {
		console.log('Count of the packages = 50');
	}

	getPackage() {
		console.log(this.username + ' is subscribed to the ' + this.package + ' package')
	}
}

let mike = new Member('mike', 'email', 'password', 'standard');
mike.getPackage();
mike.register();
// Member can call static method from User
Member.countUsers();

// User
/*
	User.countPackage(); // Error output
*/ 