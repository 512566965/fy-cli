/*
 * @Description  : 配置文件
 * @Author       : SC.beisu
 * @Date         : 2021-03-03 10:56:01
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-29 09:34:03
 * @FilePath     : /fy-deploy-cli/config/delop.config.js
 */
module.exports = {
  projectName: 'fy',
  privateKey: 'C:\\users',
  passphrase: '',
  cluster: [],
  dev: {
    name: '测试环境 95端口',
    script: 'npm run build',
    host: '192.168.10.95',
    port: 22,
    username: 'root',
    password: 'fengyukeji',
    distPath: 'dist',
    webDir: '/home/FYBackstage/dist',
    isRemoveRemoteFile: false,
    isRemoveLocalFile: false
  },
  test: {
    name: '测试环境 95端口',
    script: 'npm run build',
    host: '192.168.10.95',
    port: 22,
    username: 'root',
    password: 'fengyukeji',
    distPath: 'dist',
    webDir: '/home/FYBackstage/dist',
    isRemoveRemoteFile: false,
    isRemoveLocalFile: false
  },
  prod: {
    name: '测试环境 95端口',
    script: 'npm run build',
    host: '192.168.10.95',
    port: 22,
    username: 'root',
    password: 'fengyukeji',
    distPath: 'dist',
    webDir: '/home/FYBackstage/dist',
    isRemoveRemoteFile: false,
    isRemoveLocalFile: false
  }
}
