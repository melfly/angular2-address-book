describe('AddressBook', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should contain add-employee component', () => {
    expect(element(by.tagName('add-employee')).isPresent()).toEqual(true);
  });

  it('should be able to search by name and department', () => {
    let nameElem = element(by.name('name'));
    let depElem = element(by.name('department'));
    nameElem.sendKeys('Gary Zhou');
    depElem.sendKeys('IT');
    expect(element.all(by.css('tbody tr')).count()).toEqual(1);
  });

  it('should be able to search by department only', () => {
    let depElem = element(by.name('department'));
    depElem.sendKeys('IT');
    expect(element.all(by.css('tbody tr')).count()).toEqual(3);
  });

  it('should clear current searching criteria and ' +
    'reload all employees when clicking clear button', () => {
    let nameElem = element(by.name('name'));
    let depElem = element(by.name('department'));
    nameElem.sendKeys('Gary');
    depElem.sendKeys('IT');
    let clearBtn = element(by.css('form button'));
    clearBtn.click();
    expect(nameElem.getText()).toEqual('');
    expect(depElem.getText()).toEqual('');
    expect(element.all(by.css('tbody tr')).count()).toEqual(7);
  });

  it('should delete selected employee', () => {
    let deleteBtn = element.all(by.css('tr td button')).get(0);
    deleteBtn.click();
    expect(element.all(by.css('tbody tr')).count()).toEqual(6);
  });

  it('should sort the table in ascending order when clicking sort button', () => {
    let sortBtn = element(by.css('th button'));
    sortBtn.click();
    let rows = element.all(by.css('tbody tr'));
    expect(rows.get(0).all(by.css('td')).get(0).getText()).toEqual('Kim');
    expect(rows.get(1).all(by.css('td')).get(0).getText()).toEqual('Paul');
  });

  afterEach(() => {
    // Pause a second after each test case
    browser.sleep(1000);
  });
});
