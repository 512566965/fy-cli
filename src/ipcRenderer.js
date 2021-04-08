/*
 * @Description  : 渲染进程启动监听
 * @Author       : SC.beisu
 * @Date         : 2021-03-05 10:28:43
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-08 15:51:51
 * @FilePath     : /fy-deploy-cli/src/ipcRenderer.js
 */

const electron = require('electron')
const { LoaderOptionsPlugin } = require('webpack')
const { ipcRenderer } = electron
const Renderer =  require('./utils/renderer.js')

function initIpcRenderer (vueInstance) {
  console.log('ipcRenderer is listening')
  ipcRenderer.on('y', (e, args) => {
    if(~['succeed', 'loading', 'error', 'info', 'warning'].indexOf(args.event)) return Renderer.emit('dialog', args)
    Renderer.emit(args.event, args)
  })
  Renderer.on('dialog', args => {
    if(~['succeed', 'error', 'info', 'warning'].indexOf(args.event)) {
      vueInstance.$dialog({
        title: '提示'
        , type: args.event
        , message: args.data[0]
        , showCancelBtn: true
        , showConfirmBtn: true
        , showCloseBtn: true
        , wrapperClick: true
      })
    } else {
      vueInstance.$dialog({
        type: args.event
        , message: args.data[0]
        , showCancelBtn: false
        , showConfirmBtn: false
        , wrapperClick: false
      })
    }
  })
  Renderer.on('closeLoading', args => {
    console.log(args)
    vueInstance.$dialog.close()
  })
}

function send (chanel, arg) {
  return new Promise ((resolve, reject) => {
    ipcRenderer.send(chanel, arg)
  })
}

module.exports = {
  initIpcRenderer,
}