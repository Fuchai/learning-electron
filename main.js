'use strict';

var configuration = require('./configuration');

//var app = require('electron').app;
//var BrowserWindow = require('electron').BrowserWindow

var mainWindow = null;
//var globalShortcut = require('electron').GlobalShortcut;

const{app,globalShortcut,BrowserWindow}=require('electron');

app.on('ready', function() {
    if (!configuration.readSettings('shortcutKeys')) {
        configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
    }

    mainWindow = new BrowserWindow({
        frame: false,
        height: 700,
        resizable: false,
        width: 368
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    globalShortcut.register('ctrl+shift+1',function(){
      mainWindow.webContents.send('global-shortcut',1);
      console.log("ctrl+shift+1 sent");
    });

    globalShortcut.register('ctrl+shift+2',function(){
      mainWindow.webContents.send('global-shortcut',2);
    });

    setGlobalShortcuts();

});

function setGlobalShortcuts() {
    // reads the configuration file and registers the
    globalShortcut.unregisterAll();

    var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
    var shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

    globalShortcut.register(shortcutPrefix + '1', function () {
        mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register(shortcutPrefix + '2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });
}

var ipc = require('electron').ipcMain;

ipc.on('close-main-window', function () {
    app.quit();
});

ipc.on('set-global-shortcuts',function(){
    setGlobalShortcuts();
})
