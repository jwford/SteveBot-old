const { Command } = require('discord.js-commando');

module.exports = class GoogleEmojisCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'googleemojis',
      aliases: ['google'],
      group: 'everyone',
      memberName: 'googleemojis',
      description: 'Links the Google emojis server.'
    });
  }

  run(msg) {
    msg.channel.send('discord.gg/blobs');
  }
};
