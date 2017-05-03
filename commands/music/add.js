const discord = require('discord.js');
const commando = require('discord.js-commando');
const ytdl = require("ytdl-core");
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
      var songTitle = '[' + info.title + ']' + '(' + link + ')';
      //message.channel.send("Added " + songTitle + " as per " + message.author + "'s request");
      //message.channel.send('[' + info.title + ']' + '(' + link + ')');

      let channel = message.channel;

      let embed = new discord.RichEmbed()
      .setColor(0x4b42f4)
      .addField("Song added:" , songTitle, false)
      .addField("Requested by:", message.author, false);
      //.addField("Duration:", info.size, false)
      //.addField("Position:", JukeBox.getPlayer().getQueue().getQueue().length, true);
      channel.send({embed});

      message.delete();
    });
  }
}

module.exports = AddCommand;
