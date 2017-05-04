const RichEmbed = require('discord.js').RichEmbed;

module.exports = role => {
  var steveactionlog = role.guild.channels.find('name', 'steveactionlog');
  if (!steveactionlog) return console.log('No steveactionlog channel');
  const embed = new RichEmbed()
  .setTitle(`Role Created | ${role.name}`)
  .setColor(0xf21338)
  .setTimestamp()
  .setFooter(`ID: ${role.id}`);
  steveactionlog.send({embed});
};
