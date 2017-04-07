const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
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
        prompt: 'How many sides should the die have?',
        type: 'integer'
      }]
    });
  }

  async run(message, args) {
    var sides = args.sides;
    var roll = Math.floor(Math.random() * sides) + 1;
    message.channel.sendMessage("You rolled a " + roll);
  }
}

module.exports = DiceRollCommand;
