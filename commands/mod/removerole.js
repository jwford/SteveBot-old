const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class RemoveRoleCommand extends Command {
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
    return msg.member.hasPermission('MANAGE_ROLES');
  }

  run(msg, args) {
    var user = args.user;
    var modmin = msg.author;
    var role = args.role;
    var stevemodlog = msg.guild.channels.find('name', 'stevemodlog');

    if (!msg.guild.member(user).roles.get(role.id)) return modmin.send(`${user.username}#${user.discriminator} does not have that role.`);
    if (msg.guild.member(modmin).highestRole.comparePositionTo(role) < 0) return modmin.send('You cannot remove the role from that user');

    msg.guild.member(user).removeRole(role);

    if(!stevemodlog) return modmin.send('I cannot find a stevemodlog channel.');
    const embed = new RichEmbed()
    .setTitle('Role Removed | ' + `${user.username}#${user.discriminator}`)
    .setAuthor(`${modmin.username}#${modmin.discriminator}`, `${modmin.displayAvatarURL}`, `http://www.tuataria.com/tuataria/bios/#${modmin.username.toLowerCase()}`)
    .setColor(0xf9951b)
    .setTimestamp()
    .addField('Role:', role, true);
    stevemodlog.send({embed});
  }
};
