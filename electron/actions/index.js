/*
 * @Description  : 方法合集
 * @Author       : SC.beisu
 * @Date         : 2021-03-26 15:47:28
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-26 15:51:44
 * @FilePath     : /fy-deploy-cli/electron/actions/index.js
 */
const path = require('path')

require('fs').readdirSync(__dirname).map(file => {
  if (file === 'index.js') return 
  module.exports[path.basename(file, '.js')] = require(path.join(__dirname, file))
})