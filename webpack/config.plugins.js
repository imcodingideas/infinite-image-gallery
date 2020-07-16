const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const plugins = env => [
  new CleanWebpackPlugin(),
  new HTMLWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body',
  }),
  new Dotenv(),
  new webpack.HotModuleReplacementPlugin(),
];

module.exports = env => plugins(env);
