import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service = new EmployeeService();

  beforeEach(() => {
    service = new EmployeeService();
    service.addressBook = [
      {firstName: 'Allan', lastName: 'Smith', department: 'IT', phone: '0412345678'},
      {firstName: 'Steve', lastName: 'Gwyn', department: 'HR', phone: '0412345678'},
      {firstName: 'Les', lastName: 'Huntley', department: 'IT', phone: '0422333444'}
    ];
  });

  it('getAllEmployees should call search with empty strings', () => {
    spyOn(service, 'searchEmployees');
    service.getAllEmployees();
    expect(service.searchEmployees).toHaveBeenCalledWith('', '');
  });

  it('should return all employees when both name and depart are empty string or undefined', () => {
    expect(service.searchEmployees('', '').length).toEqual(3);
    expect(service.searchEmployees(undefined, '').length).toEqual(3);
    expect(service.searchEmployees('', null).length).toEqual(3);
    expect(service.searchEmployees(null, null).length).toEqual(3);
    expect(service.searchEmployees(undefined, undefined).length).toEqual(3);
  });

  it('should return employees matching the given criteria', () => {
    expect(service.searchEmployees('Smith', '').length).toEqual(1);
    expect(service.searchEmployees('Smith').length).toEqual(1);
    expect(service.searchEmployees('', 'IT').length).toEqual(2);
    expect(service.searchEmployees('Smith', 'IT').length).toEqual(1);
  });

  it('should add the new employess to the end of the collection', () => {
    let newEmp = {firstName: 'Paul', lastName: 'Collins', department: 'IT', phone: ''};
    service.addEmployee(newEmp);
    expect(service.addressBook.length).toEqual(4);
    expect(service.addressBook[3].firstName).toEqual('Paul');
  });

  it('should remove the given employee from the collection', () => {
    let empToDel = service.searchEmployees('Steve Gwyn', 'HR')[0];
    service.deleteEmployee(empToDel);
    expect(service.addressBook.length).toEqual(2);
    expect(service.searchEmployees('Steve Gwyn', 'HR').length).toEqual(0);
  });

});
