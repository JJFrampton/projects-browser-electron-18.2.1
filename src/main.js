const { Menu, MenuItem, app, BrowserWindow, BrowserView } = require('electron');
const path = require('path');
const { v4: uuid } = require('uuid');
let applicationMenu = require('./components/application-menu')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
	frame: false
  });

  // and load the index.html of the app.
  // mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  let mainViews = []

  // Controls
  const controls = new BrowserView()
  mainWindow.setBrowserView(controls)
  controls.setBounds({ x: 0, y: 0, width: 0, height: 0 })
  controls.setAutoResize({ width: true, height: true, horizontal: false, vertical: false})
  controls.webContents.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  controls.setBackgroundColor('rgba(255, 255, 255, 0.5)')
  let id = uuid()
  mainViews.push({ id: controls})

  // External website view
  const view = new BrowserView()
  mainWindow.addBrowserView(view) // only adding and removing from here on
  view.setBounds({ x: 0, y: 0, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height})
  view.setAutoResize({ width: true, height: true, horizontal: false, vertical: false})
  view.webContents.loadURL("http://google.com");
  view.setBackgroundColor('rgba(255, 255, 255, 0.5)')
  id = uuid()
  mainViews.push({ id: view })

  // Set controls to top layer?
  mainWindow.setTopBrowserView(controls)

  // Create and set menu
  let menu = applicationMenu.create(mainWindow, controls)
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))

};



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
