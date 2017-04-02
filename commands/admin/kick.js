const commando = require('discord.js-commando');
const Discord = require('discord.js');

class KickCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'admin',
      memberName: 'kick',
      description: 'Kicks a user.'
    });
  }

  async run(message, args) {
    let reason = args.splice(1, args.length).join(' ');
    if (!reason) return message.reply('You must supply a reason for the kick.').catch(error => console.error(error));
    let guild = message.guild;
    if (! guild.member(stevebot.user.id).hasPermission('KICK_MEMBERS')) return message.reply('I do not have the correct permissions').catch(error => console.error(error));
    let person = message.mentions.first();
    if (!person) return message.repy('You must mention someone to kick them').catch(error => console.error(error));
    if (!message.guild.member(person).kickable) return message.reply('This member is not kickable.').catch(error => console.error(error));
    try {
      await person.sendMessage(`${person.username}, you have been kicked from **${guild.name}** because __${reason}__`);
      await guild.member(person).ban(7);
      await message.reply(`Successsfully kicked: ${person.username}`).then(message => message.delete(3500));
      await message.delete(4000);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = KickCommand;
