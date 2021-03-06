const webpack = require('webpack');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.base.config.js');

const prodConfig = {
  output: {
    path: path.resolve(__dirname, baseConfig.paths.BUNDLE_ROOT_PROD),
    publicPath: baseConfig.paths.STATIC_URL_PROD,
    filename: 'js/[name]-[hash].js',
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader?cacheDirectory',
        exclude: [/node_modules/, /bower_components/],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader'],
        }),
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      'jQuery': 'jquery',
      '$': 'jquery'
    }),
    new webpack.DefinePlugin({
      DEBUG: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin('css/[name]-[hash].css'),
  ],
};

const config = Object.assign({}, baseConfig.config, prodConfig);

module.exports = config;

