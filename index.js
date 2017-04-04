const Discord = require('discord.js');
const commando = require('discord.js-commando');
const stevebot = new commando.Client();

stevebot.on('ready', () => {
  console.log('SteveBot is ready!');
});

stevebot.registry.registerGroup('random', 'Random');
stevebot.registry.registerGroup('mod', 'Mod');
stevebot.registry.registerDefaults();
stevebot.registry.registerCommandsIn(__dirname + "/commands");

stevebot.login('Mjk3ODkwNzQyNzcxMjUzMjU4.C8HX5Q.L0hwHVfPxYsHrGKPgVVrug7Iu58');
