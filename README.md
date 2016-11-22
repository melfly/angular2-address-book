# angular2-address-book
Simple Address book implemented in Angular 2

## Dev stack
* angular 2 / typescript
* bootstrap - styling
* webpack - resource bundler
* karma/jasmine - unit test
* protractor - e2e test


## Set up
Make sure you have **Node.js** version >= 5.0, **NPM** >= 3 and **git** installed
```
# clone repo
git clone https://github.com/melfly/angular2-address-book.git
#
cd angualr2-address-book
#install dependencies
npm install
```

## Run tasks
```
# start the app
npm start
# Open http://localhost:3000/ in browser
# run unit tests
npm run test
# run e2e tests
npm run webdriver:update
npm run e2e
```

## Design considerations
- Prod configuration for webpack is omitted to simplify the configuration.
- Unit/e2e tests does not have 100 coverage. More tests should be added if it was a real project.
- Some dependencies are defined but not used such as rxjs as it is most likely used in a real project where FE talks to BE service.
- The page might not be fully responsive as it is not an requirement.
