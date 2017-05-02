const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class HelpCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'help',
      group: 'everyone',
      memberName: 'help',
      description: 'Gives a link to Steve\'s help doc.'
    });
  }

  run(msg) {
    var user = msg.member;
    const embed = new RichEmbed()
    .setColor(0x348dd1)
    .addField(`Here's Steve's help doc, ${user.displayName}`, '<https://goo.gl/6uVVI1>', true);
    msg.channel.send({embed});
  }
};
