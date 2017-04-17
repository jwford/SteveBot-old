const Queue = require("./PriorityQueue.js");
const ytdl = require("youtube-dl");

//let playList;

let connection;

let playerDispatcher;

//var voiceChannel;

  //var currentSong;
  //var connection;

class MusicPlayer {

  constructor(voiceChannel) {
    this.queue = new Queue();
    this.voiceChannel = voiceChannel;
  }

  getQueue() {
    return this.queue;
  }

  getPlayerDispatcher() {
    return this.playerDispatcher;
  }

  setPlayerDispatcher(dispatcher) {
    this.playerDispatcher = dispatcher;
  }

  setConnection(connection) {
    this.connection = connection;
    console.log("Connection set...");
  }

  getConnection() {
    return this.connection;
  }

  joinVoiceChannel() {
    this.getVoiceChannel().join().then(connection => {
      this.setConnection(connection);
    });
    console.log("Joined voice channel " + this.getVoiceChannel());
  }

  getVoiceChannel() {
    return this.voiceChannel;
  }

  addSong(song) {
    this.getQueue().add(song);
  }

  removeSong(pos) {
    this.getQueue().getQueue().splice(pos, 1);
    this.getQueue().getTitles().splice(pos, 1);
  }

  async play() {
    var stream = ytdl(this.getQueue().getCurrentSong());
    try {
      var dispatcher = this.getVoiceChannel().connection.playStream(stream);
    } catch(e) {
      console.log(e);
    }
    this.setPlayerDispatcher(dispatcher);

    dispatcher.once('end', () => {
      this.skip();
    });
  }

  skip() {
    //removes first element of array
    var skippedSong = this.getQueue().getCurrentSongTitle();
    this.removeSong(0);
    this.play();
    return skippedSong;
  }

}

//function play

//module.exports = {
  //getQueue, getPlayerDispatcher, setPlayerDispatcher, joinVoiceChannel, addSong, play
//};

module.exports = MusicPlayer;

//export {dispatcher};

//module.exports = MusicPlayer;