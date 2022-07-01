const { Menu, MenuItem, BrowserView } = require('electron');

function create(mainWindow, controls) {

  // get os
  const os = process.platform
  const isMac = os === 'darwin'
  const mod = isMac ? 'Cmd' : 'Ctrl'

  let subMenuTemplate = [
    {
      label: "New Tab",
      accelerator: `${mod}+T`,
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
    },
    {
      label: "Close",
      accelerator: `${mod}+W`,
      click: (menuItem, browserWindow, e) => {
        console.log("closing")
        let views = browserWindow.getBrowserViews()
        if (views.length <= 2) {browserWindow.close(); return}
        browserWindow.removeBrowserView(views[views.length - 1])
        console.log("closed")
      }
    },
    {
      label: "Search",
      accelerator: `${mod}+S`,
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
    },
    {
      label: "Inspect",
      accelerator: `${mod}+I`,
      click: (menuItem, browserWindow, e) => {
        console.log("toggleDevTools")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.toggleDevTools()
      }
    },
    {
      label: "Reload",
      accelerator: `${mod}+R`,
      click: (menuItem, browserWindow, e) => {
        console.log("reload")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.reload()
      }
    },
    {
      label: "Hard Reload",
      accelerator: `${mod}+Shift+R`,
      click: (menuItem, browserWindow, e) => {
        console.log("Hard Reload")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.reloadIgnoringCache()
      }
    },
    {
      label: "Undo",
      accelerator: `${mod}+Z`,
      click: (menuItem, browserWindow, e) => {
        console.log("undo")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.undo()
      }
    },
    {
      label: "Redo",
      accelerator: `${mod}+Shift+Z`,
      click: (menuItem, browserWindow, e) => {
        console.log("redo")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.redo()
      }
    },
    {
      label: "Forward",
      accelerator: `${mod}+L`,
      click: (menuItem, browserWindow, e) => {
        console.log("Forward")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.goForward()
      }
    },
    {
      label: "Backward",
      accelerator: `${mod}+H`,
      click: (menuItem, browserWindow, e) => {
        console.log("Backward")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.goBack()
      }
    },
    {
      label: "Cut",
      accelerator: `${mod}+X`,
      click: (menuItem, browserWindow, e) => {
        console.log("Cut")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.cut()
      }
    },
    {
      label: "Copy",
      accelerator: `${mod}+C`,
      click: (menuItem, browserWindow, e) => {
        console.log("Copy")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.copy()
      }
    },
    {
      label: "Paste",
      accelerator: `${mod}+V`,
      click: (menuItem, browserWindow, e) => {
        console.log("Paste")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.paste()
      }
    },
    {
      label: "Paste and Match",
      accelerator: `${mod}+Shift+V`,
      click: (menuItem, browserWindow, e) => {
        console.log("Paste and Match")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.pasteAndMatchStyle()
      }
    },
    {
      label: "Select All",
      accelerator: `${mod}+A`,
      click: (menuItem, browserWindow, e) => {
        console.log("Select All")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.selectAll()
      }
    },
    {
      label: "Find",
      accelerator: `${mod}+F`,
      click: (menuItem, browserWindow, e) => {
        // https://www.electronjs.org/docs/latest/api/web-contents#contentsfindinpagetext-options
        // can cycle forward and backwards through the matches
        console.log("Find")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.findInPage("disney")
        // Need to have some inter-process comms here
        // React component to take a string for Search
        // pass that string to this menu function
      }
    },
    {
      label: "Reverse Find",
      accelerator: `${mod}+Shift+F`,
      click: (menuItem, browserWindow, e) => {
        console.log("Reverse Find")
        let views = browserWindow.getBrowserViews()
        views[1].webContents.findInPage("disney", {forward: false})
      }
    }
    // views[1].webContents.inspectElement(x, y)
  ]

  let menuTemplate = [
    { label: "other" },
    {
      label: "other",
      submenu: subMenuTemplate
    }
  ]

  return menuTemplate
}

module.exports = {
  create
}
