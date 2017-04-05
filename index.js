const commando = require('discord.js-commando');
const path = require('path');
const stevebot = new commando.Client({
  owner: '273707798670344192',
  commandPrefix: '!'
});

stevebot.on('ready', () => {
  console.log('SteveBot is ready!');
});

stevebot.registry
    .registerGroups([
        ['mod', 'Moderator Commands'],
        ['random', 'Rolling dice and such'],
        ['music', 'Play songs']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

stevebot.login('Mjk3ODkwNzQyNzcxMjUzMjU4.C8HX5Q.L0hwHVfPxYsHrGKPgVVrug7Iu58');
