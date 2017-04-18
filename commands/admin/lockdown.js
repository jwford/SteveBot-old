const commando = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class LockdownCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'lockdown',
      aliases: ['lock'],
      group: 'admin',
      memberName: 'lockdown',
      description: 'Locks down a channel.'
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('ADMINISTRATOR');
  }

  run(msg) {
    var guild = msg.guild.id;
    var admin = msg.author;
    var modlog = msg.guild.channels.find('name', 'modlog');

    msg.channel.overwritePermissions(guild, {
      SEND_MESSAGES: false
    })
    .then(() => msg.channel.sendMessage('This channel has been locked down.'))
    .catch(console.error);

    if (!modlog) return console.log('No modlog channel.');
    const embed = new discord.RichEmbed()
    .setTitle('Channel Locked | ' + `${msg.channel.name}`)
    .setColor(0x6518bc)
    .setTimestamp()
    .addField('Admin', `${admin.username}#${admin.discriminator}`, true)
    .setFooter('ID: ' + msg.channel.id);
    modlog.sendEmbed(embed);
  }
};
