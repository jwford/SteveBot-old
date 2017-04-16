const commando = require('discord.js-commando');

module.exports = class TempConvertCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'tempconvert',
      aliases: ['converttemp', 'temp'],
      group: 'everyone',
      memberName: 'tempconvert',
      description: 'Converts temperatures.',
      args: [
        {
          key: 'temp',
          label: 'temperature',
          prompt: 'What temperature would you like to convert? Enter a number.',
          type: 'float'
        },
        {
          key: 'firstScale',
          label: 'first temperature scale',
          prompt: 'What scale are you converting from? Type c, f, or k.',
          type: 'string'
        },
        {
          key: 'finalScale',
          label: 'final temperature scale',
          prompt: 'What scale would you like to convert to? Type c, f, or k.',
          type: 'string'
        }
      ]
    });
  }

  run(msg, args) {
    var firstTemp = args.temp;
    var firstScale = args.firstScale;
    var finalScale = args.finalScale;
    var combinedScale = firstScale.concat(finalScale);
    var finalTemp;

    switch(combinedScale) {
      case 'fc':
        finalTemp = (firstTemp - 32) * 5 / 9;
        msg.channel.sendMessage(firstTemp + '° F is about ' + Math.floor(finalTemp) + '° C.');
        break;
      case 'fk':
        finalTemp = ((firstTemp - 32) * 5 / 9) + 273.15;
        msg.channel.sendMessage(firstTemp + '° F is about ' + Math.floor(finalTemp) + '° K.');
        break;
      case 'cf':
        finalTemp = firstTemp * 9 / 5 + 32;
        msg.channel.sendMessage(firstTemp + '° C is about ' + Math.floor(finalTemp) + '° F.');
        break;
      case 'ck':
        finalTemp = firstTemp + 273.15;
        msg.channel.sendMessage(firstTemp + '° C is about ' + Math.floor(finalTemp) + '° K.');
        break;
      case 'kf':
        finalTemp = (firstTemp - 273.15) * 9 / 5 + 32;
        msg.channel.sendMessage(firstTemp + '° K is about ' + Math.floor(finalTemp) + '° F.');
        break;
        case 'kc':
        finalTemp = firstTemp - 273.15;
        msg.channel.sendMessage(firstTemp + '° C is about ' + Math.floor(finalTemp) + '° K.');
        break;
      default:
        msg.reply('you probably entered an invalid temperature scale. Try harder next time, bud.');
    }
  }
};
