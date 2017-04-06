const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class BanCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'ban',
      group: 'admin',
      memberName: 'ban',
      description: 'Bans a user.'
    });
  }

  async run(message, stevebot, args) {
    var bannedUser = message.mentions.users.first();
    var admin = message.author;
    var reason = message.content.split('\"');
    var numOfMentions = message.mentions.users.size;
    var modlog = message.guild.channels.find('name', 'modlog');

    if (numOfMentions < 1 || numOfMentions > 1) {
      message.delete();
      message.reply('you must mention one user to ban them.');
    }

    if (!message.guild.member(admin).hasPermission('BAN_MEMBERS')) {
      message.delete();
      message.reply('you do not have the permissions to do this.');
      const failEmbed = new Discord.RichEmbed()
      .setTitle('Somebody fucked up')
      .setColor(0x00AE86)
      .setTimestamp()
      .setThumbnail(admin.avatarURL)
      .addField('Action:', 'Attempted Ban')
      .addField('Attempted On:', `${bannedUser.username}#${bannedUser.discriminator}`)
      .addField('Offender:', `${message.author.username}#${message.author.discriminator}`)
      modlog.sendEmbed(failEmbed);
    } else if (!message.guild.member(bannedUser).bannable) {
      message.delete();
      message.reply('you cannot ban this member.');
    } else if (reason.length < 2) {
      message.delete();
      message.reply('you must supply a reason for banning the user.');
    } else if (!modlog) {
      message.delete();
      message.reply('I cannot find a modlog channel.');
    } else {
      reason = reason[1];
      message.delete();
      bannedUser.sendMessage('You have been banned from Tuataria. ' + reason + ' Please contact an admin if you have a question.');
      message.guild.member(bannedUser).ban(7);

      const embed = new Discord.RichEmbed()
      .setTitle('User Banned')
      .setColor(0x00AE86)
      .setTimestamp()
      .setThumbnail(bannedUser.avatarURL)
      .addField('Member:', `${bannedUser.username}#${bannedUser.discriminator}`)
      .addField('Modmin:', `${message.author.username}#${message.author.discriminator}`)
      .addField('Reason:', reason);
      modlog.sendEmbed(embed);
    }
  }
}
