const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class AddRoleCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'addrole',
      group: 'mod',
      memberName: 'addrole',
      description: 'Adds a role to a user.'
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
      return message.reply('You do not have the permissions to give a role to a user.');
    } else if (numOfMentions > 1 || numOfMentions < 1) {
      message.delete();
      return message.reply('You must provide 1 user to add a role to.');
    } else if (role.length < 2) {
      message.delete();
      return message.reply('You must provide a roll to add to the user.');
    } else if (!modlog) {
      message.delete();
      return message.reply('I cannot find a modlog channel.');
    }

    role = role[1];
    role = message.guild.roles.find('name', role);
    if (message.guild.member(user).roles.has(role.id)) {
      message.delete();
      return message.reply('This user already has that role.');
    } else {
      message.delete();
      message.guild.member(user).addRole(role);

      const embed = new Discord.RichEmbed()
      .setTitle('Member Given a Role')
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
