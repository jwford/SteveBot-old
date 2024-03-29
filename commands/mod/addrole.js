const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class AddRoleCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'addrole',
      aliases: ['addroll'],
      group: 'mod',
      memberName: 'addrole',
      description: 'Adds a role to a user.',
      format: '[user] [role]',
      args: [
        {
          key: 'user',
          label: 'user',
          prompt: 'Tag a user to give them a role',
          type: 'user'
        },
        {
          key: 'role',
          label: 'role',
          prompt: 'Provide a role to give to the user.',
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
    var modlog = msg.guild.channels.find('name', 'modlog');

    if (msg.guild.member(user).roles.get(role.id)) return modmin.send(`${user.username}#${user.discriminator} already has that role.`);
    if (msg.guild.member(modmin).highestRole.comparePositionTo(role) < 0) return modmin.send('You cannot give the user that role.');

    msg.guild.member(user).addRole(role);

    if(!modlog) return modmin.send('I cannot find a modlog channel.');
    const embed = new RichEmbed()
    .setTitle('Role Added | ' + `${user.username}#${user.discriminator}`)
    .setAuthor(`${modmin.username}#${modmin.discriminator}`, `${modmin.displayAvatarURL}`, `http://www.tuataria.com/tuataria/bios/#${modmin.username.toLowerCase()}`)
    .setColor(0xf9951b)
    .setTimestamp()
    .addField('Role:', role, true);
    modlog.send({embed});
  }
};
