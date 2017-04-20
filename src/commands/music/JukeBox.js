const MusicPlayer = require("./MusicPlayer.js");

var player;

function startPlayer(voiceChannel) {
  this.player = new MusicPlayer(voiceChannel);
}

function getPlayer() {
  return this.player;
}

function stopPlayer() {
  this.getPlayer().stop();
}

module.exports = {startPlayer,getPlayer, stopPlayer};
