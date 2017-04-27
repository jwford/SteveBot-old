const RichEmbed = require('discord.js').RichEmbed;

module.exports = role => {
  var actionlog = role.guild.channels.find('name', 'actionlog');
  if (!actionlog) return console.log('No actionlog channel');
  const embed = new RichEmbed()
  .setTitle('Role Created | ' + `${role.name}`)
  .setColor(0x720909)
  .setTimestamp()
  .setFooter('ID: ' + `${role.id}`);
  actionlog.send({embed});
};
