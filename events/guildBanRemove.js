const RichEmbed = require('discord.js').RichEmbed;

module.exports = (guild, user) => {
  var steveactionlog = guild.channels.find('name', 'steveactionlog');
  if (!steveactionlog) return console.log('No steve actionlog.');

  const embed = new RichEmbed()
  .setTitle('Member Unbanned')
  .setAuthor(`${user.tag}`, `${user.displayAvatarURL}`)
  .setFooter(`ID: ${user.id}`)
  .setTimestamp();
  steveactionlog.send({embed});
};
