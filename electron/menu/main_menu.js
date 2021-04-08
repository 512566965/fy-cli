/*
 * @Description  : 主原生菜单
 * @Author       : SC.beisu
 * @Date         : 2021-03-04 10:04:13
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-02 10:23:35
 * @FilePath     : /fy-deploy-cli/electron/menu/main_menu.js
 */
'use strict'

const {app, Menu, shell} = require('electron')
const m_lang = require('../server/lang')
//const getPref = require('../server/actions/getPref')
const svr = require('../server/svr.js')

function init (win, lang) {
  const template = [
    {
      label: app.name,
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services" },
        { type: "separator" },
        { type: "separator" },
        {
          label: "Preferences...",
          accelerator: (() => ("CmdOrCtrl+,"))(),
          // click: () => {
          //   win.webContents.send("changeRouteTo", "/settings");
          // },
          role: "preferences",
        },
        { type: "separator" },
        { role: "hide" },
        { role: "hideothers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    {
      label: lang.file,
      submenu: [
        {
          label: '测试',
          click () {
            // shell.openExternal('https://github.com')
            win.webContents.send('test', 'whooooooh')
          }
        },
        {
          label: lang.new,
          accelerator: 'CommandOrControl+N',
          click: () => {
            svr.broadcast('add_hosts')
          }
        }, {
          type: 'separator'
        }, {
          label: lang.import,
          accelerator: 'Alt+CommandOrControl+I',
          click: () => {
            require('../server/actions/toImport')(svr)
          }
        }, {
          label: lang.export,
          accelerator: 'Alt+CommandOrControl+E',
          click: () => {
            require('../server/actions/toExport')(svr)
          }
        }, {
          type: 'separator'
        }, {
          label: lang.preferences,
          accelerator: 'CommandOrControl+,',
          click: () => {
            //app.mainWindow.webContents.send('show_preferences')
            svr.broadcast('show_preferences')
          }
        }
      ]
    },
    {
      label: lang.edit,
      submenu: [
        {
          label: lang.undo,
          role: 'undo'
        }, {
          label: lang.redo,
          role: 'redo'
        }, {
          type: 'separator'
        }, {
          label: lang.menu_cut,
          role: 'cut'
        }, {
          label: lang.menu_copy,
          role: 'copy'
        }, {
          label: lang.menu_paste,
          role: 'paste'
        }, {
          label: lang.menu_delete,
          role: 'delete'
        }, {
          label: lang.menu_selectall,
          role: 'selectall'
        }, {
          type: 'separator'
        }, {
          label: lang.search,
          accelerator: 'CommandOrControl+F',
          click () {
            // ipcMain.emit('to_search');
            //app.mainWindow.webContents.send('to_search')
            svr.broadcast('search:start')
          }
        }, {
          label: lang.comment_current_line,
          accelerator: 'CommandOrControl+/',
          click () {
            // ipcMain.emit('to_search');
            //app.mainWindow.webContents.send('to_comment')
            svr.broadcast('to_comment')
          }
        }]
    }, {
      label: lang.view,
      submenu: [
        // {
        //     label: 'Reload',
        //     accelerator: 'CmdOrCtrl+R',
        //     click (item, focusedWindow) {
        //         if (focusedWindow) focusedWindow.reload()
        //     }
        // },
        // {
        //     label: 'Toggle Developer Tools',
        //     accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        //     click (item, focusedWindow) {
        //         if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        //     }
        // },
        // {
        //     type: 'separator'
        // },
        {
          label: lang.menu_resetzoom,
          role: 'resetzoom'
        },
        {
          label: lang.menu_zoomin,
          role: 'zoomin'
        },
        {
          label: lang.menu_zoomout,
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          label: lang.menu_togglefullscreen,
          role: 'togglefullscreen'
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

module.exports = {
  createMenu(win, language = 'cn') {
    let lang = m_lang.getLang(language)
    init(win, lang)
  }
}