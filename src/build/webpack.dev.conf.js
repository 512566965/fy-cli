/*
 * @Description:  webpack基础配置
 * @Author: Sc
 * @Date: 2021-01-22 13:43:56
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-03 16:35:06
 */
'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
  context: path.resolve(__dirname, '../'),
  devServer: {
    host: 'localhost',
    port: 8081,
    hot: true,
    open: true
  },
  entry: {
      index: './main.js' // 入口文件
  },
  output:{
      filename: 'bundle.js',
      path: path.resolve(__dirname,'../dist')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'auto'
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      }
    ]
  },
  mode: 'development'
}