/*
 * @Description  : 切换host
 * @Author       : SC.beisu
 * @Date         : 2021-03-30 13:50:02
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-31 10:06:33
 * @FilePath     : /fy-deploy-cli/electron/actions/switchHost.js
 */
const io = require('../utils/io')
const { sys_hosts_path } = require('../utils/paths')

module.exports = () => {
  return require('./getUserHost')().then(res => {
    let result = '# SwitchHosts!↵↵'
    res.filter(i => i.on).map(item => result += item.content )
    console.log(result)
    return io.pWriteFile(sys_hosts_path, JSON.stringify(result, null, 2)).catch(e => console.log(e))
  })
}