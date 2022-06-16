const { Menu, MenuItem, app, BrowserWindow, BrowserView } = require('electron');
const path = require('path');
const { v4: uuid } = require('uuid');

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

  // get os
  const os = process.platform
  const isMac = os === 'darwin'
  const mod = isMac ? 'Cmd' : 'Ctrl'

  // create menu
  let menu = [
  	new MenuItem({
		label: "New Tab",
		accelerator: `${mod}+t`,
		click: (menuItem, browserWindow, e) => {
			console.log("new tab")

  			// External website view
  			const view = new BrowserView()
  			mainWindow.addBrowserView(view) // only adding and removing from here on
  			view.setBounds({ x: 0, y: 0, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height})
  			view.setAutoResize({ width: true, height: true, horizontal: false, vertical: false})
  			view.webContents.loadURL("http://github.com");
  			view.setBackgroundColor('rgba(255, 255, 255, 0.5)')

			browserWindow.addBrowserView(view)
		}
	}),
  	new MenuItem({
		label: "Close",
		accelerator: `${mod}+w`,
		click: (menuItem, browserWindow, e) => {
			console.log("closing")
			let views = browserWindow.getBrowserViews()
			if (views.length <= 2) {browserWindow.close(); return}
			browserWindow.removeBrowserView(views[views.length - 1])
			console.log("closed")
		}
	}),
  	// new MenuItem({
		// label: "ViewTabs",
		// accelerator: `${mod}+g`,
		// click: (menuItem, browserWindow, e) => {
			// console.log("List tabs")

  	// 		let hidden = bookmarks.getBounds()
  	// 		hidden = hidden.width === 0
			// if (hidden) {
  	// 			bookmarks.setBounds({ x: 0, y: 0, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height})
			// } else {
  	// 			bookmarks.setBounds({ x: 0, y: 0, width: 0, height: 0 })
			// }
		// }
	// }),
  	new MenuItem({
		label: "Search",
		accelerator: `${mod}+s`,
		click: (menuItem, browserWindow, e) => {
			console.log("Search")

  			let hidden = controls.getBounds()
  			hidden = hidden.width === 0
			if (hidden) {
  				controls.setBounds({ x: 0, y: 0, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height})
			} else {
  				controls.setBounds({ x: 0, y: 0, width: 0, height: 0 })
			}
		}
	}),
  ]
  if (isMac) { menu.unshift( new MenuItem({ }) )}
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
