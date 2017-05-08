const RichEmbed = require('discord.js').RichEmbed;

module.exports = (oldRole, newRole) => {
  var steveactionlog = newRole.guild.channels.find('name', 'steveactionlog');
  if (!steveactionlog) return console.log('No steveactionlog.');
  //name change
  if (oldRole.name !== newRole.name) {
    const embed = new RichEmbed()
    .setTitle(`Role Name Changed | ${newRole.name}`)
    .setColor(0x4e007f)
    .setFooter(`ID: ${newRole.id}`)
    .setTimestamp();
    steveactionlog.send({embed});
  }

  //hoisted/not hoisted
  if (oldRole.hoist !== newRole.hoist) {
    if (newRole.hoist === true) {
      const embed = new RichEmbed()
      .setTitle(`${newRole.name} is now displayed separately in the members list.`)
      .setColor(0x4e007f)
      .setFooter(`ID: ${newRole.id}`)
      .setTimestamp();
      steveactionlog.send({embed});
    } else {
      const embed = new RichEmbed()
      .setTitle(`${newRole.name} is now merged with the rest of the members list.`)
      .setColor(0x4e007f)
      .setFooter(`ID: ${newRole.id}`)
      .setTimestamp();
      steveactionlog.send({embed});
    }
  }

  //color
  if (oldRole.hexColor !== newRole.hexColor) {
    const embed = new RichEmbed()
    .setTitle(`${newRole.name}\'s new color is ${newRole.hexColor}.`)
    .setColor(0x4e007f)
    .setFooter(`ID: ${newRole.id}`)
    .setTimestamp();
    steveactionlog.send({embed});
  }
};
