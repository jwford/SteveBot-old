const commando = require('discord.js-commando');
const JukeBox = require('./JukeBox.js');

class SkipCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'skip',
      group: 'music',
      memberName: 'skip',
      description: 'Skips the current song.'
    });
  }

  run(message, args) {
    let skippedSong = JukeBox.getPlayer().skip();
    message.channel.send("Skipped " + skippedSong);
  }
}

module.exports = SkipCommand;
