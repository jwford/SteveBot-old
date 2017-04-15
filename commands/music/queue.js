const discord = require('discord.js');
const commando = require('discord.js-commando');

const JukeBox = require("./JukeBox.js");

class QueueCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'queue',
      group: 'music',
      memberName: 'queue',
      description: 'Displays the current queue.'
    });
  }

  run(message, args) {

    let songList = "Blah blah";

    let channel = message.channel;

    let embed = new discord.RichEmbed()
    .setTitle("Current queue:")
    .setColor(0x4b42f4)
    .addField('Songs:', songList, true);
    channel.sendEmbed(embed);

  }
}

module.exports = QueueCommand;
