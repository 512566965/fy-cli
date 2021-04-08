/*
 * @Description  : 获取项目配置
 * @Author       : SC.beisu
 * @Date         : 2021-03-08 11:00:29
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-02 10:15:27
 * @FilePath     : /fy-deploy-cli/electron/actions/getProjectConfigs.js
 */
const io = require('../utils/io')

module.exports = () => {
  return io.pReadFile('/Users/sc/Desktop/program/fengyu/fy-deploy-cli/config/project.config').then(cnt => {
    return JSON.parse(cnt)
  })
}
