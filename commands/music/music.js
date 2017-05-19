const commando = require('discord.js-commando');
const JukeBox = require("./JukeBox.js");
const musicRole = require('../../config.json').musicRole;
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

  hasPermission(msg) {
    return msg.member.roles.find('name', musicRole);
  }

  run(message, args) {
    var voiceChannel = message.guild.channels.find('name', musicChannel);

    JukeBox.startPlayer(voiceChannel);

    JukeBox.getPlayer().joinVoiceChannel();

    message.channel.send("Joined " + voiceChannel + ". Ready to play!");
    console.log("Ready to play... ");
  }
}

module.exports = MusicCommand;
