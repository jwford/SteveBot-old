const data = require('../data.json');
module.exports = (oldMsg, newMsg) => {
  //delete "x pinned a message...." messages
  if (newMsg.system === true) return newMsg.delete();

  //blacklist
  for (var i = 0; i < data.blacklist.length; i++) {
    var item = data.blacklist[i];
    item = new RegExp(item, 'i');
    if (item.test(newMsg.content)) {
      if (newMsg.channel.name !== 'steveactionlog') {
        newMsg.delete();
        newMsg.reply('don\'t use that word please.');
        return;
      } else {
        break;
      }
    }
  }

  //delete mention spam
  var numMentions = newMsg.mentions.users.size;
  if (numMentions >= 15) {
    newMsg.delete();
    return newMsg.reply('Can you stop spamming mentions so I can go back to my eucalyptus?');
  }

  //deletes errant @everyone and @here
  if (newMsg.content.includes('@everyone') || newMsg.content.includes('@here')) {
    if (!newMsg.member.hasPermission('MANAGE_ROLES')) {
      newMsg.delete();
      newMsg.reply('I\'m trying to eat eucalyptus in peace, so please stop mentioning everyone/here.');
    }
  }

  //reactions
  var reactions = [/dftba/i, /thank you steve/i, /thanks steve/i, /thank ya steve/i, /no edge/i, /pizza/i, /brain soup/i, /french the llama/i, /exception/i, /mongols/i];

  for (var r = 0; r < reactions.length; r++) {
    var react = reactions[r];
    if (react.test(newMsg.content)) {
      react = react.toString().slice(1, -2);
      if (newMsg.guild.emojis.find('name', data.reacts[react])) {
        newMsg.react(newMsg.guild.emojis.find('name', data.reacts[react]));
      } else {
        console.log('That emoji doesn\'t exist.');
      }
    }
  }
};
