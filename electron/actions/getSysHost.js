/*
 * @Description  : 获取系统hosts
 * @Author       : SC.beisu
 * @Date         : 2021-03-08 11:00:29
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-09 16:34:39
 * @FilePath     : /fy-deploy-cli/electron/actions/getSysHost.js
 */
const io = require('../utils/io')
const { sys_hosts_path } = require('../utils/paths')
// Windows 系统有可能不安装在 C 盘
// const sys_hosts_path = platform === 'win32' ? `${process.env.windir || 'C:\\WINDOWS'}\\system32\\drivers\\etc\\hosts` : '/etc/hosts'
// const sys_hosts_path = '/etc/hosts'


module.exports = () => {
  return io.pReadFile(sys_hosts_path)
  .then(cnt => {
    return {
      content: cnt
    }
  })
}