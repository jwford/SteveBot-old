const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const moment = require('moment');

module.exports = class ChannelInfoCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'channelinfo',
      group: 'mod',
      memberName: 'channelinfo',
      description: 'Displays information about a channel.',
      args:[{
        key: 'channel',
        label: 'channel',
        prompt: 'What channel do you want information about?',
        type: 'channel',
      }]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_ROLES');
  }

  run(msg, args) {
    var channel = args.channel;
    var permissionOverwrites = channel.permissionOverwrites.size;
    var createdTime = moment(channel.createdAt).format('ddd M-D-YY [at] h:mmA [GMT]ZZ');

    if (permissionOverwrites === 0) {
      permissionOverwrites = 'None';
    }

    const embed = new RichEmbed()
    .setTitle('Channel Information')
    .setColor(0x6518bc)
    .addField('Name:', channel.name, true)
    .addField('ID:', channel.id, true)
    .addField('Type:', channel.type, true)
    .addField('Server:', channel.guild.name, true)
    .addField('Position:', channel.position, true)
    .addField('Permission Overwrites:', permissionOverwrites, true)
    .addField('Created on:', createdTime, true)
    .setTimestamp();
    msg.channel.send({embed});
  }
};
