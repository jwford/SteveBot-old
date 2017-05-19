const commando = require('discord.js-commando');
const ytdl = require(require("../../config.json").downloader);
const musicRole = require('../../config.json').musicRole;
const JukeBox = require("./JukeBox.js");

class PlaylistCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'playlist',
      group: 'music',
      memberName: 'playlist',
      description: 'Adds a playlist to the queue.'
    });
  }

  hasPermission(msg) {
    return msg.member.roles.find('name', musicRole);
  }

  run(message, args) {

    var link = message.content.split(" ");
    link.splice(0, 1);
     link = link.join(" ");

    if (link.charAt(0) == '<') {
      link = link.substr(1).slice(0, -1);
    }

    JukeBox.getPlayer().addPlaylist(link);

    ytdl.getInfo(link, function(err, info) {
      message.channel.send("Added playlist. Don't expect me to play the next song, though. I'm a lazy shitbag after all.");
    });

    //message.channel.send("Currently in queue: " + "<" + JukeBox.getPlayer().getQueue().getQueue().toString() + ">");
  }
}

module.exports = PlaylistCommand;
