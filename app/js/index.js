'use strict';

var soundButtons = document.querySelectorAll('.button-sound');

for (var i = 0; i < soundButtons.length; i++) {
    var soundButton = soundButtons[i];
    var soundName = soundButton.attributes['data-sound'].value;

    prepareButton(soundButton, soundName);
}

function prepareButton(buttonEl, soundName) {
    buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

    var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
    buttonEl.addEventListener('click', function () {
        audio.currentTime = 0;
        audio.play();
    });
}

var ipc = require('electron').ipcRenderer;

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function () {
    ipc.send('close-main-window');
});


/*
ipc.on('global-shortcut',function(arg){
  var event = new MouseEvent('click');
  soundButtons[arg].dispatchEvent(event);
  console.log("button"+arg+"clicked");
});
*/

// it turns out that there must be a event argument in the function
ipc.on('global-shortcut',(event,buttonArg)=>{
    console.log('hit!');
    var event2= new MouseEvent('click');
    soundButtons[buttonArg].dispatchEvent(event2);
});
/*
ipc.on('global-shortcut',function (arg) {
    console.log('hit!');
    var event = new MouseEvent('click');
    soundButtons[arg].dispatchEvent(event);
});
*/
var settingsEl = document.querySelector('.settings');
settingsEl.addEventListener('click', function () {
    ipc.send('open-settings-window');
});

<<<<<<< HEAD

// var remote = require('electron').remote;
// var Tray = remote. require('tray');
// var Menu= remote. require('menu');

const{Tray,Menu}=require('electron').remote;
var path = require('path');

var trayIcon=null;

if (process.platform=='darwin'){
    trayIcon= new Tray(path.join(__dirname,'img/tray-iconTemplate.png'));
}else{
    trayIcon=new Tray(path.join(__dirname,'img/tray-icon-alt.png'));
=======
var remote = require('remote');
var Tray = remote.require('tray');
var Menu = remote.require('menu');
var path = require('path');

var trayIcon = null;

if (process.platform === 'darwin') {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-iconTemplate.png'));
}
else {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));
>>>>>>> 07-ready-for-packaging
}

var trayMenuTemplate = [
    {
        label: 'Sound machine',
        enabled: false
    },
    {
        label: 'Settings',
        click: function () {
            ipc.send('open-settings-window');
        }
    },
    {
        label: 'Quit',
        click: function () {
            ipc.send('close-main-window');
        }
    }
];
<<<<<<< HEAD

var trayMenu=Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);
=======
var trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);
>>>>>>> 07-ready-for-packaging
