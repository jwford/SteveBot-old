const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class MuteCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'mute',
      group: 'mod',
      memberName: 'mute',
      description: 'Puts a user in the muted role.',
      format: '[user] [reason]',
      args: [
        {
          key: 'user',
          label: 'user',
          prompt: 'Tag a user to mute.',
          type: 'user'
        },
        {
          key: 'reason',
          label: 'reason',
          prompt: 'Give a reason for muting the user.',
          type: 'string'
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
    var reason = args.reason;
    var muted = msg.guild.roles.find('name', 'Muted');
    var modlog = msg.guild.channels.find('name', 'modlog');

    if (user.id === this.client.user.id) return modmin.send('Why would you want to mute me?');
    if (user.id === modmin.id) return modmin.send('No muting yourself :stuck_out_tongue:');
    if (!muted) return modmin.send(msg.guild.name + ' does not have a Muted role.');
    if (msg.guild.member(user).roles.get(muted.id)) return modmin.send(`${user.username}#${user.discriminator} is already muted.`);

    msg.guild.member(user).addRole(muted);

    if (!modlog) return modmin.send('I cannot find a modlog channel.');
    const embed = new RichEmbed()
    .setTitle('Mute | ' + `${user.username}#${user.discriminator}`)
    .setAuthor(`${modmin.username}#${modmin.discriminator}`, `${modmin.displayAvatarURL}`, `http://www.tuataria.com/tuataria/bios/#${modmin.username.toLowerCase()}`)
    .setColor(0x13c4be)
    .setTimestamp()
    .addField('Reason:', reason, true);
    modlog.send({embed});
  }
};
