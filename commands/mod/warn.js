const { Command } = require ('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class WarnCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'warn',
      group: 'mod',
      memberName: 'warn',
      description: 'Warns a user',
      format: '[user] [reason]',
      args: [
        {
          key: 'user',
          label: 'user',
          prompt: 'Enter a user to warn them.',
          type: 'user'
        },
        {
          key: 'reason',
          label: 'reason',
          prompt: 'Enter a reason for warning the user.',
          type: 'string'
        }
      ]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_ROLES');
  }

  run(msg, args) {
    var user = args.user;
    var modmin = msg.author;
    var reason = args.reason;
    var modlog = msg.guild.channels.find('name', 'modlog');

    if (user.id === this.client.user.id) return modmin.send('Using this command on me will break me. What did I ever do to you, anyway?');
    if (user.id === modmin.id) return modmin.send('Why would you want to warn yourself?');

    user.send(user + ' please turn the bus around in ' + msg.channel + '. ' + reason + ' :bus:');

    if(!modlog) return modmin.send('I cannot find a modlog channel.');
    const embed = new RichEmbed()
    .setTitle('Warning | ' + `${user.username}#${user.discriminator}`)
    .setAuthor(`${modmin.username}#${modmin.discriminator}`, `${modmin.displayAvatarURL}`, `http://www.tuataria.com/tuataria/bios/#${modmin.username.toLowerCase()}`)
    .setColor(0x2463C9)
    .setTimestamp()
    .addField('Reason:', reason, true);
    modlog.send({embed});
  }
};
