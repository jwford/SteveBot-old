module.exports = msg => {
  var emoji = msg.guild.emojis.find('name', 'giantsquidofanger');
  if (!emoji) return;
  msg.react(emoji);
};
