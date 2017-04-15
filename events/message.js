module.exports = msg => {
  var numMentions = msg.mentions.users.size;
    if (numMentions >= 15) {
      msg.delete();
      return msg.reply('Can you stop spamming mentions so I can go back to my eucalyptus?');
    }
    if (msg.content.includes('@everyone') || msg.content.includes('@here')) {
      msg.delete();
      msg.reply('I\'m trying to eat eucalyptus in peace right now, so please stop trying to tag everyone.');
    }
};
