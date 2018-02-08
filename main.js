'use strict';

//var app = require('electron').app;
//var BrowserWindow = require('electron').BrowserWindow

var mainWindow = null;
//var globalShortcut = require('electron').GlobalShortcut;

const{app,globalShortcut,BrowserWindow}=require('electron');

app.on('ready', function() {
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
});

var ipc = require('electron').ipcMain;

ipc.on('close-main-window', function () {
    app.quit();
});
