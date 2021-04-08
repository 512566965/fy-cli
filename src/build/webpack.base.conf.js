/*
 * @Description  : webpack配置文件
 * @Author       : SC.beisu
 * @Date         : 2021-03-03 13:47:38
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-31 11:19:05
 * @FilePath     : /fy-deploy-cli/src/build/webpack.base.conf.js
 */
'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { optimize } = require('webpack')

module.exports = {
  mode: 'development',
  target: 'electron-renderer',
  context: path.resolve(__dirname, '../'),
  devServer: {
    host: 'localhost',
    port: 8081,
    hot: true,
    open: false
  },
  entry: {
    index: './main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../dist')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../')
    }
  },
  plugins : [
    new VueLoaderPlugin({options: {optimizeSSR: false}}),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../../dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'auto'
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader',
        // {
        //   loader: 'sass-loader',
        //   options: {
        //     sourceMap: true,
        //     resources: [path.resolve(__dirname, '../assets/css/_conf.scss')]
        //   }
        // }
      ]
      },
      {
        test: /\.svg$/,
        use: ['url-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['url-loader']
      }
    ]
  }
}