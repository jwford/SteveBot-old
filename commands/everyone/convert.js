const commando = require('discord.js-commando');

module.exports = class ConvertCommad extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'convert',
      group: 'everyone',
      memberName: 'convert',
      description: 'Converts temperatures, distances, and weights. Works with Farenheit, Celsius, Kelvin, feet, meters, kilometers, miles, pounds, kilograms, and stone.',
      args: [
        {
          key: 'num',
          label: 'amount',
          prompt: 'What amount would you like to convert? Enter a number.',
          type: 'float'
        },
        {
          key: 'firstScale',
          label: 'first  scale',
          prompt: 'What scale are you converting from?',
          type: 'string'
        },
        {
          key: 'finalScale',
          label: 'final scale',
          prompt: 'What scale would you like to convert to?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, args) {
    var firstNum = args.num;
    var firstScale = args.firstScale;
    var finalScale = args.finalScale;
    var combinedScale = firstScale.concat(finalScale);
    var finalNum;

    switch(combinedScale) {
      //farenheit to celsius
    case 'fc':
      finalNum = (firstNum - 32) * 5 / 9;
      msg.channel.sendMessage(firstNum + '° F is about ' + Math.floor(finalNum) + '° C. :thermometer:');
      break;
      //farenheit to kelvin
    case 'fk':
      finalNum = ((firstNum - 32) * 5 / 9) + 273.15;
      msg.channel.sendMessage(firstNum + '° F is about ' + Math.floor(finalNum) + '° K. :thermometer:');
      break;
      //celsius to farenheit
    case 'cf':
      finalNum = firstNum * 9 / 5 + 32;
      msg.channel.sendMessage(firstNum + '° C is about ' + Math.floor(finalNum) + '° F. :thermometer:');
      break;
      //celsius to kelvin
    case 'ck':
      finalNum = firstNum + 273.15;
      msg.channel.sendMessage(firstNum + '° C is about ' + Math.floor(finalNum) + '° K. :thermometer:');
      break;
      //kelvin to farenheit
    case 'kf':
      finalNum = (firstNum - 273.15) * 9 / 5 + 32;
      msg.channel.sendMessage(firstNum + '° K is about ' + Math.floor(finalNum) + '° F. :thermometer:');
      break;
      //kelvin to celsius
    case 'kc':
      finalNum = firstNum - 273.15;
      msg.channel.sendMessage(firstNum + '° K is about ' + Math.floor(finalNum) + '° C. :thermometer:');
      break;
      //miles to kilometers
    case 'mikm':
      finalNum = firstNum * 1.60934;
      msg.channel.sendMessage(firstNum + 'mi is about ' + Math.floor(finalNum) + 'km. :motorway:');
      break;
      //kilometers to miles
    case 'kmmi':
      finalNum = firstNum * 0.621371;
      msg.channel.sendMessage(firstNum + 'km is about ' + Math.floor(finalNum) + 'mi. :motorway:');
      break;
      //feet to meters
    case 'ftm':
      finalNum = firstNum * 0.3048;
      msg.channel.sendMessage(firstNum + 'ft is about ' + Math.floor(finalNum) + 'm. :straight_ruler:');
      break;
      //meters to feet
    case 'mft':
      finalNum = firstNum * 3.28084;
      msg.channel.sendMessage(firstNum + 'ft is about ' + Math.floor(finalNum) + 'm. :straight_ruler:');
      break;
      //pounds to kilograms
    case 'lbkg':
      finalNum = firstNum * 0.453592;
      msg.channel.sendMessage(firstNum + ' lb is about ' + Math.floor(finalNum) + 'kg. :lifter:');
      break;
      //kilograms to pounds
    case 'kglb':
      finalNum = firstNum * 2.20462;
      msg.channel.sendMessage(firstNum + 'kg is about ' + Math.floor(finalNum) + ' lb. :lifter:');
      break;
      //kilograms to stone
    case 'kgst':
      finalNum = firstNum * 0.157473;
      msg.channel.sendMessage(firstNum + 'kg is about ' + Math.floor(finalNum) + ' st. :lifter:');
      break;
      //stone to kilograms
    case 'stkg':
      finalNum = firstNum * 6.35029;
      msg.channel.sendMessage(firstNum + ' st is about ' + Math.floor(finalNum) + 'kg. :lifter:');
      break;
      //stone to pounds
    case 'stlb':
      finalNum = firstNum * 14;
      msg.channel.sendMessage(firstNum + ' st is about ' + Math.floor(finalNum) + ' lb. :lifter:');
      break;
      //pounds to stone
    case 'lbst':
      finalNum = firstNum * 0.0714286;
      msg.channel.sendMessage(firstNum + ' lb is about ' + Math.floor(finalNum) + ' st. :lifter:');
      break;
    default:
      msg.reply('you probably entered an invalid scale, or tried to go from pound to miles or something. Try harder next time, bud.');
    }
  }
};
