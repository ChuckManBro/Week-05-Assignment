/*
WEEK 5 CODING ASSIGNMENT
Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
-- Use at least one array.
-- Use at least two classes.
-- Your menu should have the options to create, view, and delete elements
*/

let departmentList = [];
let selectedDepartment = null;
let topMenuLength = 1;
let departmentMenuLength = 1;

class Department {
	constructor(newDepartmentName) {
		this.name = newDepartmentName;
		this.personList = [];
	}
}

class Person {
	constructor(newName, newTitle, newEmail) {
		this.name = newName;
		this.title = newTitle;
		this.email = newEmail;
	}
	displayProfile() {
		alert(`PERSON PROFILE
===============
Name: ${this.name}
Title: ${this.title}
Email: ${this.email}`);
	}
}

function createPerson() {
	let nameEntry = prompt('Enter new person name:');
	let titleEntry = prompt('Enter title:');
	let emailEntry = prompt('Enter email:');
	departmentList[selectedDepartment].personList.push(new Person(nameEntry, titleEntry, emailEntry));
}

function createDepartment() {
	let nameEntry = prompt('Enter new department name:');
	departmentList.push(new Department(nameEntry));
}

function deleteDepartment() {
	let deleteSelection = prompt(createDeleteDepartmentList());
	if (deleteSelection > 0) {
		departmentList.splice(deleteSelection - 1, 1);
	}
}

function createDeleteDepartmentList() {
	let display = 'ENTER OPTION TO DELETE:\n===============\n0) Cancel';
	for (let i = 0; i < departmentList.length; i++) {
		display += '\n' + (i + 1) + ') ' + departmentList[i].name;
	}
	return display;
}

function topMenu() {
	let topMenuSelection = 0;
	while (topMenuSelection !== 'q') {
		topMenuSelection = prompt(createTopMenu());
		if (topMenuSelection > 0 && topMenuSelection <= topMenuLength) {
			if (topMenuSelection == 1) {
				createDepartment();
			} else if (topMenuSelection == 2) {
				deleteDepartment();
			} else {
				selectedDepartment = topMenuSelection - 3;
				departmentMenu(selectedDepartment);
			}
		} else if (topMenuSelection != 'q') {
			topMenuSelection = 0;
		}
	}
	alert('Goodbye');
}

function createTopMenu() {
	let display = 'ENTER OPTION:\n===============\n1) Add New Department';
	if (departmentList.length > 0) {
		topMenuLength = 2 + departmentList.length;
		display += '\n2) Delete Department';
		for (let i = 0; i < departmentList.length; i++) {
			display += '\n' + (i + 3) + ') View ' + departmentList[i].name;
		}
	} else {
		topMenuLength = 1;
	}
	return display;
}

function departmentMenu(selectedDepartment) {
	let departmentMenuSelection = prompt(createDepartmentMenu());
	if (departmentMenuSelection > 0 && departmentMenuSelection <= departmentMenuLength) {
		if (departmentMenuSelection == 1) {
			createPerson();
		} else if (departmentMenuSelection == 2) {
			deletePerson();
		} else {
			departmentList[selectedDepartment].personList[departmentMenuSelection - 3].displayProfile();
		}
	}
}

function deletePerson() {
	let deleteSelection = prompt(createDeletePersonList());
	departmentList[selectedDepartment].personList.splice(deleteSelection - 1, 1);
}

function createDeletePersonList() {
	let display = 'ENTER OPTION TO DELETE:\n===============\n0) Cancel';
	for (let i = 0; i < departmentList[selectedDepartment].personList.length; i++) {
		display += '\n' + (i + 1) + ') ' + departmentList[selectedDepartment].personList[i].name;
	}
	return display;
}

function createDepartmentMenu() {
	let display = 'ENTER OPTION:\n===============\n1) Add New Person';
	if (departmentList[selectedDepartment].personList.length !== 0) {
		display += '\n2) Delete Person';
		for (let i = 0; i < departmentList[selectedDepartment].personList.length; i++) {
			display +=
				'\n' +
				(i + 3) +
				') View ' +
				departmentList[selectedDepartment].personList[i].name +
				' profile';
		}
		departmentMenuLength = departmentList[selectedDepartment].personList.length + 2;
	} else {
		departmentMenuLength = 1;
	}
	return display;
}

topMenu();
