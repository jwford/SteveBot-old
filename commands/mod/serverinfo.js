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
    const embed = new discord.RichEmbed()
    .setTitle('Server Information')
    .setThumbnail(msg.guild.iconURL)
    .setURL('http://tuataria.com')
    .setColor(0x80af18)
    .addField('Name:', msg.guild.name, true)
    .addField('ID:', msg.guild.id, true)
    .addField('Owner:', msg.guild.owner, true)
    .addField('Total Members:', msg.guild.memberCount, true)
    .addField('Humans:', msg.guild.members.filter(u => u.user.bot === false).size, true)
    .addField('Bots:', msg.guild.members.filter(u => u.user.bot === true).size, true)
    .addField('Online:', msg.guild.members.filter(u => u.user.presence.status === 'online').size, true)
    .addField('Offline:', msg.guild.members.filter(u => u.user.presence.status === 'offline').size, true)
    .addField('Channels:', msg.guild.channels.size, true)
    .addField('Region:', msg.guild.region, true)
    .addField('Roles:', msg.guild.roles.size, true)
    .addField('Emojis:', msg.guild.emojis.size, true)
    .addField('Default Channel:', msg.guild.defaultChannel.name, true)
    .addField('Accessable:', msg.guild.available, true)
    .addField('Verification Level:', msg.guild.verificationLevel, true)
    .setFooter('Created On: ' + msg.guild.createdAt);
    msg.channel.sendEmbed(embed);
  }
};
