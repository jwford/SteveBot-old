const RichEmbed = require('discord.js').RichEmbed;
const moment = require('moment');

module.exports = msg => {
  var steveactionlog = msg.guild.channels.find('name', 'steveactionlog');
  if (!steveactionlog) return console.log('No steveactionlog channel.');
  var sentTime = moment(msg.createdAt).format('ddd M-D-YY [at] h:mmA [GMT]ZZ');
  const embed = new RichEmbed()
  .setTitle(`Message Deleted in ${msg.channel.name}`)
  .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, `${msg.author.displayAvatarURL}`)
  .setColor(0xd14927)
  .setTimestamp()
  .addField('Content:',  msg.content)
  .addField('Message Sent on:', sentTime);
  steveactionlog.send({embed});
};
