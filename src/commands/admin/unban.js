const commando = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class UnbanCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'unban',
      group: 'admin',
      memberName: 'unban',
      description: 'Unbans a user',
      format: '[userid]',
      args: [
        {
        key: 'userid',
        label: 'User ID',
        prompt: 'Enter the ID of the user to unban.',
        type: 'string',
        validate: userid => {
          if (userid.length == 18) return true;
          return 'User ID\'s must be 18 characters long.';
        }
      },
      {
        key: 'reason',
        label: 'reason',
        prompt: 'Enter a reason for unbanning this user.',
        type: 'string'
      }
    ]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('BAN_MEMBERS');
  }

  run(msg, args) {
    var id = args.userid;
    var user = this.client.users.get(id);
    var modmin = msg.author;
    var reason = args.reason;
    var modlog = msg.guild.channels.find('name', 'modlog');

    if (!user) return modmin.sendMessage('This is not a valid user ID.');
    if (msg.guild.member(user)) return modmin.sendMessage('This user is not banned.');

    msg.guild.unban(id);
    user.sendMessage('You have been unbanned from ' + msg.guild.name + '. Contact an admin if you have a question.');

    if (!modlog) return modmin.sendMessage('I can\'t find a modlog channel');
    const embed = new discord.RichEmbed()
    .setTitle('Unbanned | ' + `${user.username}#${user.discriminator}`)
    .setURL(`http://www.tuataria.com/tuataria/bios/#${modmin.username.toLowerCase()}`)
    .setColor(0xf91f1b)
    .setTimestamp()
    .addField('Modmin:', `${modmin.username}#${modmin.discriminator}`, true)
    .addField('Reason:', reason, true);
    modlog.sendEmbed(embed);
  }
};
