const commando = require('discord.js-commando');

class WarnCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'warn',
      group: 'mod',
      memberName: 'mod',
      description: 'Warns a user.'
    });
  }

  async run(message, args) {
    //check if author of command message has correct permissions
    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) {
      message.reply('you do not have this permission.');
      message.delete();
    }
    if (message.mentions.users.size < 1) return message.reply('you must mention a user to warn them.');
    if (message.mentions.users.size > 1) return message.reply('you can only warn one user at a time.');
    var warnedUser = message.mentions.users.first();
    message.channel.sendMessage(warnedUser + ", please turn the bus around. ");
    message.delete();
  }
}

module.exports = WarnCommand;
