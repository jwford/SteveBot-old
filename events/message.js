module.exports = message => {
  var numMentions = msg.mentions.users.size;
    if (numMentions >= 15) {
      msg.delete();
      return msg.reply('Can you stop spamming mentions so I can go back to my eucalyptus?');
    }
};
