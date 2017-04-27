const RichEmbed = require('discord.js').RichEmbed;

module.exports = role => {
  var steveactionlog = role.guild.channels.find('name', 'steveactionlog');
  if (!steveactionlog) return console.log('No steveactionlog channel');
  const embed = new RichEmbed()
  .setTitle('Role Deleted | ' + `${role.name}`)
  .setColor(0x720909)
  .setTimestamp()
  .setFooter('ID: ' + `${role.id}`);
  steveactionlog.send({embed});
};
