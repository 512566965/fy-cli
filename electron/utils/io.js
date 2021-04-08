/*
 * @Description  : io
 * @Author       : SC.beisu
 * @Date         : 2021-03-08 10:56:21
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-31 09:21:43
 * @FilePath     : /fy-deploy-cli/electron/utils/io.js
 */
/**
 * io
 * @author oldj
 * @blog http://oldj.net
 */

'use strict'

const fs = require('fs')

const getUserHome = () => {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
}

const isFile = (p) => {
  try {
    if (fs.statSync(p).isFile()) {
      return true
    }
  } catch (e) {
  }
  return false
}

const isDirectory = (p) => {
  try {
    if (fs.statSync(p).isDirectory()) {
      return true
    }
  } catch (e) {
  }
  return false
}

const writeFile = (fn, data, callback) => {
  // let cnt_md5 = crypto.createHash('md5').update(data).digest('hex')
  // if (isFile(fn) && md5File.sync(fn) === cnt_md5) {
  //   callback()
  // } else {
    // console.log(`md5 not match, save new content to: [${fn}].`)
    fs.writeFile(fn, data, 'utf-8', callback)
  // }
}

const pWriteFile = (fn, data) => {
  return new Promise((resolve, reject) => {
    writeFile(fn, data, (e, v) => e ? reject(e) : resolve(v))
  })
}

const readFile = (fn, callback) => {
  if (!isFile(fn)) {
    callback(null, '')
  } else {
    fs.readFile(fn, 'utf-8', callback)
  }
}

const pReadFile = (fn) => {
  return new Promise((resolve, reject) => {
    readFile(fn, (e, v) => e ? reject(e) : resolve(v))
  })
}

module.exports = {
  isFile,
  isDirectory,
  writeFile,
  pWriteFile,
  readFile,
  pReadFile
}