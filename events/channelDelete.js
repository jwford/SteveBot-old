const discord = require('discord.js');

module.exports = channel => {
  var actionlog = channel.guild.channels.find('name', 'actionlog');

  if (!actionlog) return console.log('No actionlog channel.');
  const embed = new discord.RichEmbed()
  .setTitle('Channel Deleted | ' + `#${channel.name}`)
  .setColor(0x6518bc)
  .setTimestamp()
  .setFooter('ID: ' + `${channel.id}`);
  actionlog.sendEmbed(embed);
};
