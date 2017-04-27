const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const moment = require('moment');

module.exports = class ListMembersInCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'roleinfo',
      group: 'mod',
      memberName: 'roleinfo',
      description: 'Gives info about a role.',
      args: [{
        key: 'role',
        label: 'role',
        prompt: 'What role do you want information about?',
        type: 'role'
      }]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_ROLES');
  }

  run(msg, args) {
    var role = args.role;
    var createdTime = moment(role.createdAt).format('ddd M-D-YY [at] h:mmA [GMT]ZZ');

    if (!msg.channel.guild.roles.get(role.id)) return msg.reply('I can\'t find that role.');
    var users = role.members.map(u => u.user).join(', ');

    var permissions = '';
    var newPermission;
    if (role.hasPermission('ADMINISTRATOR')) {
      newPermission = 'Administrator, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('CREATE_INSTANT_INVITE')) {
      newPermission = 'Create Instant Invites, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('KICK_MEMBERS')) {
      newPermission = 'Kick Members, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('BAN_MEMBERS')) {
      newPermission = 'Ban Members, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('MANAGE_CHANNELS')) {
      newPermission = 'Manage Channels, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('MANAGE_GUILD')) {
      newPermission = 'Manage Server, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('ADD_REACTIONS')) {
      newPermission = 'Add Reactions, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('READ_MESSAGES')) {
      newPermission = 'Read Messages, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('SEND_MESSAGES')) {
      newPermission = 'Send Messages, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('SEND_TTS_MESSAGES')) {
      newPermission = 'Send Text-to-Speech Messages, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('MANAGE_MESSAGES')) {
      newPermission = 'Manage Messages, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('EMBED_LINKS')) {
      newPermission = 'Embed Links, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('ATTACH_FILES')) {
      newPermission = 'Attach Files, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('READ_MESSAGE_HISTORY')) {
      newPermission = 'Read Message History, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('MENTION_EVERYONE')) {
      newPermission = 'Mention Everyone, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('EXTERNAL_EMOJIS')) {
      newPermission = 'Use External Emojis, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('CONNECT')) {
      newPermission = 'Connect to Voice, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('SPEAK')) {
      newPermission = 'Speak in Voice, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('MUTE_MEMBERS')) {
      newPermission = 'Mute Members, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('DEAFEN_MEMBERS')) {
      newPermission = 'Deafen Members, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('MOVE_MEMBERS')) {
      newPermission = 'Move Members, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('USE_VAD')) {
      newPermission = 'Use Voice Activity Detection, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('CHANGE_NICKNAME')) {
      newPermission = 'Change Nickname, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('MANAGE_NICKNAMES')) {
      newPermission = 'Manage Nicknames, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('MANAGE_ROLES')) {
      newPermission = 'Manage Roles and Permissions, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('MANAGE_WEBHOOKS')) {
      newPermission = 'Manage Webhooks, ';
      permissions = permissions + newPermission;
    }
    if (role.hasPermission('MANAGE_EMOJIS')) {
      newPermission = 'Manage Emojis, ';
      permissions = permissions + newPermission;
    }
    permissions = permissions.slice(0, permissions.length - 2);

    if (users.length > 1024) {
      users = 'There\'s too many users in this role to display.';
    } else if (users.length === 0) {
      users = 'No users in this role.';
    }

    const embed = new RichEmbed()
    .setTitle('Role Information')
    .setColor(0x720909)
    .setTimestamp()
    .addField('Name:', role.name, true)
    .addField('ID:', role.id, true)
    .addField('Server:', role.guild.name, true)
    .addField('Position:', role.position, true)
    .addField('Hex Color:', role.hexColor, true)
    .addField('Managed Externally:', role.managed, true)
    .addField('Mentionable by Anyone:', role.mentionable, true)
    .addField('Displayed Seperately:', role.hoist, true)
    .addField('Editable by Steve:', role.editable, true)
    .addField('Created:', createdTime, true)
    .addField('Permissions:', permissions, true)
    .addField('Users:', users, true);
    msg.channel.send({embed});
  }
};
