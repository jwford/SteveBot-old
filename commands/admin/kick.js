const commando = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class KickCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'kick',
      group: 'admin',
      memberName: 'admin',
      description: 'Kicks a user.',
      format: '[user] [reason]',
      args: [
        {
          key: 'user',
          label: 'user',
          prompt: 'Tag a user to be kicked.',
          type: 'user'
        },
        {
          key: 'reason',
          label: 'reason',
          prompt: 'Provide a reason for kicking the user.',
          type: 'string'
        }
      ]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('KICK_MEMBERS');
  }

  run(msg, args) {
    var user = args.user;
    var modmin = msg.author;
    var reason = args.reason;
    var modlog = msg.guild.channels.find('name', 'modlog');

    if (!msg.guild.member(user).kickable) return modmin.sendMessage('This user is not kickable.');
    if (user.id == modmin.id) return modmin.sendMessage('Silly, you can\'t kick yourself!');

    msg.guild.member(user).kick();
    user.sendMessage('You have been kicked from ' + msg.guild.name + '. Message an admin if you have a question.');

    if(!modlog) return modmin.sendMessage('I cannot find a modlog channel.');
    const embed = new discord.RichEmbed()
    .setTitle('Kicked | ' + `${user.username}#${user.discriminator}`)
    .setColor(0xe81ee1)
    .setTimestamp()
    .addField('Modmin:', `${modmin.username}#${modmin.discriminator}`, true)
    .addField('Reason:', reason, true);
    modlog.sendEmbed(embed);
  }
};
