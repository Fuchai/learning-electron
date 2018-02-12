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
