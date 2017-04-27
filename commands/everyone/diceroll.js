const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class DiceRollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'everyone',
      memberName: 'roll',
      description: 'Rolls a die.',
      format: '[number of sides]',
      args: [{
        key: 'sides',
        label: 'number of sides',
        type: 'integer',
        prompt: 'Enter the number of sides the die should have.',
        default: '6'}]
    });
  }

  run(msg, args) {
    var sides = args.sides;
    var roll = Math.floor(Math.random() * sides) + 1;
    const embed = new RichEmbed()
    .setColor(0x2913ef)
    .setTitle(`${msg.member.displayName}, you rolled a ${roll} :game_die:`);
    msg.channel.send({embed});
  }
};
