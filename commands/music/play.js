const commando = require('discord.js-commando');
const ytdl = require(require("../../config.json").downloader);
const musicRole = require('../../config.json').musicRole;
const JukeBox = require("./JukeBox.js")

class PlayCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'Starts playing the songs in the queue.'
    });
  }

  hasPermission(msg) {
    return msg.member.roles.find('name', musicRole);
  }

  run(message, args) {
    if (!JukeBox.joinedVoice()) {
      message.reply("...how am I supposed to play something if I'm not in voice. Some people... _sighs_");
      return;
    } else if (JukeBox.getPlayer().getQueue().getQueue().length == 0) {
      message.reply("the queue is currently empty. Add songs to it if you want me to play something. HOW IS THIS SO DIFFICULT");
      return;
    }

    if (!JukeBox.getPlayer().isPlaying()) {
      JukeBox.getPlayer().play();
      message.channel.send("Getting into your ears...");
    } else {
      message.reply("I'm already playing, ya dingus. Stop bugging me and pay attention.");
    }
  }

}

module.exports = PlayCommand;
