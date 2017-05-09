const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const adminrole = require('../../config.json').admin_role_name;

module.exports = class BanCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'ban',
      group: 'admin',
      memberName: 'ban',
      description: 'Bans a user.',
      format: '[user]',
      args: [
        {
          key: 'user',
          label: 'user',
          prompt: 'Tag a user to ban them.',
          type: 'user'
        },
        {
          key: 'reason',
          label: 'reason',
          prompt: 'Give a reason for banning the user.',
          type: 'string'
        }
      ]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('ADMINISTRATOR');
  }

  run(msg, args) {
    var user = args.user;
    var admin = msg.author;
    var reason = args.reason;
    var modmin = msg.author;
    var stevemodlog = msg.guild.channels.find('name', 'stevemodlog');

    if (user.id === admin.id) return msg.reply('Um...you can\'t ban yourself. Duh.');
    if (!msg.guild.member(user).bannable) return msg.reply('This user is not bannable.');

    msg.guild.member(user).ban(7);

    if(!stevemodlog) return msg.reply('I can\'t find a stevemodlog channel.');
    const embed = new RichEmbed()
    .setTitle('Banned | ' + `${user.tag}`)
    .setAuthor(`${modmin.tag}`, `${modmin.displayAvatarURL}`, `http://www.tuataria.com/tuataria/bios/#${modmin.username.toLowerCase()}`)
    .setColor(0xf91f1b)
    .setTimestamp()
    .setFooter('ID: ' + user.id)
    .addField('Reason:', reason, true);
    stevemodlog.send({embed});
  }
};
