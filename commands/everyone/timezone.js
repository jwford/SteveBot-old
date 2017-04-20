const commando = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class TimezoneCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'timezone',
      aliases: ['time'],
      group: 'everyone',
      memberName: 'timezone',
      description: 'Converts timezones.',
      args: [
        {
          key: 'time',
          label: 'time',
          prompt: 'What time would you like to convert?',
          type: 'string'
        },
        {
          key: 'firstZone',
          label: 'first timezone',
          prompt: 'What timezone would you like to convert from?',
          type: 'string'
        },
        {
          key: 'secondZone',
          label: 'second timezone',
          prompt: 'What timezone would you like to convert to?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, args) {
    var inputTime = args.time;
    inputTime = inputTime.split(':');
    var inputHours = inputTime[0];
    var inputMinutes = inputTime[1];
    var newHours;
    var newMinutes;
    var firstZone = args.firstZone.toUpperCase();
    var secondZone = args.secondZone.toUpperCase();
    var firstZoneHour = firstZone.slice(3, 6);
    var firstZoneMinutes = firstZone.slice(6);
    var secondZoneHour = secondZone.slice(3, 6);
    var secondZoneMinutes = secondZone.slice(6);
    var hourDifference;
    var nextDay = false;
    var prevDay =  false;

    if (!firstZoneMinutes) {
      firstZoneMinutes = '0';
    }
    if (!secondZoneMinutes) {
      secondZoneMinutes = '0';
    }


    if (firstZoneHour.endsWith(':')) {
      firstZoneHour = firstZoneHour.slice(0, 2);
    }
    if (secondZoneHour.endsWith(':')) {
      secondZoneHour = secondZoneHour.slice(0, 2);
    }

    firstZoneHour = parseInt(firstZoneHour, 10);
    firstZoneMinutes = parseInt(firstZoneMinutes, 10);
    secondZoneHour = parseInt(secondZoneHour, 10);
    secondZoneMinutes = parseInt(secondZoneMinutes, 10);
    inputHours = parseInt(inputHours, 10);
    inputMinutes = parseInt(inputMinutes, 10);

    if (inputHours > 24 || inputHours < 0) {
      return msg.reply('you have input an invalid time. Try again, maybe you\'ll get it.');
    }

    if (firstZoneMinutes !== 0) {
      if (firstZoneHour !== 5 && firstZoneHour !== 9) return msg.reply('you entered an invalid timzeone.');
    }
    if (secondZoneMinutes !== 0) {
      if (secondZoneHour !== 5 && secondZoneHour !== 9) return msg.reply('you entered an invalid timzeone.');
    }


    if (inputMinutes > 59) {
      inputHours += Math.floor(inputMinutes / 60);
      inputMinutes -= 60;
    }

    newHours = inputHours;
    newMinutes = inputMinutes;

    if (firstZoneHour < secondZoneHour) {
      hourDifference = Math.abs(firstZoneHour) + Math.abs(secondZoneHour);
      newMinutes += secondZoneMinutes;
    }
    if (firstZoneHour > secondZoneHour) {
      hourDifference = -Math.abs(firstZoneHour - secondZoneHour);
      newMinutes -= firstZoneMinutes;
    }

    newHours = hourDifference + inputHours;

    if (newHours >= 24) {
      newHours = Math.abs(newHours - 24);
      nextDay = true;
    }
    if (newHours < 0) {
      newHours += 24;
      prevDay = true;
    }
    if (newMinutes < 0) {
      newMinutes = Math.abs(newMinutes);
    }
    if (newMinutes >= 60) {
      newMinutes -= 60;
    }
    if (newMinutes < firstZoneMinutes) {
      newHours -= 1;
      newMinutes = 60 - newMinutes;
    }

    newHours = newHours.toString();
    newMinutes = newMinutes.toString();

    if (newMinutes === '0') {
      newMinutes = '00';
    }

    var newTime = [newHours, newMinutes];
    newTime = newTime.join(':');
    inputTime = inputTime.join(':');

    if (nextDay === true) {
      msg.channel.sendMessage(inputTime + ' in ' + firstZone + ' is ' + newTime + ' in ' + secondZone + ' on the next day.');
    } else if (prevDay === true) {
      msg.channel.sendMessage(inputTime + ' in ' + firstZone + ' is ' + newTime + ' in ' + secondZone + ' on the previous day.');
    } else {
      msg.channel.sendMessage(inputTime + ' in ' + firstZone + ' is ' + newTime + ' in ' + secondZone + ' on the same day.');
    }
  }
};
