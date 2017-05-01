const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const convert = require('convert-units');

module.exports = class ConvertCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'convert',
      group: 'everyone',
      memberName: 'convert',
      description: 'Converts units. This command is case sensitive, so be careful!',
      args: [
        {
          key: 'num',
          label: 'value',
          prompt: 'What would you like to convert?',
          type: 'float',
        },
        {
          key: 'inputUnit',
          prompt: 'What unit would you like to convert from?',
          type: 'string'
        },
        {
          key: 'outputUnit',
          prompt: 'What unit would you like to convert to? You can also say "possible" to get a list of possible units, or "best" to automatically convert to the smallest unit with a value greater than 1.',
          type: 'string',
        }
      ]
    });
  }

  run(msg, args) {
    var num = args.num;
    var inputUnit = args.inputUnit;
    var outputUnit = args.outputUnit;
    var best = convert(num).from(inputUnit).toBest();
    var allPossibles = convert().possibilities();

    if (allPossibles.includes(inputUnit) === false || allPossibles.includes(outputUnit) === false) return msg.channel.send('One or both of your units is invalid. This command is case sensitive.');

    if (outputUnit === 'possible') {
      const embed = new RichEmbed()
      .setColor(0x4280f4)
      .addField('Conversion Possibilities: ', `${num}${inputUnit} can be converted to ${convert().from(inputUnit).possibilities().join(', ')}`, true);
      msg.channel.send({embed});
    } else if (outputUnit === 'best') {
      const embed = new RichEmbed()
      .setColor(0x4280f4)
      .addField('Best Conversion: ', `${num}${inputUnit} is best converted to ${(Math.round(best.val * 10) / 10).toFixed(1)}${best.unit}`, true);
      msg.channel.send({embed});
    } else {
      const embed = new RichEmbed()
      .setColor(0x4280f4)
      .addField('Conversion: ', `${num}${inputUnit} converts to ${(Math.round(convert(num).from(inputUnit).to(outputUnit) * 10) / 10).toFixed(1)}${outputUnit}`);
      msg.channel.send({embed});
    }
  }
};
