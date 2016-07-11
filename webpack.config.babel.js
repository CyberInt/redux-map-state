const path = require('path');
const webpack = require('webpack');

const distPath = path.join(__dirname, 'dist');
const srcPath = path.join(__dirname, 'src');
const env = process.env.NODE_ENV || 'development';
const minified = env === 'development' ? '' : '.min';
const exclude = [/node_modules/];

const config = {
  context: srcPath,

  entry: { index: 'index' },

  output: {
    path: distPath,
    filename: `index${minified}.js`,
    library: 'index',
    libraryTarget: 'umd',
  },

  resolve: {
    root: [srcPath]
  },

  module: {
    preloaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude
      }
    ]
  },
};

if (env === 'test') {
  config.resolve.root.push(__dirname);
  config.devtool = '#inline-source-map';
}

module.exports = config;
