const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class WhoIsCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'whois',
      group: 'mod',
      memberName: 'whois',
      description: 'Displays information about a user.',
      args: [{
        key: 'user',
        label: 'user',
        prompt: 'Tag a user to get information about them.',
        type: 'user'
      }]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS');
  }

  run(msg, args) {
    var user = args.user;
    var userAsMember = msg.guild.member(user);
    var game = user.presence.game;
    var userVoiceChannel = userAsMember.voiceChannel;
    var userSelfMute;
    var userSelfDeaf;
    var roles = userAsMember.roles.map(r => r.name).join(', ');
    roles = roles.slice(1);

    if (!userVoiceChannel) {
      userVoiceChannel = 'None';
      userSelfMute = 'Not in voice';
      userSelfDeaf = 'Not in voice';
    } else {
      userVoiceChannel = userVoiceChannel.name;
      userSelfMute = userAsMember.selfMute;
      userSelfDeaf = userAsMember.selfDeaf;
    }

    if (game === null) {
      game = 'None';
    } else {
      game = game.name;
    }


    const embed = new RichEmbed()
    .setTitle('User Information')
    .setThumbnail(user.displayAvatarURL)
    .setColor(0x26d1a9)
    .addField('Username:', user.username, true)
    .addField('Discriminator:', user.discriminator, true)
    .addField('ID:', user.id, true)
    .addField('Bot:', user.bot, true)
    .addField('Status:', user.presence.status, true)
    .addField('Game:', game, true)
    .addField('Display Name:', userAsMember.displayName, true)
    .addField('Highest Role:', userAsMember.highestRole, true)
    .addField('Voice Channel:', userVoiceChannel, true)
    .addField('Server-Muted:', userAsMember.serverMute, true)
    .addField('Self-Muted:', userSelfMute, true)
    .addField('Server-Deafened:', userAsMember.serverDeaf, true)
    .addField('Self-Deafened:', userSelfDeaf, true)
    .addField('Roles:', roles, true)
    .addField('Account Created:', user.createdAt, true)
    .addField(`Joined ${msg.guild.name}:`, userAsMember.joinedAt, true)
    .setTimestamp();
    msg.channel.sendEmbed(embed);
  }
};
