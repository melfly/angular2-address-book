const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV
});

module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {

    devtool: 'cheap-module-source-map',

    output: {
      /**
       * The output directory as absolute path (required).
       */
      path: helpers.root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js',
      library: 'ac_[name]',
      libraryTarget: 'var',
    },

    plugins: [
      // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV)
        }
      }),
      new LoaderOptionsPlugin({
        debug: true,
        options: {
          /** Static analysis linter for TypeScript advanced options configuration*/
          tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
          },

        }
      })
    ],

    /** Webpack Development Server configuration*/
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      outputPath: helpers.root('dist')
    },

    /* Include polyfills or mocks for various node stuff */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  });
}
