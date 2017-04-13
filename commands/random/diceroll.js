const commando = require('discord.js-commando');

module.exports = class DiceRollCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'random',
      memberName: 'roll',
      description: 'Rolls a die.',
      format: '[number of sides]',
      args: [{
        key: 'sides',
        label: 'sides',
        type: 'integer',
        prompt: 'Enter the number of sides the die should have.',
        default: '6'}]
    });
  }

  run(msg, args) {
    var sides = args.sides;
    var roll = Math.floor(Math.random() * sides) + 1;
    msg.channel.sendMessage('You rolled a ' + roll + '. :game_die:');
  }
};
