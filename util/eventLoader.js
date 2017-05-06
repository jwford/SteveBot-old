const reqEvent = (event) => require(`../events/${event}`);
module.exports = stevebot => {
  stevebot.on('channelCreate', reqEvent('channelCreate'));
  stevebot.on('channelDelete', reqEvent('channelDelete'));
  stevebot.on('channelUpdate', reqEvent('channelUpdate'));
  stevebot.on('guildCreate', reqEvent('guildCreate'));
  stevebot.on('guildDelete', reqEvent('guildDelete'));
  stevebot.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  stevebot.on('guildMemberRemove', reqEvent('guildMemberRemove'));
  stevebot.on('guildMemberUpdate', reqEvent('guildMemberUpdate'));
  stevebot.on('guildUpdate', reqEvent('guildUpdate'));
  stevebot.on('message', reqEvent('message'));
  stevebot.on('messageDelete', reqEvent('messageDelete'));
  stevebot.on('messageUpdate', reqEvent('messageUpdate'));
  stevebot.on('ready', () => reqEvent('ready')(stevebot));
  stevebot.on('roleCreate', reqEvent('roleCreate'));
  stevebot.on('roleDelete', reqEvent('roleDelete'));
  stevebot.on('roleUpdate', reqEvent('roleUpdate'));
};
