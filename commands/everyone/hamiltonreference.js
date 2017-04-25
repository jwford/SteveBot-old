const { Command } = require('discord.js-commando');

module.exports = class HamiltonRefernceCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'hamiltonreference',
      aliases: ['zerohours'],
      group: 'everyone',
      memberName: 'hamiltonreference',
      description: 'Displays the Hamilton Reference picture.',
      throttling: {
        usages: 1,
        duration: 180
      }
    });
  }

  run(msg) {
    msg.channel.sendMessage('https://cdn.discordapp.com/attachments/273689397675687940/302961990144360448/hamilrefminutes.jpg');
  }
};
