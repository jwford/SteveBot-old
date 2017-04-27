const commando = require('discord.js-commando');

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

  run(message, args) {
    JukeBox.getPlayer().getPlayerDispatcher().resume();
    message.channel.send("Resumed playing the current song.");
  }
}

module.exports = ResumeCommand;
