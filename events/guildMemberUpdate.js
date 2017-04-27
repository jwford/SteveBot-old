const RichEmbed = require('discord.js').RichEmbed;

module.exports = (oldMember, newMember) => {
  var user = newMember.user;
  var steveactionlog = newMember.guild.channels.find('name', 'steveactionlog');

  //nickname
  if (oldMember.nickname !== newMember.nickname) {
    var newNickname = newMember.nickname;

    if (newNickname === null) {
      newNickname = newMember.displayName;
    }

    if(!steveactionlog) return console.log('No steveactionlog.');
    const embed = new RichEmbed()
    .setTitle('User Nickname Changed')
    .setColor(0x00f400)
    .addField('User: ', `${user.username}#${user.discriminator}`, true)
    .addField('Nickname: ', newNickname, true)
    .setFooter('ID: ' + user.id);
    steveactionlog.send({embed});
  }
};
