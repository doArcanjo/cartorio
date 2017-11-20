'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const IgnorePlugin =  require("webpack").IgnorePlugin;

const config = require('./config')
const _ = require('./utils')

module.exports = {
  entry: {
    client: './client/index.js'
  },
  output: {
    path: _.outputPath,
    filename: '[name].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../client'),
      components: path.join(__dirname, '../client/components')
    }
  },
  module: {
    /*added for js-xlsx*/
    noParse: [/jszip.js$/,/alasql/],
    loaders: [
      {
        test: /\.vue$/,
        loaders: ['vue']
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.es6$/,
        loaders: ['babel']
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      { test: /\.json$/, loader: "json-loader" },
      //vue-tables-2
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules(?!\/(vue-tables-2|vue-pagination-2))\//
      }
      
    ]
  },
  babel: config.babel,
  postcss: config.postcss,
  vue: {
    loaders: {},
    postcss: config.postcss
  },
  plugins: [
    // new IgnorePlugin(/cptable/),
    new HtmlWebpackPlugin({
      title: config.title,
      template: __dirname + '/index.html',
      filename: _.outputIndexPath
    })
    ],
    /*ADD BECAUSE JS-XSLX */
  // node: {
  //     fs: "empty"
  // },
  //   externals: [
  //       {
  //           './cptable': 'var cptable'
  //       }
  //   ],
  target: _.target
}
