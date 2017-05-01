const RichEmbed = require('discord.js').RichEmbed;

module.exports = (oldMember, newMember) => {
  var user = newMember.user;
  var steveactionlog = newMember.guild.channels.find('name', 'steveactionlog');

  //nickname
  if (oldMember.displayName !== newMember.displayName) {

    if(!steveactionlog) return console.log('No steveactionlog.');
    const embed = new RichEmbed()
    .setTitle('User Nickname Changed')
    .setColor(0x00f400)
    .addField('User: ', `${user.username}#${user.discriminator}`, true)
    .addField('Old Display Name: ', oldMember.displayName)
    .addField('New Display Name: ', newMember.displayName)
    .setFooter('ID: ' + user.id);
    steveactionlog.send({embed});
  }
};
