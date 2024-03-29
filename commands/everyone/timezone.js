const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

const moment = require('moment');

module.exports = class TimezoneCommand extends Command {
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
          prompt: 'What time would you like to convert? 24 hour format please.',
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

    var inputTime;
    if (args.time.toUpperCase() == 'NOW') {
      let authorTimezone = handleTimezone(msg.author.username, msg);
      if (authorTimezone == null) {
        msg.reply("you don't have a timezone, so we can't know what time it is for you now. Sorry! (ask a modmin for a timezone role)");
        return;
      }
      let baseCurrentTime = moment().format("HH:mm");
      let authorCurrentTime;
      //TODO calculations to determine the authorCurrentTime based on baseCurrentTime and the author's timezone
      inputTime = authorCurrentTime;
    } else {
      inputTime = args.time;
    }

    inputTime = inputTime.split(':');
    var inputHours = inputTime[0];
    var inputMinutes = inputTime[1];
    var newHours;
    var newMinutes;

    var firstZone = this.handleTimezone(args.firstZone, msg);
    if (firstZone == null) return;
    var secondZone = this.handleTimezone(args.secondZone, msg);
    if (secondZone == null) return;

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

    if (!firstZoneHour) {
      firstZoneHour = '0';
    }
    if (!secondZoneHour) {
      secondZoneHour = '0';
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
      if (firstZoneHour !== 5 && firstZoneHour !== 9) return msg.reply('you entered an invalid timezone.');
    }
    if (secondZoneMinutes !== 0) {
      if (secondZoneHour !== 5 && secondZoneHour !== 9) return msg.reply('you entered an invalid timezone.');
    }


    if (inputMinutes > 59) {
      inputHours += Math.floor(inputMinutes / 60);
      inputMinutes -= 60;
    }

    newHours = inputHours;
    newMinutes = inputMinutes;

    if (firstZoneHour < secondZoneHour) {
      hourDifference = secondZoneHour - firstZoneHour;
      newMinutes += secondZoneMinutes;
    }
    if (firstZoneHour > secondZoneHour) {
      hourDifference = -Math.abs(firstZoneHour - secondZoneHour);
      newMinutes -= firstZoneMinutes;
    }
    console.log(hourDifference);

    newHours = hourDifference + inputHours;

    if (newMinutes < 0) {
      newMinutes = Math.abs(newMinutes);
    }
    if (newMinutes >= 60) {
      newMinutes -= 60;
      newHours += 1;
    }
    if (newHours >= 24) {
      newHours = Math.abs(newHours - 24);
      nextDay = true;
    }
    // if (newMinutes < firstZoneMinutes) {
    //   newHours -= 1;
    //   newMinutes = 60 - newMinutes;
    // }
    if (newHours < 0) {
      newHours += 24;
      prevDay = true;
    }


    newHours = newHours.toString();
    newMinutes = newMinutes.toString();

    if (newMinutes === '0') {
      newMinutes = '00';
    }
    if (newMinutes.length === 1) {
      newMinutes = newMinutes.padStart(2, '0');
    }

    var newTime = [newHours, newMinutes];
    newTime = newTime.join(':');
    inputTime = inputTime.join(':');
    inputTime = inputTime.toUpperCase();

    if (nextDay === true) {
      const embed = new RichEmbed()
      .setColor(0x462fef)
      .addField(`Time in ${firstZone}: `, inputTime, true)
      .addField(`Time in ${secondZone}: `, newTime + ' on the next day', true);
      msg.channel.send({embed});
    } else if (prevDay === true) {
      const embed = new RichEmbed()
      .setColor(0x462fef)
      .addField(`Time in ${firstZone}: `, inputTime, true)
      .addField(`Time in ${secondZone}: `, newTime + ' on the previous day', true);
      msg.channel.send({embed});
    } else {
      const embed = new RichEmbed()
      .setColor(0x462fef)
      .addField(`Time in ${firstZone}: `, inputTime, true)
      .addField(`Time in ${secondZone}: `, newTime + ' on the same day', true);
      msg.channel.send({embed});
    }
  }

  handleTimezone(arg, msg) {
    let timezone;

    if (arg.toUpperCase() == 'ME') arg = msg.author.username;

    if (arg.substr(0,3).toUpperCase() == 'GMT') {
      timezone = arg.toUpperCase();
    } else {
      let userName = msg.guild.members.find('displayName', arg);
      if (userName == null) {
        msg.reply('couldn\'t find that username.');
        return;
      }
      var userRoles = userName.roles;
      let hasTimezone = false;
      for (let [id, role] of userRoles) {
        let roleName = role.name;
        if (roleName.substr(0,3) === 'GMT') {
          timezone = roleName;
          hasTimezone = true;
          break;
        }
      }
      if (!hasTimezone) {
        msg.reply('The first person doesn\'t have a timezone role.');
        return;
      }
    }
    return timezone;
  }

};
