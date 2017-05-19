const commando = require('discord.js-commando');
const musicRole = require('../../config.json').musicRole;
const JukeBox = require('./JukeBox.js');

class PauseCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'pause',
      group: 'music',
      memberName: 'pause',
      description: 'Pauses the music playback.'
    });
  }

  hasPermission(msg) {
    return msg.member.roles.find('name', musicRole);
  }

  run(message, args) {
    if (!JukeBox.getPlayer().isPlaying()) {
      message.reply("awfully sorry, but I can't pause something that isn't playing. Because, you know... _logic_.");
      return;
    }
    JukeBox.getPlayer().getPlayerDispatcher().pause();
    message.channel.send("Paused the current song.");
  }
}

module.exports = PauseCommand;
