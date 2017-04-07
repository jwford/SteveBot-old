const commando = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class UnmuteCommand extends commando.Command {
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
    return msg.member.hasPermission('MANAGE_MESSAGES');
  }

  async run(msg, args) {
    var user = args.user;
    var modmin = msg.author;
    var muted = msg.guild.roles.find('name', 'Muted');
    var modlog = msg.guild.channels.find('name', 'modlog');

    if (user.id == this.client.user.id) return modmin.sendMessage('Nice try. You cannot mute me in the first place, let alone *un*mute me.');
    if (user.id == modmin.id) return modmin.sendMessage('Yeah... not able to mute yourself in the first place, bud. Try harder next time.');
    if (!muted) return modmin.sendMessage(msg.guild.name + ' does not have a Muted role.');
    if (!msg.guild.member(user).roles.get(muted.id)) return modmin.sendMessage(`${user.username}#${user.discriminator} is not muted currently.`);

    msg.guild.member(user).removeRole(muted);

    if (!modlog) return modmin.sendMessage('I cannot find a modlog channel.');
    const embed = new discord.RichEmbed()
    .setTitle('Member Unmuted')
    .setAuthor(`${modmin.username}#${modmin.discriminator}`)
    .setColor(0x000000)
    .setThumbnail(user.avatarURL)
    .setTimestamp()
    .addField('User:', `${user.username}#${user.discriminator}`)
    modlog.sendEmbed(embed);
  }
}
