/*
 * @Description  : 渲染进程通信
 * @Author       : SC.beisu
 * @Date         : 2021-04-02 14:09:32
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-08 15:25:31
 * @FilePath     : /fy-deploy-cli/electron/server/svr.js
 */
'use strict'

const EventEmitter = require('events')
let svr = new EventEmitter()
svr.broadcast = broadcast

function broadcast (event, ...args) {
  if (!svr.renderer) {
    console.log('no renderer!')
    return
  }

  try {
    console.log('svr.js', event, args)
    svr.renderer.send('y', {
      event,
      data: args
    })
  } catch (e) {
    console.log(e)
  }
}

svr.log = (...args) => {
  broadcast('log', ...args)
}

svr.succeed = (...args) => {
  broadcast('succeed', ...args)
}

svr.error = (...args) => {
  broadcast('log', ...args)
}

svr.loading = (...args) => {
  broadcast('loading', ...args)
}

svr.closeLoading = (...args) => {
  broadcast('closeLoading', ...args)
}
//ipcmainEvent event.sender.send()
svr.registerRenderer = (r) => {
  svr.renderer = r
}

module.exports = svr
