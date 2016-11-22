import { Component } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../model/employee.service';

@Component({
  selector: 'address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent {
  name: string = '';
  department: string = '';
  employees: Employee[];
  sortingState: string;

  constructor(private employeeService: EmployeeService) {
    this.employees = this.employeeService.getAllEmployees();
  }

  clear = function () {
    this.name = '';
    this.department = '';
    this.sortingState = null;
    this.employees = this.employeeService.getAllEmployees();
  };

  sortByLastName = function () {
    if (this.sortingState && this.sortingState === 'A->Z') {
      this.sortingState = 'Z->A';
    } else {
      this.sortingState = 'A->Z';
    }

    this.employees.sort((a, b) => {
      let nameA = a.lastName.toUpperCase();
      let nameB = b.lastName.toUpperCase();

      if (this.sortingState === 'A->Z') {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      } else {
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
      }
    });
  };

  delete = function (empToDelete: Employee) {
    this.employeeService.deleteEmployee(empToDelete);
    this.search();
  };

  search = function (event: any) {
    this.employees = this.employeeService.searchEmployees(this.name, this.department);
    // reset soring state after every search
    this.sortingState = null;
  };
}
