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
    var messageAuthor = message.author;
    var kickedUser = message.mentions.users.first();
    if (!message.guild.member(messageAuthor).hasPermission("KICK_MEMBERS")) {
      message.reply('you do not have this permission.');
      message.delete();
    } else if (!kickedUser.kickable()) {
      message.reply('I cannot kick this user.');
    }
    else {
      if (message.mentions.users.size < 1) return message.reply('You must mention a user to kick them.');
      if (message.mentions.users.size > 1) return message.reply('You can only kick one user at a time.');
      message.guild.member(kickedUser).kick();
      message.delete();
    }
  }
}

module.exports = KickCommand;
