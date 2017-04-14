const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path');
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

stevebot.login('Mjk3ODkwNzQyNzcxMjUzMjU4.C8HX5Q.L0hwHVfPxYsHrGKPgVVrug7Iu58');

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});

module.exports = stevebot => {
  stevebot.on('message', () => events('message'));
};
