const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class RavenclawCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'ravenclaw',
      group: 'hogwartia',
      memberName: 'ravenclaw',
      description: 'Adds a member to the Ravenclaw role.'
    });
  }

  run (msg) {
    if (msg.guild.name !== 'Hogwartia') return msg.reply('you\'re in the wrong server, bud.');

    var member = msg.member;
    var gryffindor = msg.guild.roles.find('name', 'Gryffindor');
    var ravenclaw = msg.guild.roles.find('name', 'Ravenclaw');
    var hufflepuff = msg.guild.roles.find('name', 'Hufflepuff');
    var slytherin = msg.guild.roles.find('name', 'Slytherin');

    if (member.roles.get(ravenclaw.id)) return msg.reply('you\'re already in this house, check your common room!');
    if (member.roles.get(gryffindor.id) || member.roles.get(hufflepuff.id) || member.roles.get(slytherin.id)) return msg.reply('you\'re already in another house. No double dipping!');

    member.addRole(ravenclaw);

    var commonroom = msg.guild.channels.find('name', 'ravenclaw_common_room');
    if (!commonroom) return msg.reply('Something went wrong here. I don\'t see a common room for that house.');
    const embed = new RichEmbed()
    .setTitle(`${member.displayName} has been sorted into Ravenclaw House!`)
    .setColor(0x2971e5)
    .setTimestamp();
    commonroom.send({embed});
  }
};
