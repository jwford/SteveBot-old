const Queue = require("./PriorityQueue.js");
const ytdl = require("youtube-dl");

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
    console.log("Removed a song");
  }

  async addPlaylist(link) {
    var stream = ytdl(link);
    this.getVoiceChannel().connection.playStream(stream);
    console.log("Added playlist");
    var that = this;

  /*  stream.on('next', () => {
      this.getVoiceChannel().connection.playStream(stream);
      console.log("Playing the next song");
    }); */

    stream.on('next', () => {
        that.getVoiceChannel().connection.playStream(stream);
        console.log("Playing the next song");
      });

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
      var queueLength = this.getQueue().getQueue().length;
      if (queueLength > 0) {
        this.removeSong(0);
        if (queueLength > 1) this.play();
      }
    });
  }

  skip() {
    var skippedSong = this.getQueue().getCurrentSongTitle();
    this.getPlayerDispatcher().end();
    return skippedSong;
  }

  stop() {
    this.getPlayerDispatcher().end();
    this.getQueue().empty();
  }

}

module.exports = MusicPlayer;
