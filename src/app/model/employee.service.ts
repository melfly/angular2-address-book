import { Employee } from './employee.model';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeService {

  addressBook: Employee[];

  constructor() {
    this.addressBook = [
      {firstName: 'Gary', lastName: 'Zhou', department: 'IT', phone: '0412023026'},
      {firstName: 'Allan', lastName: 'Smith', department: 'IT', phone: '0412345678'},
      {firstName: 'Steve', lastName: 'Gwyn', department: 'HR', phone: '0412345678'},
      {firstName: 'Kim', lastName: 'Chung', department: 'HR', phone: ''},
      {firstName: 'Thomas', lastName: 'Muller', department: 'ACCOUNTING', phone: '0411222333'},
      {firstName: 'Les', lastName: 'Huntley', department: 'PMO', phone: '0422333444'},
      {firstName: 'Paul', lastName: 'Collins', department: 'IT', phone: ''}
    ];
  }

  addEmployee = function (newEmployee: Employee) {
    this.addressBook.push(newEmployee);
  };

  deleteEmployee = function (empToDelete: Employee) {
    // Assume combination of first name, last name, department and phone is unique.
    // Otherwise we can generate and maintain a unique id upon adding new Employee
    let index = this.addressBook.indexOf(empToDelete);
    if (index >= 0) {
      this.addressBook.splice(index, 1);
    }
  };

  getAllEmployees = function () {
    return this.searchEmployees('', '');
  };

  /* Search employees by name and department.
   * Return a new collection, not the original data collection.
   * Return everything if both name and department are not defined or empty strings */
  searchEmployees = function (name: string, department: string = '') {
    name = name ? name.replace(/\s+/g, '') : '';
    department = department ? department : '';

    return this.addressBook.filter(item => {
        return (name ? item.firstName.concat(item.lastName).toLowerCase().
            indexOf(name.toLowerCase()) >= 0 : true) && (department ? item.department.toLowerCase().
            indexOf(department.toLowerCase()) >= 0 : true);
    });
  };
}
