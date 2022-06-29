const { Menu, MenuItem } = require('electron');

function createMenu() {

	let menu = new Menu();

	// get os
	const os = process.platform;
	const isMac = os === 'darwin';
	const mod = isMac ? 'Cmd' : 'Ctrl';

	if (isMac) { menu.append( new MenuItem({ label: "" }) ) }

	menu.append( new MenuItem({
		label: "New Tab",
		accelerator: `${mod}+T`,
		click: (menuItem, browserWindow, e) => {
			console.log("new tab");

			// // External website view
			// const view = new BrowserView()
			// mainWindow.addBrowserView(view) // only adding and removing from here on
			// view.setBounds({ x: 0, y: 0, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height})
			// view.setAutoResize({ width: true, height: true, horizontal: false, vertical: false})
			// view.webContents.loadURL("http://github.com");
			// view.setBackgroundColor('rgba(255, 255, 255, 0.5)')

			// browserWindow.addBrowserView(view)
		}
	}));
	menu.append( new MenuItem({
		label: "Close",
		accelerator: `${mod}+W`,
		click: (menuItem, browserWindow, e) => {
			console.log("closing");
			// let views = browserWindow.getBrowserViews()
			// if (views.length <= 2) {browserWindow.close(); return}
			// browserWindow.removeBrowserView(views[views.length - 1])
			// console.log("closed")
		}
	}));
	menu.append( new MenuItem({
		label: "Search",
		accelerator: `${mod}+S`,
		click: (menuItem, browserWindow, e) => {
			console.log("Search");

			// let hidden = controls.getBounds()
			// hidden = hidden.width === 0
			// if (hidden) {
			// 	controls.setBounds({ x: 0, y: 0, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height})
			// } else {
			// 	controls.setBounds({ x: 0, y: 0, width: 0, height: 0 })
			// }
		}
	}));

	return menu;
}

module.exports = {
	createMenu
 }




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