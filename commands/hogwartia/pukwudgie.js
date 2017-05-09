const { Command } = require('discord.js-commando');

module.exports = class HornedSerpentCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'pukwudgie',
      group: 'hogwartia',
      memberName: 'pukwudgie',
      description: 'Adds a member to the Pukwudgie role'
    });
  }

  run(msg) {
    if (msg.guild.name !== 'Hogwartia') return msg.reply('you\'re in the wrong server for that.');
    var member = msg.member;
    var hornedserpent = msg.guild.roles.find('name', 'Horned Serpent');
    var thunderbird = msg.guild.roles.find('name', 'Thunderbird');
    var pukwudgie = msg.guild.roles.find('name', 'Pukwudgie');
    var wampus = msg.guild.roles.find('name', 'Wampus');

    if (member.roles.get(pukwudgie.id)) return msg.reply('you\'re already in that house.');
    if (member.roles.get(thunderbird.id) || member.roles.get(hornedserpent.id) || member.roles.get(wampus.id)) return msg.reply('you\'re already in an Ilvermorny house. Don\'t be that person.');

    member.addRole(hornedserpent);
  }
};
