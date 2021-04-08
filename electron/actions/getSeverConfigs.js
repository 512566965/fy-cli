/*
 * @Description  : 获取服务器配置
 * @Author       : SC.beisu
 * @Date         : 2021-03-08 11:00:29
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-06 09:55:58
 * @FilePath     : /fy-deploy-cli/electron/actions/getSeverConfigs.js
 */
const io = require('../utils/io')

module.exports = () => {
  return io.pReadFile('/Users/sc/Desktop/program/fengyu/fy-deploy-cli/config/deploy.config')
  .then(cnt => {
    return JSON.parse(cnt)
  })
}

