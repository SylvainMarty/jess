// dependencies
const electron = require('electron');
const fs = require("fs");
const path = require('path');
const url = require('url');
const properties = require("./src/properties.json");

// Module to control application life.
var app = electron.app;
// Module to create native browser window.
var BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
global.mainWindow = null;
global.os = {
    platform: process.platform, // 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
    arch: process.arch // 'arm', 'ia32', or 'x64'
};

function createWindow () {
    // Create the browser window.
    global.mainWindow = new BrowserWindow({width: 800, height: 600});
    var startFile = path.join(__dirname, 'index.html');

    if (!fs.existsSync(path.join(__dirname, properties.jekyll.binRootPath))) {
        console.log("Jekyll binaries not found, installation required.", path.join(__dirname, properties.jekyll.binRootPath));
        startFile = path.join(__dirname, 'install.html');
    }

    // and load the index.html of the app.
    global.mainWindow.loadURL(url.format({
        pathname: startFile,
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    global.mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    global.mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        global.mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (global.mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
