const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class RemoveCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'removerole',
      group: 'mod',
      memberName: 'removerole',
      description: 'Remove a role from a user.'
    });
  }

  async run(message, stevebot, args) {
    var user = message.mentions.users.first();
    var modmin = message.author;
    var role = message.content.split('\"');
    var numOfMentions = message.mentions.users.size;
    var modlog = message.guild.channels.find('name', 'modlog');

    if (!message.guild.member(modmin).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
      message.delete();
      return message.channel.sendMessage('You do not have the permissions to give a remove a role from a user.');
    } else if (numOfMentions > 1 || numOfMentions < 1) {
      message.delete();
      return message.reply('You must provide 1 user to remove a role from.');
    } else if (role.length < 2) {
      message.delete();
      return message.reply('You must provide a roll to remove from the user.');
    } else if (!modlog) {
      message.delete();
      return message.reply('I cannot find a modlog channel.');
    }

    role = role[1];
    role = message.guild.roles.find('name', role);

    if (!message.guild.member(user).roles.has(role.id)) {
      message.delete();
      return message.reply('This user does not have that role.');
    } else {
      message.delete();
      message.guild.member(user).removeRole(role);

      const embed = new Discord.RichEmbed()
      .setTitle('Role taken from member')
      .setColor(0x00AE86)
      .setTimestamp()
      .setThumbnail(user.avatarURL)
      .addField('Member:', `${user.username}#${user.discriminator}`)
      .addField('Modmin:', `${message.author.username}#${message.author.discriminator}`)
      .addField('Role:', role);
      modlog.sendEmbed(embed);
    }
  }
}
