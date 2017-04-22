const commando = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const convert = require('convert-units');

module.exports = class ConvertCommand extends commando.Command {
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
          type: 'string'
        },
        {
          key: 'inputUnit',
          prompt: 'What unit would you like to convert from?',
          type: 'string'
        },
        {
          key: 'outputUnit',
          prompt: 'What unit would you like to convert to?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, args) {
    var num = parseFloat(args.num);
    var inputUnit = args.inputUnit;
    var outputUnit = args.outputUnit;

    num = convert(num).from(inputUnit).to(outputUnit);

    const embed = new RichEmbed()
    .setColor(0x0ad1b6)
    .addField('Conversion: ', `${args.num}${inputUnit} is ${num}${outputUnit}`, true);
    msg.channel.sendEmbed(embed);
  }
};
