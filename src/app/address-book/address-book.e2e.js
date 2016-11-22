describe('AddressBook', function () {
    beforeEach(function () {
        browser.get('/');
    });
    it('should contain add-employee component', function () {
        expect(element(by.tagName('add-employee')).isPresent()).toEqual(true);
    });
    it('should be able to search by name and department', function () {
        var nameElem = element(by.name('name'));
        var depElem = element(by.name('department'));
        nameElem.sendKeys('Gary Zhou');
        depElem.sendKeys('IT');
        expect(element.all(by.css('tbody tr')).count()).toEqual(1);
    });
    it('should be able to search by department only', function () {
        var depElem = element(by.name('department'));
        depElem.sendKeys('IT');
        expect(element.all(by.css('tbody tr')).count()).toEqual(3);
    });
    it('should clear current searching criteria and ' +
        'reload all employees when clicking clear button', function () {
        var nameElem = element(by.name('name'));
        var depElem = element(by.name('department'));
        nameElem.sendKeys('Gary');
        depElem.sendKeys('IT');
        var clearBtn = element(by.css('form button'));
        clearBtn.click();
        expect(nameElem.getText()).toEqual('');
        expect(depElem.getText()).toEqual('');
        expect(element.all(by.css('tbody tr')).count()).toEqual(7);
    });
    it('should delete selected employee', function () {
        var deleteBtn = element.all(by.css('tr td button')).get(0);
        deleteBtn.click();
        expect(element.all(by.css('tbody tr')).count()).toEqual(6);
    });
    it('should sort the table in ascending order when clicking sort button', function () {
        var sortBtn = element(by.css('th button'));
        sortBtn.click();
        var rows = element.all(by.css('tbody tr'));
        expect(rows.get(0).all(by.css('td')).get(0).getText()).toEqual('Kim');
        expect(rows.get(1).all(by.css('td')).get(0).getText()).toEqual('Paul');
    });
    afterEach(function () {
        // Pause a second after each test case
        browser.sleep(1000);
    });
});
//# sourceMappingURL=address-book.e2e.js.map