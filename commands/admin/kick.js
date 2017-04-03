const commando = require('discord.js-commando');
const Discord = require('discord.js');

class KickCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'admin',
      memberName: 'kick',
      description: 'Kicks a user.'
    });
  }

  async run(message, args) {
    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) {
      message.reply('you do not have this permission.');
      message.delete();
    }
    if (message.mentions.users.size < 1) return message.reply('You must mention a user to kick them.');
    if (message.mentions.users.size > 1) return message.reply('You can only kick one user at a time.');
    message.guild.member(message.mentions.users.first()).kick();
    message.delete();
  }
}

module.exports = KickCommand;
