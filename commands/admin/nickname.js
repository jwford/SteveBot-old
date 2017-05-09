const { Command } = require('discord.js-commando');
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
    return msg.member.hasPermission('ADMINISTRATOR');
  }

  run(msg, args) {
    var user = args.user;
    var newNickname = args.nickname;

    msg.guild.member(user).setNickname(newNickname);
  }
};
