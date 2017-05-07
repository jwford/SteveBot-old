module.exports = stevebot => {
  console.log(`Stevebot is reconnecting to ${stevebot.guilds.map(g => g.name).join(', ')}`);
};
