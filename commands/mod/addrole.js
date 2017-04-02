const commando = require('discord.js-commando');
const Discord = require('discord.js');

class AddRoleCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'addrole',
      group: 'mod',
      memberName: 'addrole',
      description: 'Adds a role to a user.'
    });
  }
}

moduel.exports = AddRoleCommand;
