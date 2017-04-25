const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const adminrole = require('../../config.json').admin_role_name;

module.exports = class PurgeMessagesCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'purgemessages',
      aliases: ['purge'],
      group: 'admin',
      memberName: 'purgemessages',
      description: 'Deletes the specified number of messages in a channel.',
      args: [{
        key: 'num',
        label: 'number of messages',
        prompt: 'How many messages should I delete?',
        type: 'integer'
      }]
    });
  }

  hasPermission(msg) {
    return msg.member.roles.find('name', adminrole);
  }

  run(msg, args) {
    var msgCount = args.num + 1;
    var modlog = msg.guild.channels.find('name', 'modlog');
    var admin = msg.author;

    msg.channel.fetchMessages({
      limit: msgCount
    }).then(messages => msg.channel.bulkDelete(messages));

    if (!modlog) return console.log('No modlog.');
    const embed = new RichEmbed()
    .setTitle('Message Purge')
    .setColor(0xdddd21)
    .setURL(`http://www.tuataria.com/tuataria/bios/#${admin.username.toLowerCase()}`)
    .addField('Channel: ', msg.channel.name, true)
    .addField('Number of Messages: ', msgCount, true)
    .addField('Admin: ', `${admin.username}#${admin.discriminator}`, true)
    .setTimestamp();
    modlog.sendEmbed(embed);
  }
};
