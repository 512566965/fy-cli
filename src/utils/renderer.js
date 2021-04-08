/*
 * @Description  : 与主程序通讯, 异步返回数据
 * @Author       : SC.beisu
 * @Date         : 2021-03-09 15:48:16
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-08 10:32:38
 * @FilePath     : /fy-deploy-cli/src/utils/renderer.js
 */
const { ipcRenderer } = require('electron')
const EventEmitter = require('events')
const evt = new EventEmitter()

const max_listener_count = 20
evt.setMaxListeners(max_listener_count)
ipcRenderer.setMaxListeners(max_listener_count)

let x_get_idx = 0

let x_idx = 0

/**
 * @author: SC.beisu
 * @description: 与主程序通讯, 异步返回数据
 * @param {
 *  action: String channel
 * }
 * @return {
 * Promise
 * }
 */
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
    ipcRenderer.once(channel, (e, d) => callback(null, d))
  }

  ipcRenderer.send('x', {
    action
    , data: args
    , channel
  })
}

module.exports = {
  sendSync
  , on: (...args) => evt.on(...args)
  , emit: (...args) => evt.emit(...args)
}