const fs = require('fs');
const os = require('os');
const path = require('path');
const {exec} = require('child_process');
const pkg = require('../package.json');
const messages = require('./messages.json');

const homePath = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
const soundPath = path.join(homePath, '.normit');

module.exports = {
  save: function(soundBinary) {
    if(!fs.existsSync(soundPath)){
      fs.mkdirSync(soundPath);
    }
    fs.writeFileSync(path.join(soundPath, 'sound_response.mp3'), soundBinary, 'binary');
  },
  play: function() {
    var noPlayer = false;
    var osp = os.platform();
    var osIndex = null;
    if (osp.slice(0,3) == "win") {
      osIndex = 0;   // some version of windows
    } else if (osp === "darwin")
      osIndex = 1;   // some version of Mac
    else {
      osIndex = 2;   // some version of linux
    }

    exec((osIndex ? "which" : "where") + " mpg123", function (error, stdout, stderr) {
      if (stdout.indexOf('mpg123') === -1) {
        console.log(messages[["noPlayerWin", "noPlayerMac", "noPlayerOther"][osIndex]]);
        return;
      }
      exec(`mpg123 -q ${path.join(soundPath, 'sound_response.mp3')}`);
    });
  }
};
