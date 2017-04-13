const commando = require('discord.js-commando');

//var LOADDIR = "C:/Users/BoedJ/Music/porzgoret.mp3";

const ytdl = require("youtube-dl");
const request = require("request");

var dispatcher = null;

//var priorityqueue = require('./PriorityQueue');

class PlayCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'Plays a song.'
    });

    function playSong(message, link) {

      var voiceChannel = message.guild.channels.find('name', '🐨 voice_1');

      voiceChannel.join()
      .then(connection => {
        var stream = ytdl(link);
        dispatcher = connection.playStream(stream);
      })
      .catch(console.error);

      message.channel.sendMessage("Now playing: " + "<" + link + ">");

      message.channel.sendMessage("Joining the voice party!");
      message.channel.sendMessage("_Being a lil shitbag_");

    }

  }



  async run(message, args) {

      if (args == "stop") {
        dispatcher.end();
      } else {
        var link = message.content.split(" ");
        link.splice(0, 1);
  		  link = link.join(" ");

        if (link.charAt(0) == '<') {
          link = link.substr(1).slice(0, -1);
        }

        //playSong(message, link);

        message.channel.sendMessage("Now playing: " + "<" + link + ">");

        var voiceChannel = message.guild.channels.find('name', '🐨 voice_1');

        voiceChannel.join()
        .then(connection => {
          var stream = ytdl(link);
          dispatcher = connection.playStream(stream);
        })
        .catch(console.error);

        message.channel.sendMessage("Joining the voice party!");
        message.channel.sendMessage("_Being a lil shitbag_");

      }
  }

}

module.exports = PlayCommand;
