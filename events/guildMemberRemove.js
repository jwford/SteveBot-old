const RichEmbed = require('discord.js').RichEmbed;

module.exports = member => {
  var guild = member.guild;
  var actionlog = guild.channels.find('name', 'actionlog');
  var user = member.user;
  if (!actionlog) return console.log('No actionlog channel.');
  const embed = new RichEmbed()
  .setTitle('Member Left | ' + `${user.username}#${user.discriminator}`)
  .setColor(0x26d1a9)
  .setTimestamp()
  .setFooter('ID: ' + `${user.id}`);
  actionlog.sendEmbed(embed);
};
