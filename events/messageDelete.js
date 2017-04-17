const discord = require('discord.js');

module.exports = msg => {
  var actionlog = msg.guild.channels.find('name', 'actionlog');
  if (!actionlog) return console.log('No actionlog channel.');
  const embed = new discord.RichEmbed()
  .setTitle('Message Deleted | ' + `${msg.author.username}#${msg.author.discriminator}`)
  .setColor(0xd14927)
  .setTimestamp()
  .addField('Content:',  msg.content, true);
  actionlog.sendEmbed(embed);
};