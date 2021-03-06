import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../model/employee.service';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.modal.html',
  styleUrls: ['./add-employee.modal.css']
})
export class AddEmployeeModal {
  closeResult: string;
  modalRef: NgbModalRef;
  newEmployee: Employee;
  @Output() added: EventEmitter<string>;

  constructor(private modalService: NgbModal, private employeeService: EmployeeService) {
    this.added = new EventEmitter<string>();
  }

  open(content) {
    this.newEmployee = new Employee();
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 'Modal cancelled';
    });
  }

  save = function() {
    this.employeeService.addEmployee(this.newEmployee);
    this.added.emit(this.newEmployee);
    this.modalRef.close();
  };
}
