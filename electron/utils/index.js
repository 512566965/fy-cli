/*
 * @Description  : 工具类
 * @Author       : SC.beisu
 * @Date         : 2021-03-08 15:25:29
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-31 08:53:17
 * @FilePath     : /fy-deploy-cli/electron/utils/index.js
 */
const getUserHome = () => {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
}

const makeId = () => {
  return (new Date()).getTime() + '-' + Math.floor(Math.random() * 1e6)
}
module.exports = {
  getUserHome
  ,makeId
}