const RichEmbed = require('discord.js').RichEmbed;

module.exports = (oldGuild, newGuild) => {
  var steveactionlog = newGuild.channels.find('name', 'steveactionlog');
  if (!steveactionlog) return console.log('No steveactionlog.');
  //name change
  if (oldGuild.name !== newGuild.name) {
    var newName = newGuild.name;
    if (newName === null) return console.log('New server name is null.');
    const embed = new RichEmbed()
    .setTitle('Server Name Changed')
    .setColor(0x6128ff)
    .addField('Old Name: ', oldGuild.name, true)
    .addField('New Name: ', newName, true)
    .setFooter(`ID: ${newGuild.id}`)
    .setTimestamp();
    steveactionlog.send({embed});
  }

  //verification level
  if (oldGuild.verificationLevel !== newGuild.verificationLevel) {
    const embed = new RichEmbed()
    .setTitle('Server Verification Level Changed')
    .setColor(0x6128ff)
    .addField('Old Level: ', oldGuild.verificationLevel, true)
    .addField('New Level: ', newGuild.verificationLevel, true)
    .setFooter(`ID: ${newGuild.id}`)
    .setTimestamp();
    steveactionlog.send({embed});
  }

  //region
  if (oldGuild.region !== newGuild.region) {
    const embed = new RichEmbed()
    .setTitle('Server Region Changed')
    .setColor(0x6128ff)
    .addField('Old Region: ', oldGuild.region, true)
    .addField('New Region: ', newGuild.region, true)
    .setFooter(`ID: ${newGuild.id}`)
    .setTimestamp();
    steveactionlog.send({embed});
  }

  //owner
  if (oldGuild.owner !== newGuild.owner) {
    const embed = new RichEmbed()
    .setTitle('Server Owner Changed')
    .setColor(0x6128ff)
    .addField('Old Region: ', oldGuild.owner, true)
    .addField('New Region: ', newGuild.owner, true)
    .setFooter(`ID: ${newGuild.id}`)
    .setTimestamp();
    steveactionlog.send({embed});
  }

  //available
  if (oldGuild.available !== newGuild.available) {
    if (newGuild.available === false) return console.log('Server not available.');
    if (newGuild.available === true) return console.log('Server available.');
  }

  //explicit content filter
  if (oldGuild.explicitContentFilter !== newGuild.explicitContentFilter) {
    const embed = new RichEmbed()
    .setTitle('Server Explicit Content Filter Changed')
    .setColor(0x6128ff)
    .addField('Old Filter: ', oldGuild.explicitContentFilter, true)
    .addField('New Filter: ', newGuild.explicitContentFilter, true)
    .setFooter(`ID: ${newGuild.id}`)
    .setTimestamp();
    steveactionlog.send({embed});
  }
};
