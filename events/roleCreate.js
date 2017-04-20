const discord = require('discord.js');

module.exports = role => {
  var actionlog = role.guild.channels.find('name', 'actionlog');
  if (!actionlog) return console.log('No actionlog channel');
  const embed = new discord.RichEmbed()
  .setTitle('Role Created | ' + `${role.name}`)
  .setColor(0x720909)
  .setTimestamp()
  .setFooter('ID: ' + `${role.id}`);
  actionlog.sendEmbed(embed);
};
