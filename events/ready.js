const game = require('../config.json').game;
module.exports = stevebot => {
  console.log(`SteveBot is ready (to eat some eucalyptus)! \nServers: ${stevebot.guilds.map(g => g.name).join(', ')}`);
  stevebot.user.setGame(game);
};
