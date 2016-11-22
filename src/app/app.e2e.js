describe('App', function () {
    beforeEach(function () {
        browser.get('/');
    });
    it('home page should have a header, address-book tag', function () {
        browser.sleep(1000);
        expect(element(by.tagName('h1')).isPresent()).toEqual(true);
        expect(element(by.tagName('address-book')).isPresent()).toEqual(true);
    });
});
//# sourceMappingURL=app.e2e.js.map