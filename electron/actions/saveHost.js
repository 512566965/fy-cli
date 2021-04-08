/*
 * @Description  : 保存hosts
 * @Author       : SC.beisu
 * @Date         : 2021-03-09 14:44:00
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-02 13:18:28
 * @FilePath     : /fy-deploy-cli/electron/actions/saveHost.js
 */
const { resolveConfig } = require('prettier')
const io = require('../utils/io')
const { data_path } = require('../utils/paths')

// module.exports = (id, value) => {
//   return require('./getUserHost')().then(res => {
//     let h = res.find(i => i.id === id)
//     let newHosts  = res.filter(i => i.id !== id)
//     h['content'] = value
//     newHosts.push(h)
//     return io.pWriteFile(data_path, JSON.stringify({list: newHosts}, null, 2))
//   })
// }

module.exports = (lists) => {
    return require('./getUserHost')().then(res => {
      return io.pWriteFile(data_path, JSON.stringify({list: lists}, null, 2))
      .then(cnt => {return '写入成功'}).catch(e => {return `写入失败${e}`})
    })
  }