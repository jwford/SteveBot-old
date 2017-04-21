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
  var reactions = [/dftba/i, /thank you/i, /thanks/i, /no edge/i, /pizza/i, /brain soup/i, /french the llama/i, /exception/i, /mongols/i];

  for (var r = 0; r < reactions.length; r++) {
    var react = reactions[r];
    if (react.test(msg.content)) {
      react = react.toString().slice(1, -2);
      if (msg.guild.emojis.find('name', config.reacts[react])) {
        msg.react(msg.guild.emojis.find('name', config.reacts[react]));
      } else {
        console.log('That emoji doesn\'t exist.');
      }
    }
  }
};
