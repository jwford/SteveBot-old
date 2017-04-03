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
    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('you do not have this permission.');
    if (message.mentions.users.size < 1) return message.reply('You must mention a user to warn them.');
    if (message.mentions.users.size > 1) return message.reply('You can only warn one user at a time.');
    var warnedUser = message.mentions.users.first();
    message.channel.sendMessage(warnedUser + ", please turn the bus around. ");
    message.delete();
  }
}

module.exports = WarnCommand;
