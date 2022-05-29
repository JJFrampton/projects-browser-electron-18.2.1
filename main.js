console.log("STARTING MAIN PROCESS")

const { app, BrowserWindow } = require('electron')
const path = require('path')

app.commandLine.appendSwitch ("disable-http-cache");
app.commandLine.appendSwitch ("--disable-http-cache");

let win

const createWindow = () => {
  win = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Load App UI
  win.loadFile('index.html')


  let mod = process.platform === 'darwin' ? 'Meta' : 'Alt'
  const {Menu, MenuItem} = require('electron')
  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'YOSHIDA',
    submenu: [{
      label: 'another',
      accelerator: `${mod}+D`,
      click: (menuItem, focusedWindow, event) => {
        console.log('Dev Tools')
        focusedWindow.webContents.openDevTools()
      }
    }]
  }))
  menu.append(new MenuItem({
    label: 'Actions',
    submenu: [{
      label: 'Close',
      accelerator: `${mod}+W`,
      click: (menuItem, focusedWindow, event) => {
        console.log('Closing')
        focusedWindow.close()
      }
    },
    {
      label: 'Full Screen',
      accelerator: `${mod}+F`,
      click: (menuItem, focusedWindow, event) => {
        console.log('Full Screen')
        let toggle = !focusedWindow.isSimpleFullScreen()
        focusedWindow.setSimpleFullScreen(toggle)
      }
    },
    {
      label: 'Reload',
      accelerator: `${mod}+R`,
      click: (menuItem, focusedWindow, event) => {
        console.log('Reload')
        focusedWindow.reload()
      }
    },
    {
      label: 'Toggle Movable',
      accelerator: `${mod}+M`,
      click: (menuItem, focusedWindow, event) => {
        console.log('Toggle Movable')
        // const { ipcMain } = require('electron');
        // ipcMain.send('toggleMovable')

				console.log("DONT USE THIS")
        // focusedWindow.webContents.insertCSS('html, body { \-webkit-app-region: drag!important; user-select: none!important;}')
      }
    },
    {
      label: 'Toggle Opacity',
      accelerator: `${mod}+O`,
      click: (menuItem, focusedWindow, event) => {
        console.log('Toggle Opacity')
        let toggle = focusedWindow.getOpacity()
        toggle = toggle === 0.5? 1.0: 0.5
        focusedWindow.setOpacity(toggle)
      }
    }]
  }))
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

