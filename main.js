console.log("STARTING MAIN PROCESS")

const { app, BrowserWindow, ipcMain } = require('electron')
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
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      nodeIntegration: true
      // nativeWindowOpen: true,
    }
  })

  // Load App UI
  win.loadFile('index.html')

  // get session for cache clearing
  const ses = win.webContents.session

  // let movable = []
  let movable = false
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
        focusedWindow.webContents.isDevToolsOpened()?
          focusedWindow.webContents.closeDevTools():
          focusedWindow.webContents.openDevTools();
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
      label: 'Toggle Opacity',
      accelerator: `${mod}+O`,
      click: (menuItem, focusedWindow, event) => {
        console.log('Toggle Opacity')
        let toggle = focusedWindow.getOpacity()
        toggle = toggle === 0.5? 1.0: 0.5
        focusedWindow.setOpacity(toggle)
      }
    },
    // MOVEMENT TOGGLE STILL REQUIRES A WINDOW RESIZE / SCROLL
    {
      label: 'Set Move',
      accelerator: `${mod}+M`,
      click: async (menuItem, focusedWindow, event) => {
        console.log('Set Move')
        // movable[0] = await focusedWindow.webContents.insertCSS('html, body { -webkit-app-region: drag; }')
        // movable[1] = await focusedWindow.webContents.insertCSS('html, body { user-select: none; }')

        // can be done in the renderer
        focusedWindow.webContents.send('fromMain', 'toggleMovable');
        ipcMain.on('toMain', (evt, message) => {
          ses.clearCache() // doesnt work, still need to resize window before draggable is toggled
        });
      }
    },
    {
      label: 'Unset Move',
      accelerator: `${mod}+N`,
      click: async (menuItem, focusedWindow, event) => {
        console.log('Unset Move')
        // focusedWindow.webContents.removeInsertedCSS(movable[0])
        // focusedWindow.webContents.removeInsertedCSS(movable[1])
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
