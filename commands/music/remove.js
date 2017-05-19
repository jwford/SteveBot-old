const commando = require('discord.js-commando');
const ytdl = require(require("../../config.json").downloader);
const musicRole = require('../../config.json').musicRole;
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

  hasPermission(msg) {
    return msg.member.roles.find('name', musicRole);
  }

  run(message, args) {
      var position = args.position;
      JukeBox.getPlayer().removeSong(position);
      message.channel.send("Removed the song at position " + position);
  }

}

module.exports = RemoveCommand;
