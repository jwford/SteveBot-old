const RichEmbed = require('discord.js').RichEmbed;

module.exports = msg => {
  var actionlog = msg.guild.channels.find('name', 'actionlog');
  if (!actionlog) return console.log('No actionlog channel.');
  const embed = new RichEmbed()
  .setTitle('Message Deleted | ' + `${msg.author.username}#${msg.author.discriminator}`)
  .setColor(0xd14927)
  .setTimestamp()
  .addField('Content:',  msg.content, true)
  .addField('Message Sent at:', msg.createdAt, true);
  actionlog.sendEmbed(embed);
};
