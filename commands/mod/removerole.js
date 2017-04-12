const commando = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class RemoveRoleCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'removerole',
      aliases: ['remrole', 'removeroll', 'remroll'],
      group: 'mod',
      memberName: 'removerole',
      description: 'Removes a role from a user.',
      format: '[user] [role]',
      args: [
        {
          key: 'user',
          label: 'user',
          prompt: 'Tag a user to remove a role from.',
          type: 'user'
        },
        {
          key: 'role',
          label: 'role',
          prompt: 'Provide a role to remove from the user.',
          type: 'role'
        }
      ]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS');
  }

  async run(msg, args) {
    var user = args.user;
    var modmin = msg.author;
    var role = args.role;
    var modlog = msg.guild.channels.find('name', 'modlog');

    if (!msg.guild.member(user).roles.get(role.id)) return modmin.sendMessage(`${user.username}#${user.discriminator} does not have that role.`);
    if (msg.guild.member(modmin).highestRole == role) return modmin.sendMessage('You cannot give the user that role.');

    msg.guild.member(user).removeRole(role);

    if(!modlog) return modmin.sendMessage('I cannot find a modlog channel.');
    const embed = new discord.RichEmbed()
    .setTitle('Role Removed from Member')
    .setAuthor(`${modmin.username}#${modmin.discriminator}`)
    .setThumbnail(user.avatarURL)
    .setColor(0x000000)
    .setTimestamp()
    .addField('Member:', `${user.username}#${user.discriminator}`)
    .addField('Role:', role);
    modlog.sendEmbed(embed);
  }
};
