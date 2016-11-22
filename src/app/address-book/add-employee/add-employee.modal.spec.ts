import { TestBed } from '@angular/core/testing';
import { EmployeeService } from '../../model/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeModal } from './add-employee.modal';

describe('AddEmployeeModal', () => {
  let fixture, comp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEmployeeModal],
      imports: [BrowserModule, FormsModule, NgbModule.forRoot()],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            addEmployee: function (newEmp) {
              return [];
            }
          }
        },
      ]
    });

    fixture = TestBed.createComponent(AddEmployeeModal);
    comp = fixture.componentInstance;

  });

  it('true is true', (() => {
    expect(comp.added).toBeDefined();
  }));
});
