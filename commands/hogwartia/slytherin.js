const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class SlytherinCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'slytherin',
      group: 'hogwartia',
      memberName: 'slytherin',
      description: 'Adds a member to the Slytherin role.'
    });
  }

  run (msg) {
    if (msg.guild.name !== 'Hogwartia') return msg.reply('you\'re in the wrong server, bud.');

    var member = msg.member;
    var gryffindor = msg.guild.roles.find('name', 'Gryffindor');
    var ravenclaw = msg.guild.roles.find('name', 'Ravenclaw');
    var hufflepuff = msg.guild.roles.find('name', 'Hufflepuff');
    var slytherin = msg.guild.roles.find('name', 'Slytherin');

    if (member.roles.get(slytherin.id)) return msg.reply('you\'re already in this house, check your common room!');
    if (member.roles.get(ravenclaw.id) || member.roles.get(hufflepuff.id) || member.roles.get(gryffindor.id)) return msg.reply('you\'re already in another house. No double dipping!');

    member.addRole(slytherin);

    var commonroom = msg.guild.channels.find('name', 'slytherin_common_room');
    if (!commonroom) return msg.reply('Something went wrong here. I don\'t see a common room for that house.');
    const embed = new RichEmbed()
    .setTitle(`${member.displayName} has been sorted into Slytherin House!`)
    .setColor(0x228900)
    .setTimestamp();
    commonroom.send({embed});
  }
};
