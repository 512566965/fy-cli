/*
 * @Description  : 保存配置
 * @Author       : SC.beisu
 * @Date         : 2021-03-29 16:38:09
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-06 09:28:18
 * @FilePath     : /fy-deploy-cli/electron/actions/saveSeverConfig.js
 */

const io = require('../utils/io')
const conf = require('../../config/delop.config')

module.exports = (data) => {
  return require('./getSeverConfigs')().then( confs => {
    return io.pWriteFile('/Users/sc/Desktop/program/fengyu/fy-deploy-cli/config/deploy.config', JSON.stringify(Object.assign(confs, data), null, 2))
    .then(cnt => {return '写入成功'}).catch(e => {return `写入失败${e}`})
  })
}

