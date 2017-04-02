const commando = require('discord.js-commando');
const Discord = require('discord.js');

class BanCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      group: 'admin',
      memberName: 'ban',
      description: 'Bans a user.'
    });
  }
}

module.exports = BanCommand;
