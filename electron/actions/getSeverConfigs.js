/*
 * @Description  : 获取服务器配置
 * @Author       : SC.beisu
 * @Date         : 2021-03-08 11:00:29
 * @LastEditors: Sc
 * @LastEditTime: 2021-04-09 10:28:02
 * @FilePath     : /fy-deploy-cli/electron/actions/getSeverConfigs.js
 */
const io = require('../utils/io')
const path = require('path')

module.exports = () => {
  return io.pReadFile(path.resolve(__dirname, '../../config/deploy.config'))
  .then(cnt => {
    return JSON.parse(cnt)
  })
}

