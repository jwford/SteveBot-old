const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class MuteCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'kick',
      group: 'admin',
      memberName: 'kick',
      description: 'Kicks a user.'
    });
  }

  async run(message, stevebot, args) {
    var kickedUser = message.mentions.users.first();
    var admin = message.author;
    var reason = message.content.split('\"');
    var numOfMentions = message.mentions.users.size;
    var modlog = message.guild.channels.find('name', 'modlog');

    if (numOfMentions < 1 || numOfMentions > 1) {
      message.delete();
      message.reply('you must mention one user to kick them.');
    }

    if (!message.guild.member(admin).hasPermission('KICK_MEMBERS')) {
      message.delete();
      message.reply('you do not have the permissions to do this.');
    } else if (!message.guild.member(kickedUser).kickable) {
      message.delete();
      message.reply('you cannot kick this member.');
    } else if (reason.length < 2) {
      message.delete();
      message.reply('you must supply a reason for kicking the user.');
    } else if (!modlog) {
      message.delete();
      message.reply('I cannot find a modlog channel.');
    } else {
      reason = reason[1];
      message.delete();
      kickedUser.sendMessage('You have been kicked from Tuataria. ' + reason + ' Please contact an admin if you have a question.');
      message.guild.member(kickedUser).kick();

      const embed = new Discord.RichEmbed()
      .setTitle('User Kicked')
      .setColor(0x00AE86)
      .setTimestamp()
      .setThumbnail(kickedUser.avatarURL)
      .addField('Member:', `${kickedUser.username}#${kickedUser.discriminator}`)
      .addField('Modmin:', `${message.author.username}#${message.author.discriminator}`)
      .addField('Reason:', reason);
      modlog.sendEmbed(embed);
    }
  }
}
