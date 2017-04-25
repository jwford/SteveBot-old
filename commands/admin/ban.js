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
    return msg.member.roles.find('name', adminrole);
  }

  run(msg, args) {
    var user = args.user;
    var admin = msg.author;
    var reason = args.reason;
    var modmin = msg.author;
    var modlog = msg.guild.channels.find('name', 'modlog');

    if (user.id === admin.id) return msg.reply('Um...you can\'t ban yourself. Duh.');
    if (!msg.guild.member(user).bannable) return msg.reply('This user is not bannable.');

    msg.guild.member(user).ban(7);

    if(!modlog) return msg.reply('I can\'t find a modlog channel.');
    const embed = new RichEmbed()
    .setTitle('Banned | ' + `${user.username}#${user.discriminator}`)
    .setURL(`http://www.tuataria.com/tuataria/bios/#${admin.username.toLowerCase()}`)
    .setColor(0xf91f1b)
    .setTimestamp()
    .setFooter('ID: ' + user.id)
    .addField('Modmin:', `${modmin.username}#${modmin.discriminator}`, true)
    .addField('Reason:', reason, true);
    modlog.sendEmbed(embed);
  }
};
