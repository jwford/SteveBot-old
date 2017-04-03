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
    if (message.mentions.users.size < 1) return message.reply('You must mention a user to kick them.');
    if (message.mentions.users.size > 1) return message.reply('You can only kick one user at a time.');
    var kickedMember = message.mentions.users.first();
    kick(kickedMember);
    console.log(kickedMember + " has been kicked.");
  }
}

module.exports = KickCommand;
