const game = require('../config.json').game;
module.exports = stevebot => {
  console.log('SteveBot is ready!');
  stevebot.user.setGame(game);
};
