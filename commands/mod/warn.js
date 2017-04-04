const commando = require('discord.js-commando');

class WarnCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'warn',
      group: 'mod',
      memberName: 'warn',
      description: 'Warns a user.'
    });
  }

  async run(message, args) {
    var messageAuthor = message.guild.member(message.author);
    var warnedUser = message.mentions.users.first();
    var numOfMentions = message.mentions.users.size;
    var reason = message.content.split('\"');
    if (!messageAuthor.hasPermission("MANAGE_MESSAGES")) { //check if author of command message is mod or admin
      message.delete();
      return message.reply('you do not have this permission.');
    } else if (numOfMentions > 1 || numOfMentions < 1) { //check that one user has been tagged
      message.delete();
      return message.reply('you must tag one user at a time to warn them.');
    } else if (reason.length < 2) { //check that a reason has been given
      message.delete();
      return message.reply('you must supply a reason for the warning.');
    } else if (reason.length > 2) { //check that only one set of quotes was used
      message.delete();
      return message.reply('please only use one set of quotes for the reason.');
    }
      reason = reason[1];
      message.channel.sendMessage(warnedUser + ', please turn the bus around. ' + reason + ' :bus:');
      message.delete();
  }
}

module.exports = WarnCommand;
