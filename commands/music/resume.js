const commando = require('discord.js-commando');
const musicRole = require('../../config.json').musicRole;
const JukeBox = require('./JukeBox.js');

class ResumeCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'resume',
      group: 'music',
      memberName: 'resume',
      description: 'Resumes the music playback.'
    });
  }

  hasPermission(msg) {
    return msg.member.roles.find('name', musicRole);
  }

  run(message, args) {

    if (!JukeBox.getPlayer().isPlaying()) {
      message.reply("I'm afraid there's nothing to resume at the moment, buddy. Better luck next time.");
      return;
    }

    JukeBox.getPlayer().getPlayerDispatcher().resume();
    message.channel.send("Resumed playing the current song.");
  }
}

module.exports = ResumeCommand;
