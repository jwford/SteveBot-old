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
    console.log('You warned a user.');
    if (message.mentions.users.size < 1) return message.reply('You must mention a user to warn them.');
    if (message.mentions.users.size > 1) return message.reply('You can only warn one user at a time.');
    var warnedUser = message.mentions.users.first();
    message.channel.sendMessage(warnedUser + ", this is a warning.");
  }
}

module.exports = WarnCommand;
