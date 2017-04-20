module.exports = msg => {
  var numMentions = msg.mentions.users.size;
    if (numMentions >= 15) {
      msg.delete();
      return msg.reply('Can you stop spamming mentions so I can go back to my eucalyptus?');
    }
    if (msg.content.includes('@everyone') || msg.content.includes('@here')) {
      if (!msg.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
        msg.delete();
        msg.reply('I\'m trying to eat eucalyptus in peace, so please stop mentioning everyone.');
      }
    }
    //reactions
    var dftba = new RegExp('dftba', 'i');
    var thankyou = new RegExp('thank you', 'i');
    var noedge = new RegExp('no edge', 'i');
    var pizza = new RegExp('pizza', 'i');
    if (dftba.test(msg.content)) {
      if (!msg.channel.guild.emojis.find('name', 'dftba')) {
        return console.log('That emoji does not exist');
      } else {
        msg.react(msg.channel.guild.emojis.find('name', 'dftba'));
      }
    }
    if (thankyou.test(msg.content)) {
      if (!msg.channel.guild.emojis.find('name', 'yourewelcome')) {
        return console.log('That emoji does not exist');
      } else {
        msg.react(msg.channel.guild.emojis.find('name', 'yourewelcome'));
      }
    }
    if (noedge.test(msg.content)) {
      if (!msg.channel.guild.emojis.find('name', 'noedge')) {
        return console.log('That emoji does not exist.');
      } else {
        msg.react(msg.channel.guild.emojis.find('name', 'noedge'));
      }
    }
    if (pizza.test(msg.content)) {
      if (!msg.channel.guild.emojis.find('name', 'pizzajohn')) {
        return console.log('That emoji does not exist.');
      } else {
        msg.react(msg.channel.guild.emojis.find('name', 'pizzajohn'));
      }
    }
};
