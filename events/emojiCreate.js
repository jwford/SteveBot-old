const RichEmbed = require('discord.js').RichEmbed;

module.exports = emoji => {
  var steveactionlog = emoji.guild.channels.find('name', 'steveactionlog');
  if (!steveactionlog) return console.log('No steveactionlog.');

  const embed = new RichEmbed()
  .setTitle('Emoji Created')
  .addField('Name: ', emoji.name, true)
  .setFooter(`ID: ${emoji.id}`)
  .setTimestamp();
  steveactionlog.send({embed});
};
