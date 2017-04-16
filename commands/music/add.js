const commando = require('discord.js-commando');
//const queue = require("./PriorityQueue.js");
//const MusicPlayer = require("./MusicPlayer.js");
const ytdl = require("youtube-dl");

const JukeBox = require("./JukeBox.js");

class AddCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'add',
      group: 'music',
      memberName: 'add',
      description: 'Adds a song to the queue.'
    });
  }

  async run(message, args) {

    var link = message.content.split(" ");
    link.splice(0, 1);
     link = link.join(" ");

    if (link.charAt(0) == '<') {
      link = link.substr(1).slice(0, -1);
    }

    JukeBox.getPlayer().addSong(link);

    ytdl.getInfo(link, function(err, info) {
      message.channel.sendMessage("Added " + info.title);
    });

    //message.channel.sendMessage("Currently in queue: " + "<" + JukeBox.getPlayer().getQueue().getQueue().toString() + ">");
  }
}

module.exports = AddCommand;
