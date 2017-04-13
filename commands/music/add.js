const commando = require('discord.js-commando');

class AddCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'add',
      group: 'music',
      memberName: 'add',
      description: 'Adds a song to the queue.'
    });
  }

  async run(message, args) {
    message.channel.sendMessage("Added to the queue!");
  }
}

module.exports = AddCommand;
