import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component.ts';
import { AddressBookComponent } from './address-book/address-book.component';
import { EmployeeService } from './model/employee.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeModal } from './address-book/add-employee/add-employee.modal';

// todo - change the root module/component name to app
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [EmployeeService],
  declarations: [AppComponent, AddressBookComponent, AddEmployeeModal]
})
export class AppModule {
}
