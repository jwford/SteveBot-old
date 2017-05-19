const MusicPlayer = require("./MusicPlayer.js");

var player;
var inVoice = false;

function startPlayer(voiceChannel) {
  this.player = new MusicPlayer(voiceChannel);
  this.inVoice = true;
}

function getPlayer() {
  return this.player;
}

function stopPlayer() {
  this.getPlayer().stop();
}

function joinedVoice() {
  return this.inVoice;
}

module.exports = {startPlayer, getPlayer, stopPlayer, joinedVoice};
