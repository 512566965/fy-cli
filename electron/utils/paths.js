/*
 * @Description  : host 路径
 * @Author       : SC.beisu
 * @Date         : 2021-03-08 13:17:43
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-08 15:54:54
 * @FilePath     : /fy-deploy-cli/src/electron/utils/paths.js
 */
const path = require('path')
const utils = require('./index')

// Windows 系统有可能不安装在 C 盘
const sys_hosts_path = process.platform === 'win32' ? `${process.env.windir || 'C:\\WINDOWS'}\\system32\\drivers\\etc\\hosts` : '/etc/hosts'

// const appRoot = path.dirname(__dirname)

// function getApplicationPath() {
//   if (process.platform === 'darwin') {
//     return path.dirname(path.dirname(path.dirname(appRoot)))
//   }

//   return path.dirname(path.dirname(appRoot))
// }

// function getPortableDataPath() {
//   if (process.env['SWITCHHOSTS_PORTABLE']) {
//     return process.env['SWITCHHOSTS_PORTABLE'];
//   }

//   if (process.platform === 'win32' || process.platform === 'linux') {
//     return path.join(getApplicationPath(), 'data');
//   }

//   return path.join(path.dirname(getApplicationPath()), '.SwitchHosts-Data');
// }

// const portableDataPath = getPortableDataPath()
// const isPortable = fs.existsSync(portableDataPath)

// const home_path = io.getUserHome()
// const work_path = isPortable ? portableDataPath : path.join(home_path, '.SwitchHosts')
// const data_path = path.join(work_path, 'data.json')
// const preference_path = path.join(work_path, 'preferences.json')

// if (!io.isDirectory(work_path) || !io.isFile(path.join(work_path, 'data.json'))) {
//   try {
//     require('./initWorkPath')(work_path, sys_hosts_path)
//   } catch (e) {
//     console.log(e)
    //dialog.showMessageBox({
    //  type: 'error',
    //  title: 'Error',
    //  message: e.message
    //})

    // global.error = e
  // }
// }

const data_path = path.join(utils.getUserHome(), '/.SwitchHosts/data.json')

module.exports = {
  // home_path: home_path
  // , work_path: work_path
  data_path: data_path
  // , preference_path: preference_path
  , sys_hosts_path: sys_hosts_path
  // ,current_app_path: getCurrentAppPath()
}
