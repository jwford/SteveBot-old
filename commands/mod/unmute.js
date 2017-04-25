const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class UnmuteCommand extends Command {
  constructor(stevebot) {
    super (stevebot, {
      name: 'unmute',
      group: 'mod',
      memberName: 'unmute',
      description: 'Removes a user from the Muted role',
      format: '[user]',
      args: [{
        key: 'user',
        label: 'user',
        prompt: 'Tag a user to unmute them.',
        type: 'user'
      }]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS');
  }

  run(msg, args) {
    var user = args.user;
    var modmin = msg.author;
    var muted = msg.guild.roles.find('name', 'Muted');
    var modlog = msg.guild.channels.find('name', 'modlog');

    if (user.id === this.client.user.id) return modmin.sendMessage('Nice try. You cannot mute me in the first place, let alone *un*mute me.');
    if (user.id === modmin.id) return modmin.sendMessage('Yeah... not able to mute yourself in the first place, bud. Try harder next time.');
    if (!muted) return modmin.sendMessage(msg.guild.name + ' does not have a Muted role.');
    if (!msg.guild.member(user).roles.get(muted.id)) return modmin.sendMessage(`${user.username}#${user.discriminator} is not muted currently.`);

    msg.guild.member(user).removeRole(muted);

    if (!modlog) return modmin.sendMessage('I cannot find a modlog channel.');
    const embed = new RichEmbed()
    .setTitle('Unmute | ' + `${user.username}#${user.discriminator}`)
    .setURL(`http://www.tuataria.com/tuataria/bios/#${modmin.username.toLowerCase()}`)
    .setColor(0x13c4be)
    .setTimestamp()
    .addField('Modmin:', `${modmin.username}#${modmin.discriminator}`, true);
    modlog.sendEmbed(embed);
  }
};
