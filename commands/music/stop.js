const commando = require('discord.js-commando');

const JukeBox = require('./JukeBox.js');

class StopCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'stop',
      group: 'music',
      memberName: 'stop',
      description: 'Stops playing the current song and clears the queue.'
    });
  }

  run(message, args) {
    JukeBox.stopPlayer();
    message.channel.sendMessage("Stopped the current song and cleared the queue.");
  }
}

module.exports = StopCommand;
