const reqEvent = (event) => require(`../events/${event}`);
module.exports = stevebot => {
  stevebot.on('ready', () => reqEvent('ready')(stevebot));
  stevebot.on('message', reqEvent('message'));
};
