const commando = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class UnlockCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'unlock',
      group: 'admin',
      memberName: 'unlock',
      description: 'Unlocks a channel.'
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
      SEND_MESSAGES: true
    })
    .then(() => msg.channel.sendMessage('This channel has been unlocked.'))
    .catch(console.error);

    if (!modlog) return console.log('No modlog channel.');
    const embed = new discord.RichEmbed()
    .setTitle('Channel Unlocked | ' + `${msg.channel.name}`)
    .setURL(`http://www.tuataria.com/tuataria/bios/#${admin.username.toLowerCase()}`)
    .setColor(0x6518bc)
    .setTimestamp()
    .addField('Admin', `${admin.username}#${admin.discriminator}`, true)
    .setFooter('ID: ' + msg.channel.id);
    modlog.sendEmbed(embed);
  }
};
