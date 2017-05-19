const commando = require('discord.js-commando');
const musicRole = require('../../config.json').musicRole;
const JukeBox = require('./JukeBox.js');

class SearchCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'search',
      group: 'music',
      memberName: 'search',
      description: 'Searches YouTube for the specified query and adds the result to the queue.',
      args: [
        {
          key: 'query',
          label: 'query',
          prompt: 'What would you like to search for?',
          type: 'string'
        }
      ]
    });
  }

  hasPermission(msg) {
    return msg.member.roles.find('name', musicRole);
  }

  run(message, args) {

    if (!JukeBox.joinedVoice()) {
      message.reply("get me into voice before you start making me search stuff.");
      return;
    }

    JukeBox.getPlayer().search(args.query, message.author);
  }
}

module.exports = SearchCommand;
