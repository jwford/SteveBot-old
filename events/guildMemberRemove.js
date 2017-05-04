const RichEmbed = require('discord.js').RichEmbed;

module.exports = member => {
  var guild = member.guild;
  var steveactionlog = guild.channels.find('name', 'steveactionlog');
  var user = member.user;
  if (!steveactionlog) return console.log('No steveactionlog channel.');
  const embed = new RichEmbed()
  .setTitle('Member Left')
  .setAuthor(`${user.tag}`, `${user.displayAvatarURL}`)
  .setColor(0x17b7d3)
  .setTimestamp()
  .setFooter(`ID: ${user.id}`);
  steveactionlog.send({embed});
};
