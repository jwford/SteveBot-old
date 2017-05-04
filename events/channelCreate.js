const RichEmbed = require('discord.js').RichEmbed;

module.exports = channel => {
  var steveactionlog = channel.guild.channels.find('name', 'steveactionlog');

  if (!steveactionlog) return console.log('No steveactionlog channel.');
  const embed = new RichEmbed()
  .setTitle(`Channel Created | ${channel.name}`)
  .setColor(0x6518bc)
  .setTimestamp()
  .setFooter(`ID: ${channel.id}`);
  steveactionlog.send({embed});
};
