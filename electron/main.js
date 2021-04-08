/*
 * @Description  : electron 启动文件
 * @Author       : SC.beisu
 * @Date         : 2021-03-02 16:17:23
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-02 13:06:34
 * @FilePath     : /fy-deploy-cli/electron/main.js
 */

const { app, BrowserWindow, shell, dialog, Menu, MenuItem} = require('electron')
const { right } = require('inquirer/lib/utils/readline')
const path = require('path')
const { createMenu } = require('./menu/main_menu')
const { initIpcMain, sendSync } = require('./ipcMain')

class server{
  constructor() {
    this.window = null
    this.init()
  }
  init() {
    console.log("initializing")
    // Make sure the app is singleton
    if (!app.requestSingleInstanceLock()) return app.quit()

    // start api

    // init ipcMain
    initIpcMain(this.window, '')

    // handle app events
    this.handleAppEvents()
  }
  createWindow () {
    this.window = new BrowserWindow({
      width: 1000,
      height: 600,
      webPreferences: {
        webSecurity: false, // 可以跨域
        nodeIntegration: true, // 渲染层可以使用node
        contextIsolation: false,
        enableRemoteModule: true, // 以使用remote
        // preload: path.join(__dirname, 'preload.js') //界面的其它脚本运行之前预先加载一个指定脚本。这个脚本将一直可以使用 node APIs 无论 node integration 是否开启。脚本路径为绝对路径。当 node integration 关闭，预加载的脚本将从全局范围重新引入node的全局引用标志。
      }
    })
    // mainWindow.preload('index.html')
    // this.window.loadFile(`${path.resolve(__dirname, '../dist/')}/index.html`)
    // this.window.loadURL(`file://${path.resolve(__dirname, '../dist/')}/index.html`)
    this.window.loadURL(`http://localhost:8081/`)
    this.window.webContents.openDevTools({mode: right})
    // this.window.webContents.openDevTools({mode: 'detach'})
    // this.window.webContents.openDevTools({mode: 'undocked'})

    // open the DevTools
  }
  handleAppEvents() {
    app.on("ready", async () => {
      console.log("app ready event")

      // create window
      this.createWindow()
      this.handleWindowEvents()

      // check for updates

      // create menu
      createMenu(this.window, 'cn')

      // create dock menu for macOS
      // app.dock.setMenu(createMenu(this.window))
      // create touch bar
      // this.window.setTouchBar(createTouchBar(this.window));

      // open Devtools
      this.window.webContents.openDevTools({mode:'right'})
    })
    app.on("activate", () => {
      this.window.show()
    })
    app.on("window-all-close", () => {

    })
    app.on("quit", () =>{
      app.quit()
    })
  }
  handleWindowEvents () {

  }
}

const test =new server()
console.log(test)
