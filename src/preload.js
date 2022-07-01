const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {

            // THIS IS NOT FIRING FOR SOME REASON

            console.log("Send Function !")
            // whitelist channels
            let validChannels = ["toMain:search"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        }
    }
);
