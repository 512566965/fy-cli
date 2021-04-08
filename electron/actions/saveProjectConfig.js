/*
 * @Description  : 保存配置
 * @Author       : SC.beisu
 * @Date         : 2021-03-29 16:38:09
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-02 11:10:45
 * @FilePath     : /fy-deploy-cli/electron/actions/saveProjectConfig.js
 */

const io = require('../utils/io')

module.exports = (data) => {
  return io.pWriteFile('/Users/sc/Desktop/program/fengyu/fy-deploy-cli/config/project.config', JSON.stringify(data, null, 2))
  .then(cnt => {return '写入成功'}).catch(e => {return `写入失败${e}`})
}

