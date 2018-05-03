var {app, BrowserWindow} = require('electron')
var {autoUpdater} = require('electron-updater')
var fs = require('fs')

fs.appendFileSync('E:\\node\\electronAutoUpdates\\debug.txt', 'pid=' + process.pid)

var configWindow = null

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify()
  displayWindow()
})

app.on('window-all-closed', () => {
  // We have to listen for this event in order to prevent
  // the default behaviour of quitting the app by electron
})

function displayWindow () {
  configWindow = new BrowserWindow({
    // height and with can be set based on our UI design
    // height: 600,
    // width: 800,
    resizable: true,
    show: false,
    backgroundColor: '#ffffff'
  })

  configWindow.loadURL(`file://${__dirname}/index.html`)

  configWindow.once('ready-to-show', () => {
    configWindow.show()
  })

  configWindow.on('close', (event) => {
    configWindow = null
  })
}

autoUpdater.on('checking-for-update', () => {
  fs.appendFileSync('E:\\node\\electronAutoUpdates\\debug.txt', 'inside checkingForUpdate' + '\r\n')
})
autoUpdater.on('update-available', (info) => {
  fs.appendFileSync('E:\\node\\electronAutoUpdates\\debug.txt', 'inside updateAvailable' + '\r\n')
})
autoUpdater.on('update-not-available', (info) => {
  fs.appendFileSync('E:\\node\\electronAutoUpdates\\debug.txt', 'inside updateNotAvailable' + '\r\n')
})
autoUpdater.on('error', (err) => {
  fs.appendFileSync('E:\\node\\electronAutoUpdates\\debug.txt', 'inside error=' + JSON.stringify(err) + '\r\n')
  fs.appendFileSync('E:\\node\\electronAutoUpdates\\debug.txt', 'inside error=' + err.message + '\r\n')
})
autoUpdater.on('download-progress', (progressObj) => {
  fs.appendFileSync('E:\\node\\electronAutoUpdates\\debug.txt', 'inside downloadProgress=' + JSON.stringify(progressObj) + '\r\n')
})

autoUpdater.on('update-downloaded', (info) => {
  fs.appendFileSync('E:\\node\\electronAutoUpdates\\debug.txt', 'inside updateDownloaded' + '\r\n')
  autoUpdater.quitAndInstall(true, true)
})
