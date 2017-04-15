const commando = require('discord.js-commando');
const queue = require("./PriorityQueue.js");

class AddCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'add',
      group: 'music',
      memberName: 'add',
      description: 'Adds a song to the queue.'
    });
  }

  run(message, args) {

    let link = "https://www.youtube.com/watch?v=XXUCFk8VJFY";

    queue.add(link);
    message.channel.sendMessage("Added to the queue!");
    message.channel.sendMessage("Currently in queue: " + "<" + queue.getCurrentSong() + ">");
  }
}

module.exports = AddCommand;
