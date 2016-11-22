describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('home page should have a header, address-book tag', () => {
    browser.sleep(1000);
    expect(element(by.tagName('h1')).isPresent()).toEqual(true);
    expect(element(by.tagName('address-book')).isPresent()).toEqual(true);
  });
});
