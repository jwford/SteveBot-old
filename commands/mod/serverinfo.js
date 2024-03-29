const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const moment = require('moment');

module.exports = class ServerInfoCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'serverinfo',
      group: 'mod',
      memberName: 'serverinfo',
      description: 'Displays information about the server.'
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_ROLES');
  }

  run(msg) {
    var roles = msg.guild.roles.map(r => r.name).join(', ');
    roles = roles.slice(1);

    var createdTime = moment(msg.guild.createdAt).format('ddd M-D-YY [at] h:mmA [GMT]ZZ');

    var verificationLevel = msg.guild.verificationLevel;
    switch(verificationLevel) {
    case 0:
      verificationLevel = 'None';
      break;
    case 1:
      verificationLevel = 'Low';
      break;
    case 2:
      verificationLevel = 'Medium';
      break;
    case 3:
      verificationLevel = 'Table Flip';
      break;
    }

    const embed = new RichEmbed()
    .setTitle('Server Information')
    .setThumbnail(msg.guild.iconURL)
    .setURL('http://tuataria.com')
    .setColor(0x80af18)
    .setTimestamp()
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
    .addField('Number of Roles:', msg.guild.roles.size, true)
    .addField('Emojis:', msg.guild.emojis.size, true)
    .addField('Default Channel:', msg.guild.defaultChannel.name, true)
    .addField('Accessible:', msg.guild.available, true)
    .addField('Verification Level:', verificationLevel, true)
    .addField('Roles:', roles)
    .addField('Created On:', createdTime, true);
    msg.channel.send({embed});
  }
};
