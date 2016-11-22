"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var module_1 = require();
var AddressListComponent = (function () {
    function AddressListComponent(employeeService) {
        this.employeeService = employeeService;
        this.department = 'type a department';
        this.employees = this.employeeService.getAllEmployees();
        this.searchByName = function (event) {
            console.log('key up');
            this.employees = this.employeeService.searchEmployees(this.name);
        };
    }
    AddressListComponent = __decorate([
        module_1.Component({
            selector: 'address-list',
            templateUrl: './address-book.component.html'
        })
    ], AddressListComponent);
    return AddressListComponent;
}());
exports.AddressListComponent = AddressListComponent;
//# sourceMappingURL=address-book.component.js.map