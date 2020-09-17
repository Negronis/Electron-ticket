// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const mode = process.argv[2];
let mainWindow ;
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 1080,
    minWidth:1280,
    minHeight:1080,
    webPreferences: { 
      preload: path.join(__dirname, 'preload.js')
    }

  })

  if(mode === 'dev'){
    mainWindow.loadURL('http://localhost:3001/');
    // 打开开发者工具
    mainWindow.webContents.openDevTools()
  }else{
    mainWindow.loadURL(url.format({
      pathname:path.join(__dirname, './build/index.html'),
      protocol:'file:',
      slashes:true
    }));
  }
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
