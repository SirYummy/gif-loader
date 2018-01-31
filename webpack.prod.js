const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Production',
        template : './src/index.hbs'
    }),  
    new UglifyJSPlugin({
        sourceMap : true
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV' : JSON.stringify('production')
    })
  ]
});