console.log("STARTING PRELOAD PROCESS")
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }
//
//   for (const dependency of ['chrome', 'node', 'electron']) {
//     replaceText(`${dependency}-version`, process.versions[dependency])
//   }
// })




const {
    contextBridge,
    ipcRenderer
} = require("electron");

// // Expose protected methods that allow the renderer process to use
// // the ipcRenderer without exposing the entire object

// This is very insecure!
contextBridge.exposeInMainWorld("ipcRenderer", {
  "on": (channel, func) => {ipcRenderer.on(channel, func)},
  "send": (channel, data) => {ipcRenderer.send(channel, data)}
});
    // "api", {
    //     send: (channel, data) => {
    //         // whitelist channels
    //         let validChannels = ["toMain"];
    //         if (validChannels.includes(channel)) {
    //             ipcRenderer.send(channel, data);
    //         }
    //     },
    //     receive: (channel, func) => {
    //         let validChannels = ["fromMain"];
    //         if (validChannels.includes(channel)) {
    //             // Deliberately strip event as it includes `sender`
    //             ipcRenderer.on(channel, (event, ...args) => fn(...args));
    //         }
    //     }
    // }
// );

// const { ipcRenderer } = window.require("electron");


// window.ipcRenderer = require("electron").ipcRenderer;
