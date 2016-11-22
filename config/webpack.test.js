const helpers = require('./helpers');
const path = require('path');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*Webpack configuration*/
module.exports = function (options) {
  return {

    devtool: 'inline-source-map',

    resolve: {
      extensions: ['.ts', '.js'],
      /*Make sure root is src*/
      modules: [ path.resolve(__dirname, 'src'), 'node_modules' ]
    },

    module: {
      rules: [
        /** Tslint loader support for *.ts files */
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: [helpers.root('node_modules')]
        },

        /**
         * Source map loader support for *.js files
         * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
         */
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            helpers.root('node_modules/rxjs'),
            helpers.root('node_modules/@angular')
          ]
        },

        {
          test: /\.ts$/,
          loader: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: [/\.e2e\.ts$/]
        },

        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: [helpers.root('src/index.html')]
        },

        {
          test: /\.css$/,
          loaders: ['to-string-loader', 'css-loader'],
          exclude: [helpers.root('src/index.html')]
        },

        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },

        /**
         * Instruments JS files with Istanbul for subsequent code coverage reporting.
         * Instrument only testing sources.
         */
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: helpers.root('src'),
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/
          ]
        }

      ]
    },

    plugins: [

      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV)
        }
      }),

      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      ),

      new LoaderOptionsPlugin({
        debug: true,
        options: {

          /* Static analysis linter for TypeScript advanced options configuration */
          tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
          }
        }
      })
    ],

    /**
     * Include polyfills or mocks for various node stuff
     */
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
}
