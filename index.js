const commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');
const stevebot = new commando.Client({
  owner: config.ownerID,
  commandPrefix: config.commandPrefix,
  disableEveryone: config.disableEveryone,
});
require('./util/eventLoader')(stevebot);

stevebot.registry
    .registerGroups([
        ['mod', 'Moderator Commands'],
        ['admin', 'Administrator Commands'],
        ['everyone', 'Commands for Everyone']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

stevebot.login(config.token);

process.on('unhandledRejection', console.error);
