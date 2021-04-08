/*
 * @Description  : /*
 * @Description:  webpack打包运行文件
 * @Author: Sc
 * @Date: 2021-01-22 13:44:11
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-03 13:47:21
 */

process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.base.conf.js')

rm(path.resolve(__dirname, '../../dist'), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    // process.stdout.write(stats.toString({
    //   color: true,
    //   modules: false,
    //   children: false,
    //   chunks: false,
    //   chunkModules: false
    // }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red(' Build failed with errors. \n'))
      process.exit(1)
    }

    console.log(chalk.cyan(' Build completed. \n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server. \n' +
      '  Opening index.html over file:// won\'t work. \n'
    ))
  })
})