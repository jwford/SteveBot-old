const commando = require('discord.js-commando');

//var LOADDIR = "C:/Users/BoedJ/Music/porzgoret.mp3";

const ytdl = require("youtube-dl");
//const request = require("request");
//const MusicPlayer = require("./MusicPlayer.js");

const JukeBox = require("./JukeBox.js")

//var playList = require('./PriorityQueue.js');

//var dispatcher = null;

class PlayCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'Plays a song.'
    });
  }

  run(message, args) {

      var link = message.content.split(" ");
      link.splice(0, 1);
  		 link = link.join(" ");

      if (link.charAt(0) == '<') {
        link = link.substr(1).slice(0, -1);
      }

      //playSong(message, link);

      //JukeBox.getPlayer().addSong(link);

      //message.channel.sendMessage("Added " + musicPlayer.getQueue().getCurrentSong());

      //playList.add(link);

      JukeBox.getPlayer().play();



  /*      message.channel.sendMessage("Now playing: " + "<" + link + ">");

        var voiceChannel = message.guild.channels.find('name', '🐨 voice_1');



        voiceChannel.join()
        .then(connection => {
          var stream = ytdl(link);
          //dispatcher = connection.playStream(stream);
          musicPlayer.setPlayerDispatcher(dispatcher);
          playList.add(link);
          musicPlayer.play();
          //message.channel.sendMessage("Added " + playList.getQueue()[0]);
        })
        .catch(console.error);
*/
        //message.channel.sendMessage("Joining the voice party!");
        //message.channel.sendMessage("_Being a lil shitbag_");


  }

}

module.exports = PlayCommand;
