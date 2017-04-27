const commando = require('discord.js-commando');
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

  run(message, args) {
    var link = message.content.split(" ");
    link.splice(0, 1);
     link = link.join(" ");

    if (link.charAt(0) == '<') {
      link = link.substr(1).slice(0, -1);
    }

    JukeBox.getPlayer().addSong(link);

    ytdl.getInfo(link, function(err, info) {
      message.channel.send("Added " + info.title);
    });
  }
}

module.exports = AddCommand;
