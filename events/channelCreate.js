const RichEmbed = require('discord.js').RichEmbed;

module.exports = channel => {
  var actionlog = channel.guild.channels.find('name', 'actionlog');

  if (!actionlog) return console.log('No actionlog channel.');
  const embed = new RichEmbed()
  .setTitle('Channel Created | ' + `#${channel.name}`)
  .setColor(0x6518bc)
  .setTimestamp()
  .setFooter('ID: ' + `${channel.id}`);
  actionlog.send({embed});
};
