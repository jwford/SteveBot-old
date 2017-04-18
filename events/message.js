module.exports = msg => {
  var numMentions = msg.mentions.users.size;
    if (numMentions >= 15) {
      msg.delete();
      return msg.reply('Can you stop spamming mentions so I can go back to my eucalyptus?');
    }
    if (msg.content.includes('@everyone') || msg.content.includes('@here')) {
      if (!msg.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
        msg.delete();
        msg.reply('I\'m trying to eat eucalyptus in peace, so please stop mentioning everyone.');
      }
    }
    if (msg.content.includes('dftba') || msg.content.includes('DFTBA') || msg.content.includes('Dftba')) {
      msg.react(msg.channel.guild.emojis.find('name', 'dftba'));
    }
};
