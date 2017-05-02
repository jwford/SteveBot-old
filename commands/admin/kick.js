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
    var stevemodlog = msg.guild.channels.find('name', 'stevemodlog');

    if (!msg.guild.member(user).kickable) return modmin.send('This user is not kickable.');
    if (user.id === modmin.id) return modmin.send('Silly, you can\'t kick yourself!');

    msg.guild.member(user).kick();
    user.send('You have been kicked from ' + msg.guild.name + '. Message an admin if you have a question.');

    if(!stevemodlog) return modmin.send('I cannot find a stevemodlog channel.');
    const embed = new RichEmbed()
    .setTitle('Kicked | ' + `${user.tag}`)
    .setAuthor(`${modmin.tag}`, `${modmin.displayAvatarURL}`, `http://www.tuataria.com/tuataria/bios/#${modmin.username.toLowerCase()}`)
    .setColor(0xe81ee1)
    .setTimestamp()
    .addField('Reason:', reason, true);
    stevemodlog.send({embed});
  }
};
