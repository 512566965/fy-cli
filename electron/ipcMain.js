/*
 * @Description  : 主进程
 * @Author       : SC.beisu
 * @Date         : 2021-03-02 13:15:17
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-06 09:48:16
 * @FilePath     : /fy-deploy-cli/electron/ipcMain.js
 */
const { ipcMain, webContents } = require('electron')
const actions = require('./actions')
const svr =  require('./server/svr')

function initIpcMain (win, store) {
  ipcMain.on("minimize", () => {
    win.minimize();
  })

  ipcMain.on('close', (e, arg) => {
    console.log(arg)
    event.reply('main-msg', 'ok')
  })
  ipcMain.on('x', (e, arg) => {
    let sender = e.sender
    svr.registerRenderer(sender)
    console.log(arg.action)
    actions[arg.action](...arg['data']).then(res => e.sender.send(arg.channel, res)).catch(e => {})
  })
}

function sendSync (action, ...args) {
  return new Promise ( (reslove, reject) => {
    args.push((err, result) => err ? reject(err) : reslove(result))
    act(action, ...args)
  })
}

function act (action, ...args) {
  let channel = ['_cb', (new Date()).getTime(), (x_idx++)].join('_')

  let callback = null
  if (args.length > 0 && typeof args[args.length - 1] === 'function') {
    callback = args.pop()
  }
  if (typeof callback === 'function') {
    ipcMain.once(channel, (e, d) => callback(null, d))
  }

  // ipcMain.reply('dialog', )
  // mainWindow.webContents.send('dialog', 123)
}

module.exports = {
  initIpcMain
}