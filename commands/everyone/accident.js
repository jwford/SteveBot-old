const { Command } = require('discord.js-commando');

module.exports = class AccidentCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'accident',
      aliases: [')', '\')', '-p', '-)', 'p'],
      group: 'everyone',
      memberName: 'accident',
      description: 'Catches accidental commands made by emoticon faces.'
    });
  }

  run() {
    return;
  }
};
