const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const adminrole = require('../../config.json').admin_role_name;

module.exports = class UnbanCommand extends Command {
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
            if (userid.length === 18) return true;
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
    return msg.member.hasPermission('ADMINISTRATOR');
  }

  run(msg, args) {
    var id = args.userid;
    var user = this.client.users.get(id);
    var modmin = msg.author;
    var reason = args.reason;
    var stevemodlog = msg.guild.channels.find('name', 'stevemodlog');

    if (!user) return modmin.send('This is not a valid user ID.');
    if (msg.guild.member(user)) return modmin.send('This user is not banned.');

    msg.guild.unban(id);
    user.send('You have been unbanned from ' + msg.guild.name + '. Contact an admin if you have a question.');

    if (!stevemodlog) return modmin.send('I can\'t find a stevemodlog channel');
    const embed = new RichEmbed()
    .setTitle('Unbanned | ' + `${user.tag}`)
    .setAuthor(`${modmin.tag}`, `${modmin.displayAvatarURL}`, `http://www.tuataria.com/tuataria/bios/#${modmin.username.toLowerCase()}`)
    .setColor(0xf91f1b)
    .setTimestamp()
    .addField('Reason:', reason, true);
    stevemodlog.send({embed});
  }
};
