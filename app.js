var {app, BrowserWindow} = require('electron')
var {autoUpdater} = require('electron-updater')

var configWindow = null

autoUpdater.checkForUpdatesAndNotify()

app.on('ready', () => {
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
