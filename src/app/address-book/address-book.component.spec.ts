import { TestBed, async } from '@angular/core/testing';
import { AddressBookComponent } from './address-book.component';
import { EmployeeService } from '../model/employee.service';
import { FormsModule } from '@angular/forms';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddressBookComponent', () => {
  let fixture, comp;

  beforeEach(() => {
    let employees = [{firstName: 'Allan', lastName: 'Smith', department: 'IT', phone: '0412345678'},
      {firstName: 'Steve', lastName: 'Gwyn', department: 'HR', phone: '0412345678'},
      {firstName: 'Les', lastName: 'Huntley', department: 'IT', phone: '0422333444'}];

    TestBed.configureTestingModule({
      declarations: [AddressBookComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            getAllEmployees: function () {
              return employees;
            },
            deleteEmployee: function () {
            },
            searchEmployees: function (name: string, department: string) {
            }
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(AddressBookComponent);
    comp = fixture.componentInstance;

  });

  it('should be initialized with all employees', (() => {
    expect(comp.employees.length).toEqual(3);
  }));

  describe('clear', () => {
    it('should clear current searching criteria, sortingState and call getAllEmployees', (() => {
      let employeeService = TestBed.get(EmployeeService);
      spyOn(employeeService, 'getAllEmployees');
      comp.name = 'Allan';
      comp.department = 'Smith';
      comp.sortingState = 'A->Z';
      comp.clear();
      expect(comp.name).toEqual('');
      expect(comp.department).toEqual('');
      expect(comp.sortingState).toEqual(null);
      expect(employeeService.getAllEmployees).toHaveBeenCalled();
    }));
  });

  describe('sortByLastName', () => {
    it('should sort in asc order if sortState is not assigned yet', (() => {
      comp.sortByLastName();
      expect(comp.sortingState).toEqual('A->Z');
      expect(comp.employees[0].lastName).toEqual('Gwyn');
      expect(comp.employees[1].lastName).toEqual('Huntley');
      expect(comp.employees[2].lastName).toEqual('Smith');
    }));

    it('should sort in asc order if sortState is Z->A', (() => {
      comp.sortingState = 'Z->A';
      comp.sortByLastName();
      expect(comp.sortingState).toEqual('A->Z');
      expect(comp.employees[0].lastName).toEqual('Gwyn');
      expect(comp.employees[1].lastName).toEqual('Huntley');
      expect(comp.employees[2].lastName).toEqual('Smith');
    }));

    it('should sort in asc order if sortState is A->Z', (() => {
      comp.sortingState = 'A->Z';
      comp.sortByLastName();
      expect(comp.sortingState).toEqual('Z->A');
      expect(comp.employees[0].lastName).toEqual('Smith');
      expect(comp.employees[1].lastName).toEqual('Huntley');
      expect(comp.employees[2].lastName).toEqual('Gwyn');
    }));
  });

  describe('delete', () => {
    it('should call deleteEmployee on EmploymentService', (() => {
      let employeeService = TestBed.get(EmployeeService);
      spyOn(employeeService, 'deleteEmployee');
      comp.delete(comp.employees[0]);
      expect(employeeService.deleteEmployee).toHaveBeenCalled();
    }));
  });

  describe('search', () => {
    it('should call searchEmployees on EmploymentService with correct parameters', (() => {
      let employeeService = TestBed.get(EmployeeService);
      spyOn(employeeService, 'searchEmployees');
      comp.name = 'Allan Smith';
      comp.department = 'it';
      comp.search();
      expect(employeeService.searchEmployees).toHaveBeenCalledWith('Allan Smith', 'it');
    }));
  });
});
