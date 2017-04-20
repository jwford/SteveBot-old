const config = require('../config.json');
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

  //blacklist
  for (var i = 0; i < config.blacklist.length; i++) {
    var item = config.blacklist[i];
    item = new RegExp(item, 'i');
    if (item.test(msg.content)) {
      if (msg.channel.name !== 'actionlog') {
        msg.delete();
        msg.reply('don\'t use that word please.');
        return;
      } else {
        break;
      }
    }
  }

  //reactions
  var dftba = /dftba/i;
  var thankyou = /thank you/i;
  var noedge = /no edge/i;
  var pizza = /pizza/i;
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
