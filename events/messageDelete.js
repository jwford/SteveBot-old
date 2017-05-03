const RichEmbed = require('discord.js').RichEmbed;
const moment = require('moment');
const config = require('../config.json');

module.exports = msg => {
  if (msg.content.startsWith(config.commandPrefix + 'add')) return;
  var actionlog = msg.guild.channels.find('name', 'actionlog');
  if (!actionlog) return console.log('No actionlog channel.');
  var sentTime = moment(msg.createdAt).format('ddd M-D-YY [at] h:mmA [GMT]ZZ');
  const embed = new RichEmbed()
  .setTitle('Message Deleted')
  .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, `${msg.author.displayAvatarURL}`)
  .setColor(0xd14927)
  .setTimestamp()
  .addField('Content:',  msg.content)
  .addField('Message Sent on:', sentTime);
  actionlog.send({embed});
};
