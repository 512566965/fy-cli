/*
 * @Description  : 获取项目配置
 * @Author       : SC.beisu
 * @Date         : 2021-03-08 11:00:29
 * @LastEditors: Sc
 * @LastEditTime: 2021-04-09 14:18:36
 * @FilePath     : /fy-deploy-cli/electron/actions/getProjectConfigs.js
 */
const io = require('../utils/io')
const path = require('path')

module.exports = () => {
  return io.pReadFile(path.resolve(__dirname, '../../config/project.config')).then(cnt => {
    return JSON.parse(cnt)
  })
}
