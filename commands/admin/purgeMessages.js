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
    return msg.member.hasPermission('ADMINISTRATOR');
  }

  run(msg, args) {
    var msgCount = args.num + 1;
    var stevemodlog = msg.guild.channels.find('name', 'stevemodlog');
    var admin = msg.author;

    msg.channel.fetchMessages({
      limit: msgCount
    }).then(messages => msg.channel.bulkDelete(messages));

    if (!stevemodlog) return console.log('No stevemodlog.');
    const embed = new RichEmbed()
    .setTitle('Message Purge')
    .setAuthor(`${admin.tag}`, `${admin.displayAvatarURL}`, `http://www.tuataria.com/tuataria/bios/#${admin.username.toLowerCase()}`)
    .setColor(0xdddd21)
    .addField('Channel: ', msg.channel.name, true)
    .addField('Number of Messages: ', msgCount - 1, true)
    .setTimestamp();
    stevemodlog.send({embed});
  }
};
