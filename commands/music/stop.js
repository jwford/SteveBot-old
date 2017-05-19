const commando = require('discord.js-commando');
const musicRole = require('../../config.json').musicRole;
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

  hasPermission(msg) {
    return msg.member.roles.find('name', musicRole);
  }

  run(message, args) {
    JukeBox.stopPlayer();
    message.channel.send("Stopped the current song and cleared the queue.");
  }
}

module.exports = StopCommand;
