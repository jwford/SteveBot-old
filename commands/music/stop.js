const commando = require('discord.js-commando');

const musicPlayer = require('./MusicPlayer.js');

class StopCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'stop',
      group: 'music',
      memberName: 'stop',
      description: 'Adds a song to the queue.'
    });
  }

  run(message, args) {
    musicPlayer.getPlayerDispatcher().end();
    message.channel.sendMessage("Stopped the current song");
  }
}

module.exports = StopCommand;
