/*
 * @Description  : 获取系统 + 用户 hosts
 * @Author       : SC.beisu
 * @Date         : 2021-03-08 11:01:20
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-08 13:43:45
 * @FilePath     : /fy-deploy-cli/src/electron/actions/getHosts.js
 */
const getSysHost = require('./getSysHost.js')
const getUserHost = require('./getUserHost.js')

module.exports = () => {
  return Promise.all([
    getSysHost(), getUserHost()
  ])
  .then ( ([sys_hosts, user_hosts]) => {
    return {
      sys_hosts,
      user_hosts
    }
  })
}