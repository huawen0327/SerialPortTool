'use strict'

import { app, BrowserWindow } from 'electron'
const serialPort = require('serialport')
global.SerialPort = serialPort
// global.data = []
const {ipcMain, dialog} = require('electron')
ipcMain.on('open-file-dialog', (event) => {
  // const options = {
  //   filters: [
  //     { name: 'All Files', extensions: ['*'] }
  //   ]
  // }
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Music', extensions: ['wav'] }
    ]
  }, (files) => {
    if (files) {
      event.sender.send('selected-file', files)
    }
  })
})
ipcMain.on('writeWav', (event, data) => {
  let fs = require('fs')
  // json数组
  // 数组转json字符串
  // let jsonObj = JSON.stringify(data)
  // 把json数据写入TXT文件中
  fs.writeFile('./src/renderer/assets/out.txt', data, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('file success！！！')
    }
  })
  const options = {
    title: 'Save a Wav',
    filters: [
      { name: '音频文件', extensions: ['wav'] }
    ]
  }
  dialog.showSaveDialog(options, (filename) => {
    event.sender.send('save-file', filename)
  })
})

// import { ipcRenderer } from 'electron'
// const {ipcRenderer} = require('electron')
// global.ipcRenderer = ipcRenderer

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    // height: 500,
    // width: 700,
    // 禁止调整大小
    resizable: false,
    height: 600,
    width: 850,
    useContentSize: true
  })

  mainWindow.loadURL(winURL)
  // 调试窗口
  mainWindow.webContents.closeDevTools()
  // 隐藏菜单
  mainWindow.setMenu(null)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
