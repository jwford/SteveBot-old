const commando = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class ListMembersInCommand extends commando.Command {
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
    return msg.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS');
  }

  run(msg, args) {
    var role = args.role;

    if (!msg.channel.guild.roles.get(role.id)) return msg.reply('I can\'t find that role.');
    var users = role.members.map(u => u.user).join(', ');

    function getPermissions(role) {
      var permissions = '';
      var newPermission;
      if (role.hasPermission('ADMINISTRATOR')) {
        newPermission = 'ADMINISTRATOR, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('CREATE_INSTANT_INVITE')) {
        newPermission = 'CREATE_INSTANT_INVITE, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('KICK_MEMBERS')) {
        newPermission = 'KICK_MEMBERS, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('BAN_MEMBERS')) {
        newPermission = 'BAN_MEMBERS, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('MANAGE_CHANNELS')) {
        newPermission = 'MANAGE_CHANNELS, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('MANAGE_GUILD')) {
        newPermission = 'MANAGE_GUILD, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('ADD_REACTIONS')) {
        newPermission = 'ADD_REACTIONS, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('READ_MESSAGES')) {
        newPermission = 'READ_MESSAGES, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('SEND_MESSAGES')) {
        newPermission = 'SEND_MESSAGES, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('SEND_TTS_MESSAGES')) {
        newPermission = 'SEND_TTS_MESSAGES, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('MANAGE_MESSAGES')) {
        newPermission = 'MANAGE_MESSAGES, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('EMBED_LINKS')) {
        newPermission = 'EMBED_LINKS, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('ATTACH_FILES')) {
        newPermission = 'ATTACH_FILES, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('READ_MESSAGE_HISTORY')) {
        newPermission = 'READ_MESSAGE_HISTORY, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('MENTION_EVERYONE')) {
        newPermission = 'MENTION_EVERYONE, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('EXTERNAL_EMOJIS')) {
        newPermission = 'EXTERNAL_EMOJIS, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('CONNECT')) {
        newPermission = 'CONNECT, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('SPEAK')) {
        newPermission = 'SPEAK, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('MUTE_MEMBERS')) {
        newPermission = 'MUTE_MEMBERS, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('DEAFEN_MEMBERS')) {
        newPermission = 'DEAFEN_MEMBERS, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('MOVE_MEMBERS')) {
        newPermission = 'MOVE_MEMBERS, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('USE_VAD')) {
        newPermission = 'USE_VAD, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('CHANGE_NICKNAME')) {
        newPermission = 'CHANGE_NICKNAME, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('MANAGE_NICKNAMES')) {
        newPermission = 'MANAGE_NICKNAMES, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
        newPermission = 'MANAGE_ROLES_OR_PERMISSIONS, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('MANAGE_WEBHOOKS')) {
        newPermission = 'MANAGE_WEBHOOKS, ';
        permissions = permissions + newPermission;
      }
      if (role.hasPermission('MANAGE_EMOJIS')) {
        newPermission = 'MANAGE_EMOJIS, ';
        permissions = permissions + newPermission;
      }
      permissions = permissions.slice(0, permissions.length - 2);
      return permissions;
    }

    if (users.length > 1024) {
      users = 'There\'s too many users in this role to display.';
    } else if (users.length === 0) {
      users = 'No users in this role.';
    }

    const embed = new discord.RichEmbed()
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
    .addField('Created:', role.createdAt, true)
    .addField('Permissions:', permissions, true)
    .addField('Users:', users, true);
    msg.channel.sendEmbed(embed);
  }
};
