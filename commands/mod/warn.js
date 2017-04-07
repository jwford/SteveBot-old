const commando = require ('discord.js-commando');
const discord = require('discord.js');

module.exports = class WarnCommand extends commando.Command {
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
      return msg.member.hasPermission('MANAGE_MESSAGES');
    }

    async run(msg, args) {
      var user = args.user;
      var modmin = msg.author;
      var reason = args.reason;
      var modlog = msg.guild.channels.find('name', 'modlog');

      if (user.id == this.client.user.id) return modmin.sendMessage('Using this command on me will break me. What did I ever do to you, anyway?');
      if (user.id == modmin.id) return modmin.sendMessage('Why would you want to mute yourself?');

      user.sendMessage(user + ' please turn the bus around in ' + msg.channel + '. ' + reason + ' :bus:');

       if(!modlog) return modmin.sendMessage('I cannot find a modlog channel.');
       const embed = new discord.RichEmbed()
       .setTitle('Member Given a Warning')
       .setAuthor(`${modmin.username}#${modmin.discriminator}`)
       .setThumbnail(user.avatarURL)
       .setColor(0x000000)
       .setTimestamp()
       .addField('User:', `${user.username}#${user.discriminator}`)
       .addField('Reason:', reason);
       modlog.sendEmbed(embed);
    }
}
