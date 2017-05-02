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
    return msg.member.hasPermission('MANAGE_ROLES');
  }

  run(msg, args) {
    var user = args.user;
    var modmin = msg.author;
    var muted = msg.guild.roles.find('name', 'Muted');
    var stevemodlog = msg.guild.channels.find('name', 'stevemodlog');

    if (user.id === this.client.user.id) return modmin.send('Nice try. You cannot mute me in the first place, let alone *un*mute me.');
    if (user.id === modmin.id) return modmin.send('Yeah... not able to mute yourself in the first place, bud. Try harder next time.');
    if (!muted) return modmin.send(msg.guild.name + ' does not have a Muted role.');
    if (!msg.guild.member(user).roles.get(muted.id)) return modmin.send(`${user.tag} is not muted currently.`);

    msg.guild.member(user).removeRole(muted);

    if (!stevemodlog) return modmin.send('I cannot find a stevemodlog channel.');
    const embed = new RichEmbed()
    .setTitle('Unmute | ' + `${user.tag}`)
    .setAuthor(`${modmin.tag}`, `${modmin.displayAvatarURL}`, `http://www.tuataria.com/tuataria/bios/#${modmin.username.toLowerCase()}`)
    .setColor(0x13c4be)
    .setTimestamp();
    stevemodlog.send({embed});
  }
};
