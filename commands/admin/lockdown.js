const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const adminrole = require('../../config.json').admin_role_name;

module.exports = class LockdownCommand extends Command {
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
    return msg.member.roles.find('name', adminrole);
  }

  run(msg) {
    var guild = msg.guild.id;
    var admin = msg.author;
    var modlog = msg.guild.channels.find('name', 'modlog');

    msg.channel.overwritePermissions(guild, {
      SEND_MESSAGES: false
    })
    .then(() => msg.channel.send('This channel has been locked down.'))
    .catch(console.error);

    if (!modlog) return console.log('No modlog channel.');
    const embed = new RichEmbed()
    .setTitle('Channel Locked | ' + `${msg.channel.name}`)
    .setAuthor(`${admin.username}#${admin.discriminator}`, `${admin.displayAvatarURL}`, `http://www.tuataria.com/tuataria/bios/#${admin.username.toLowerCase()}`)
    .setColor(0x6518bc)
    .setTimestamp()
    .setFooter('ID: ' + msg.channel.id);
    modlog.send({embed});
  }
};
