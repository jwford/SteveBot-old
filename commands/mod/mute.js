const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class MuteCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'mute',
      group: 'mod',
      memberName: 'mute',
      description: 'Puts a user in the muted role.'
    });
  }

  async run(message, stevebot, args) {
    var messageAuthor = message.guild.member(message.author);
    var mutedUser = message.mentions.users.first();
    var numOfMentions = message.mentions.users.size;
    var reason = message.content.split('\"');
    var modlog = message.guild.channels.find('name', 'modlog');
    var mutedRole = message.guild.roles.find('name', 'Muted');

    if (!messageAuthor.hasPermission("MANAGE_MESSAGES")) { //check if author of command message is mod or admin
      message.delete();
      return message.reply('you do not have this permission.');
    } else if (numOfMentions > 1 || numOfMentions < 1) { //check that one user has been tagged
      message.delete();
      return message.reply('you must tag one user at a time to mute them.');
    } else if (reason.length < 2) { //check that a reason has been given
      message.delete();
      return message.reply('you must supply a reason for muting the user.');
    } else if (reason.length > 2 && reason[2].length > 1) { //check that only one set of quotes was used
      message.delete();
      return message.reply('please only use one set of quotes for the reason.');
    } else if (!modlog) { //check for modlog channel
      message.delete();
      return message.reply('I need a modlog channel to post in.');
    } else if (!mutedRole) { //check if muted role exists
      message.delete();
      return message.reply('There is no muted role for me to put this user in.');
    }

      //modlog embed
      reason = reason[1];

      const embed = new Discord.RichEmbed()
      .setTitle('Member Muted/Unmuted')
      .setColor(0x00AE86)
      .setTimestamp()
      .setThumbnail(mutedUser.avatarURL)
      .addField('Member:', `${mutedUser.username}#${mutedUser.discriminator}`)
      .addField('Modmin:', `${message.author.username}#${message.author.discriminator}`)
      .addField('Reason:', reason);

      //actually do the goddamn thing
      if (message.guild.member(mutedUser).roles.has(mutedRole.id)) {
        message.delete();
        message.guild.member(mutedUser).removeRole(mutedRole);
        mutedUser.sendMessage('You have been unmuted in Tuataria. ' + reason);
        modlog.sendEmbed(embed);
      } else {
        message.delete();
        message.guild.member(mutedUser).addRole(mutedRole);
        mutedUser.sendMessage('You have been server muted in Tuataria. ' + reason + ' Contact an modmin if you have a question.');
        modlog.sendEmbed(embed);
      }
  }
}
