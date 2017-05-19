const discord = require('discord.js');
const Queue = require("./PriorityQueue.js");
const ytdl = require(require("../../config.json").downloader);

const musicTextChannel = 'music';

class MusicPlayer {

  constructor(voiceChannel) {
    this.queue = new Queue();
    this.voiceChannel = voiceChannel;
    this.playing = false;
    this.skipVotes = new Set();
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

  async addSong(song, user) {
    //var newSong = this.getQueue().getQueue()[-1];

    var newSong = this.getQueue().add(song, user);
    var that = this;
    newSong.then( function(newSong) {
      var songTitle = '[' + newSong.getTitle() + ']' + '(' + newSong.getUrl() + ')';

      let channel = user.lastMessage.channel;

      let requests = that.getQueue().getUsers().get(user);
      let songString = ' song';
      if (requests > 1) songString = songString + 's';

      let embed = new discord.RichEmbed()
      .setColor(0x4b42f4)
      .addField("Song added:" , songTitle + ' [' + newSong.getDuration() + ']', false)
      .addField("Requested by:", user + " [" + "requested " + requests + songString + " out of " + that.getQueue().getQueue().length + " in the current queue" + "]", false);
      channel.send({embed});
    });
  }

  removeSong(position) {
    this.getQueue().remove(position);
    console.log("Removed a song");
  }

  async addPlaylist(link) {
    var stream = ytdl(link);
    console.log("Added playlist");
    var that = this;

  /*  stream.on('next', function(next) {
      that.getVoiceChannel().connection.playStream(next);
    }); */

    this.getVoiceChannel().connection.playStream(stream);

    stream.on('next', this.addPlaylist());

  /*  stream.on('next', () => {
      that.getVoiceChannel().connection.playStream(stream);
      console.log("Playing the next song");
    }); */

  }

  search(song, user) {
    var search = 'gvsearch1:' + song;
    var that = this;
    ytdl.getInfo(search, function(err, info) {
      if (err) console.log(err);
      if (info == undefined) {
        user.lastMessage.reply('welp, that didn\'t work. Try another query.');
        return;
      }
      let link = 'https://www.youtube.com/watch?v=' + info.id;
      that.addSong(link, user);
    });
  }

  async play() {
    this.playing = true;
    var args = ["-f bestaudio"];
    var stream = ytdl(this.getQueue().getCurrentSongURL(), args);
    //console.log(stream);
    try {
      var dispatcher = this.getVoiceChannel().connection.playStream(stream);
    } catch(e) {
      console.log(e);
    }
    this.setPlayerDispatcher(dispatcher);

    this.setMusicChannelTopic("Playing " + this.getQueue().getCurrentSongTitle());

    var size = 0;
    var duration = 0;

    stream.on('info', function(info) {
      size = info.size;
      console.log(size);
      duration = info.duration;
    });

    var pos = 0;
    var currentPercent;

    var that = this;

    stream.on('data', function data(chunk) {
      pos += chunk.length;
      if (size) {
        var percent = Math.floor(pos/size * 100);
        if (percent != currentPercent) {
          currentPercent = percent;
          if(that.isPlaying())
            that.setMusicChannelTopic("Playing " + that.getQueue().getCurrentSongTitle() + ' | '+ percent + '%' + ' of ' + duration);
        }
        //console.log(percent + '%' + ' | ' + duration);
      }
    });

    dispatcher.once('end', () => {
      this.setMusicChannelTopic('🎵');
      this.skipVotes.clear();
      var queueLength = this.getQueue().getQueue().length;
      if (queueLength > 0) {
        this.removeSong(1);
        this.playing = false;
        if (queueLength > 1) {
          this.play();
          this.setMusicChannelTopic("Playing " + this.getQueue().getCurrentSongTitle());
        }
      }
    });
  }

  isPlaying() {
    return this.playing;
  }

  skip() {
    var skippedSong = this.getQueue().getCurrentSongTitle();
    this.getPlayerDispatcher().end();
    return skippedSong;
  }

  getSkipVotes() {
    return this.skipVotes.size;
  }

  addSkipVote(user) {
    //if (!this.skipVotes.has(user))
    this.skipVotes.add(user);
  }

  stop() {
    this.getPlayerDispatcher().end();
    this.getQueue().empty();
  }

  setMusicChannelTopic(topic) {
    var channel = this.getVoiceChannel().guild.channels.find('name', musicTextChannel);
    channel.setTopic(topic);
  }

}

module.exports = MusicPlayer;
