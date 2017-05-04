const { Command } = require('discord.js-commando');
const ownerID = require('../../config.json').ownerID;

module.exports = class LogoutCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'logout',
      group: 'owners',
      memberName: 'logout',
      description: 'Logs out SteveBot.'
    });
  }

  hasPermission(msg) {
    if (msg.author.id === ownerID[0] || msg.author.id === ownerID[1]) {
      return true;
    } else return false;
  }

  run(msg) {
    msg.channel.send('I\'m headed for a nap! Thanks for all the eucalyptus.');
    console.log(`SteveBot logging out of ${this.client.guilds.map(g => g.name).join(', ')}`);
    this.client.destroy();
  }
};
