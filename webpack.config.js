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
  devtool: IS_DEV ? 'module-inline-source-map' : '',

  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?/,
        include: path.resolve(__dirname, 'src/components/'),
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react'],
        },
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
