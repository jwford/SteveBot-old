// const Queue = require("./PriorityQueue.js");
// const ytdl = require("youtube-dl");
//
// const musicTextChannel = 'music';
//
// class MusicPlayer {
//
//   constructor(voiceChannel) {
//     this.queue = new Queue();
//     this.voiceChannel = voiceChannel;
//   }
//
//   getQueue() {
//     return this.queue;
//   }
//
//   getPlayerDispatcher() {
//     return this.playerDispatcher;
//   }
//
//   setPlayerDispatcher(dispatcher) {
//     this.playerDispatcher = dispatcher;
//   }
//
//   setConnection(connection) {
//     this.connection = connection;
//     console.log("Connection set...");
//   }
//
//   getConnection() {
//     return this.connection;
//   }
//
//   joinVoiceChannel() {
//     this.getVoiceChannel().join().then(connection => {
//       this.setConnection(connection);
//     });
//     console.log("Joined voice channel " + this.getVoiceChannel());
//   }
//
//   getVoiceChannel() {
//     return this.voiceChannel;
//   }
//
//   addSong(song) {
//     this.getQueue().add(song);
//   }
//
//   removeSong(pos) {
//     this.getQueue().getQueue().splice(pos, 1);
//     this.getQueue().getTitles().splice(pos, 1);
//     console.log("Removed a song");
//   }
//
//   async addPlaylist(link) {
//     var stream = ytdl(link);
//     console.log("Added playlist");
//     var that = this;
//
//   /*  stream.on('next', function(next) {
//       that.getVoiceChannel().connection.playStream(next);
//     }); */
//
//     this.getVoiceChannel().connection.playStream(stream);
//
//     stream.on('next', this.addPlaylist);
//
//
//
//   /*  stream.on('next', () => {
//       that.getVoiceChannel().connection.playStream(stream);
//       console.log("Playing the next song");
//     }); */
//
//   }
//
//   async play() {
//     var stream = ytdl(this.getQueue().getCurrentSong());
//     try {
//       var dispatcher = this.getVoiceChannel().connection.playStream(stream);
//     } catch(e) {
//       console.log(e);
//     }
//     this.setPlayerDispatcher(dispatcher);
//
//     this.setMusicChannelTopic("Playing " + this.getQueue().getCurrentSongTitle());
//
//     var size = 0;
//     var duration = 0;
//
//     stream.on('info', function(info) {
//       size = info.size;
//       duration = info.duration;
//     });
//
//     var pos = 0;
//     var currentPercent;
//
//     var that = this;
//
//     stream.on('data', function data(chunk) {
//       pos += chunk.length;
//       if (size) {
//         var percent = Math.floor(pos/size * 100);
//         if (percent != currentPercent) {
//           currentPercent = percent;
//           that.setMusicChannelTopic("Playing " + that.getQueue().getCurrentSongTitle() + ' | '+ percent + '%' + ' of ' + duration);
//         }
//         //console.log(percent + '%' + ' | ' + duration);
//       }
//     });
//
//     dispatcher.once('end', () => {
//       this.setMusicChannelTopic('🎵');
//       var queueLength = this.getQueue().getQueue().length;
//       if (queueLength > 0) {
//         this.removeSong(0);
//         if (queueLength > 1) {
//           this.play();
//           this.setMusicChannelTopic("Playing " + this.getQueue().getCurrentSongTitle());
//         }
//       }
//     });
//   }
//
//   skip() {
//     var skippedSong = this.getQueue().getCurrentSongTitle();
//     this.getPlayerDispatcher().end();
//     return skippedSong;
//   }
//
//   stop() {
//     this.getPlayerDispatcher().end();
//     this.getQueue().empty();
//   }
//
//   setMusicChannelTopic(topic) {
//     var channel = this.getVoiceChannel().guild.channels.find('name', musicTextChannel);
//     channel.setTopic(topic);
//   }
//
// }
//
// module.exports = MusicPlayer;
