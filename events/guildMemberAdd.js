const RichEmbed = require('discord.js').RichEmbed;

module.exports = member => {
  var guild = member.guild;
  var steveactionlog = guild.channels.find('name', 'steveactionlog');
  var user = member.user;
  if (!steveactionlog) return console.log('No steveactionlog channel.');
  const embed = new RichEmbed()
  .setTitle('Member Joined')
  .setAuthor(`${user.tag}`, `${user.displayAvatarURL}`)
  .setColor(0x26d1a9)
  .setTimestamp()
  .setFooter(`ID: ${user.id}`);
  steveactionlog.send({embed});
};
