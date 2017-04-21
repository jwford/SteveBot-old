const commando = require('discord.js-commando');
const JukeBox = require("./JukeBox.js");

const musicChannel = '🎵 music';

class MusicCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'music',
      group: 'music',
      memberName: 'music',
      description: 'Starts up a music session.'
    });
  }

  run(message, args) {
    var voiceChannel = message.guild.channels.find('name', musicChannel);

    JukeBox.startPlayer(voiceChannel);

    JukeBox.getPlayer().joinVoiceChannel();

    message.channel.sendMessage("Joined " + voiceChannel + ". Ready to play!");
    console.log("Ready to play... ");
  }
}

module.exports = MusicCommand;
