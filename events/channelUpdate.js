const RichEmbed = require('discord.js').RichEmbed;

module.exports = (oldChannel, newChannel) => {
  var steveactionlog = newChannel.guild.channels.find('name', 'steveactionlog');
  if (!steveactionlog) return console.log('No steveactionlog.');

  //name
  if (oldChannel.name !== newChannel.name) {
    const embed = new RichEmbed()
    .setTitle('Channel Name Changed')
    .setColor(0x6518bc)
    .addField('Old Name: ', oldChannel.name, true)
    .addField('New Name: ', newChannel.name, true)
    .setFooter(`ID: ${newChannel.id}`)
    .setTimestamp();
    steveactionlog.send({embed});
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
    .setTitle(`${newChannel.name} Topic Changed`)
    .setColor(0x6518bc)
    .addField('Old Topic: ', oldTopic)
    .addField('New Topic: ', newTopic)
    .setFooter(`ID: ${newChannel.id}`)
    .setTimestamp();
    steveactionlog.send({embed});
  }
};
