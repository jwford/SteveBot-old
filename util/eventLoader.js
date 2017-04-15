const reqEvent = (event) => require(`../events/${event}`);
module.exports = stevebot => {
  stevebot.on('ready', () => reqEvent('ready')(stevebot));
  stevebot.on('message', reqEvent('message'));
  stevebot.on('messageDelete', reqEvent('messageDelete'));
  stevebot.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  stevebot.on('guildMemberRemove', reqEvent('guildMemberRemove'));
};
