const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path');
const stevebot = new commando.Client({
  owner: '273707798670344192',
  commandPrefix: '!',
  disableEveryone: true,
});

stevebot.on('ready', () => {
  console.log('SteveBot is ready!');
  stevebot.user.setGame('Doing Steve Things');
});

//events
stevebot.on('message', msg => {
  var numMentions = msg.mentions.users.size;
  if (numMentions >= 10) {
    msg.delete();
    return msg.reply('Can you stop spamming mentions so I can go back to my eucalyptus?');
  }
});

stevebot.registry
    .registerGroups([
        ['mod', 'Moderator Commands'],
        ['admin', 'Administrator Commands'],
        ['random', 'Commands for everyone'],
        ['music', 'Play songs']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

stevebot.login('Mjk3ODkwNzQyNzcxMjUzMjU4.C8HX5Q.L0hwHVfPxYsHrGKPgVVrug7Iu58');

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
