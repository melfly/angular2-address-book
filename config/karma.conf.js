module.exports = function(config) {
  var testWebpackConfig = require('./webpack.test.js')({env: 'test'});

  var configuration = {

    basePath: '',
    frameworks: ['jasmine'],

    exclude: [ ],
    files: [ { pattern: './config/spec-bundle.js', watched: false } ],

    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    webpack: testWebpackConfig,

    coverageReporter: {
      //type: 'in-memory'
      type: 'text-summary',
      dir: 'coverage/'
    },

    //remapCoverageReporter: {
    //  'text-summary': null,
    //  json: './coverage/coverage.json',
    //  html: './coverage/html'
    //},

    webpackMiddleware: { stats: 'errors-only'},

    reporters: [ 'mocha', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    browsers: [
      'Chrome'
    ],

    singleRun: true
  };

  config.set(configuration);
};
