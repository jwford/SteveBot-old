const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const adminrole = require('../../config.json').admin_role_name;

module.exports = class NicknameCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'nickname',
      aliases: ['nick'],
      group: 'admin',
      memberName: 'nickname',
      description: 'Changes a user\'s nickname.',
      args: [
        {
          key: 'user',
          label: 'user',
          prompt: 'Who\'s nickname would you like to change?',
          type: 'user'
        },
        {
          key: 'nickname',
          label: 'new nickname',
          prompt: 'What should the user\'s new nickname be?',
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
    var newNickname = args.nickname;
    var modlog = msg.guild.channels.find('name', 'modlog');

    msg.guild.member(user).setNickname(newNickname);

    if(!modlog) return console.log('No modlog');
    const embed = new RichEmbed()
    .setTitle('User Nickname Changed')
    .setColor(0x00f400)
    .addField('User: ', `${user.username}#${user.discriminator}`, true)
    .addField('Nickname: ', newNickname, true)
    .setFooter('ID: ' + user.id);
    modlog.sendEmbed(embed);
  }
};
