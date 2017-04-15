const queue = require("./PriorityQueue.js");
const ytdl = require("youtube-dl");

//let playList;

let connection;

let playerDispatcher;

let voiceChannel;

  //var currentSong;
  //var connection;

function getQueue() {
  return queue.getQueue();
}

function getPlayerDispatcher() {
  return this.playerDispatcher;
}

function setPlayerDispatcher(dispatcher) {
  this.playerDispatcher = dispatcher;
}

function setConnection(connection) {
  this.connection = connection;
  console.log("Connection set...");
}

function getConnection() {
  return this.connection;
}

function joinVoiceChannel(voiceChannel) {
  this.voiceChannel = voiceChannel;
  this.voiceChannel.join().then(connection => {
    setConnection(connection);
  });
  console.log("Joined voice channel...");
}

function getVoiceChannel() {
  return this.voiceChannel;
}

function addSong(song) {
  queue.add(song);
}

function play() {
  let stream = ytdl(queue.getCurrentSong());
  let dispatcher = this.connection.playStream(stream);
  setPlayerDispatcher(dispatcher);
}

//function play

module.exports = {
  getQueue, getPlayerDispatcher, setPlayerDispatcher, joinVoiceChannel, addSong, play
};

//export {dispatcher};

//module.exports = MusicPlayer;
