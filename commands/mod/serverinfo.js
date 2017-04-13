const commando = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class ServerInfoCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'serverinfo',
      group: 'mod',
      memberName: 'serverinfo',
      description: 'Displays information about the server.'
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS');
  }

  run(msg) {
    const createdDate = new Date(msg.guild.createdTimestamp);
    const embed = new discord.RichEmbed()
    .setTitle(`${msg.guild.name}`)
    .setColor(0x000000)
    .addField('Name:', msg.guild.name)
    .addField('ID:', msg.guild.id)
    .addField('Owner:', msg.guild.owner)
    .addField('Members:', msg.guild.memberCount)
    .addField('Channels:', msg.guild.channels.size)
    .addField('Region:', msg.guild.region)
    .addField('Roles:', msg.guild.roles.size)
    .addField('Created on:', createdDate);
    msg.channel.sendEmbed(embed);
  }
};
