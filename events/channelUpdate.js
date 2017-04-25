const RichEmbed = require('discord.js').RichEmbed;

module.exports = (oldChannel, newChannel) => {
  var actionlog = newChannel.guild.channels.find('name', 'actionlog');
  if (!actionlog) return console.log('No actionlog.');

  //name
  if (oldChannel.name !== newChannel.name) {
    const embed = new RichEmbed()
    .setTitle('Channel Name Changed')
    .setColor(0x6518bc)
    .addField('Old Name: ', oldChannel.name, true)
    .addField('New Name: ', newChannel.name, true)
    .setFooter(`ID: ${newChannel.id}`)
    .setTimestamp();
    actionlog.sendEmbed(embed);
  }

  //topic
  var newTopic = newChannel.topic;
  var oldTopic = oldChannel.topic;
  if (newTopic === '') {
    newTopic = 'Blank';
  }
  if (oldTopic === '') {
    oldTopic = 'Blank';
  }

  if (oldChannel.topic !== newChannel.topic) {
    const embed = new RichEmbed()
    .setTitle('Channel Topic Changed')
    .setColor(0x6518bc)
    .addField('Old Topic: ', oldTopic)
    .addField('New Topic: ', newTopic)
    .setFooter(`ID: ${newChannel.id}`)
    .setTimestamp();
    actionlog.sendEmbed(embed);
  }

  //position
  if (oldChannel.position !== newChannel.position) {
    const embed = new RichEmbed()
    .setTitle('Channel Position Changed')
    .setColor(0x6518bc)
    .addField('Old Position: ', oldChannel.position, true)
    .addField('New Position: ', newChannel.position, true)
    .setFooter(`ID: ${newChannel.id}`)
    .setTimestamp();
    actionlog.sendEmbed(embed);
  }
};
