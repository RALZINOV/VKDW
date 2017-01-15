'use-strict';

const IS_DEV = process.env.NODE_ENV === 'development';

const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    pageWorker: './src/components/pageWorker.js',
    bgWorker: './src/components/bgWorker.js',
    popupWorker: './src/components/popupWorker.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/src/workers'),
  },

  watch: IS_DEV,
  watchOptions: {
    aggregateTimeout: 100,
  },
  devtool: IS_DEV ? 'inline-module-source-map' : '',

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: path.resolve(__dirname, 'src/components/'),
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEV,
      // 'process.env': {
      //   'NODE_ENV': JSON.stringify('production'),
      // },
    }),

    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: !IS_DEV,
    // }),
  ],
};
