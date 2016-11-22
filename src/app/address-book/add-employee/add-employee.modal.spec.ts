import { TestBed } from '@angular/core/testing';
import { EmployeeService } from '../../model/employee.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeModal } from './add-employee.modal';

describe('AddEmployeeModal', () => {
    let fixture, comp;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AddEmployeeModal],
            imports: [FormsModule, NgbModule.forRoot()],
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

    describe('save', () => {
        it('Should call employeeService to add new employee', (() => {
            let employeeService = TestBed.get(EmployeeService);
            spyOn(employeeService, 'addEmployee');
            spyOn(comp.added, 'emit');
            comp.modalRef = {
              close: function() {}
            };
            spyOn(comp.modalRef, 'close');
            comp.save();
            expect(comp.added.emit).toHaveBeenCalled();
            expect(employeeService.addEmployee).toHaveBeenCalled();
            expect(comp.modalRef.close).toHaveBeenCalled();
        }));
    });
});
