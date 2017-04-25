const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const adminrole = require('../../config.json').admin_role_name;

module.exports = class KickCommand extends Command {
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
    return msg.member.roles.find('name', adminrole);
  }

  run(msg, args) {
    var user = args.user;
    var modmin = msg.author;
    var reason = args.reason;
    var modlog = msg.guild.channels.find('name', 'modlog');

    if (!msg.guild.member(user).kickable) return modmin.sendMessage('This user is not kickable.');
    if (user.id === modmin.id) return modmin.sendMessage('Silly, you can\'t kick yourself!');

    msg.guild.member(user).kick();
    user.sendMessage('You have been kicked from ' + msg.guild.name + '. Message an admin if you have a question.');

    if(!modlog) return modmin.sendMessage('I cannot find a modlog channel.');
    const embed = new RichEmbed()
    .setTitle('Kicked | ' + `${user.username}#${user.discriminator}`)
    .setAuthor(`${modmin.username}#${modmin.discriminator}`, `${modmin.displayAvatarURL}`, `http://www.tuataria.com/tuataria/bios/#${modmin.username.toLowerCase()}`)
    .setColor(0xe81ee1)
    .setTimestamp()
    .addField('Reason:', reason, true);
    modlog.sendEmbed(embed);
  }
};
