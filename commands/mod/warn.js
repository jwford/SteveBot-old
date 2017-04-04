const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class WarnCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'warn',
      group: 'mod',
      memberName: 'warn',
      description: 'Warns a user.'
    });
  }

  async run(message, stevebot, args) {
    var messageAuthor = message.guild.member(message.author);
    var warnedUser = message.mentions.users.first();
    var numOfMentions = message.mentions.users.size;
    var reason = message.content.split('\"');
    var modlog = message.guild.channels.find('name', 'modlog');
    if (!messageAuthor.hasPermission("MANAGE_MESSAGES")) { //check if author of command message is mod or admin
      message.delete();
      return message.reply('you do not have this permission.');
    } else if (numOfMentions > 1 || numOfMentions < 1) { //check that one user has been tagged
      message.delete();
      return message.reply('you must tag one user at a time to warn them.');
    } else if (reason.length < 2) { //check that a reason has been given
      message.delete();
      return message.reply('you must supply a reason for the warning.');
    } else if (reason.length > 2 && reason[2].length > 1) { //check that only one set of quotes was used
      message.delete();
      return message.reply('please only use one set of quotes for the reason.');
    }
      reason = reason[1];
      message.channel.sendMessage(warnedUser + ', please turn the bus around. ' + reason + ' :bus:');
      message.delete();
      //modlog
      const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Action:', 'Warning')
      .addField('User:', `${warnedUser.username}#${warnedUser.discriminator}`)
      .addField('Modmin:', `${message.author.username}#${message.author.discriminator}`)
      .addField('Reason:', reason);
      modlog.sendEmbed(embed);
  }
}
