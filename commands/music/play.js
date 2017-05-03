const commando = require('discord.js-commando');
const ytdl = require("ytdl-core");
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

  run(message, args) {
      JukeBox.getPlayer().play();
      message.channel.send("Getting into your ears...");
  }

}

module.exports = PlayCommand;
