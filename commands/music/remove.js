const commando = require('discord.js-commando');
const ytdl = require("ytdl-core");
const JukeBox = require("./JukeBox.js")

class RemoveCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'remove',
      group: 'music',
      memberName: 'remove',
      description: 'Removes the specified song from the queue.',
      args: [{
        key: 'position',
        label: 'song position',
        prompt: 'Which song should I remove?',
        type: 'integer'
      }]
    });
  }

  run(message, args) {
      var position = args.position;
      JukeBox.getPlayer().removeSong(position);
      message.channel.send("Removed the song at position " + position);
  }

}

module.exports = RemoveCommand;
