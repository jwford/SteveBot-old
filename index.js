const commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');
const stevebot = new commando.Client({
  owner: '273707798670344192',
  commandPrefix: '!',
  disableEveryone: true,
});
require('./util/eventLoader')(stevebot);

stevebot.registry
    .registerGroups([
        ['mod', 'Moderator Commands'],
        ['admin', 'Administrator Commands'],
        ['everyone', 'Commands for everyone'],
        ['music', 'Play songs']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

stevebot.login(config.token);

process.on('unhandledRejection', err => {
  console.error('Uncaught Promise Error: \n' + err.stack);
});
