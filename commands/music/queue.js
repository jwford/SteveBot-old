const discord = require('discord.js');
const commando = require('discord.js-commando');

const JukeBox = require("./JukeBox.js");

const ytdl = require("youtube-dl");

class QueueCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'queue',
      group: 'music',
      memberName: 'queue',
      description: 'Displays the current queue.'
    });
  }

  run(message, args) {

    var songList = JukeBox.getPlayer().getQueue().getQueue();
    var titleList = JukeBox.getPlayer().getQueue().getTitles();
/*
    for (var i = 0; i < songList.length; i++) {
      ytdl.getInfo(songList[i], function(err, info) {
        titleList.push(info.title);
        //console.log("Title added: " + info.title);
      });
    }

/*
    songList.forEach(function(link) {
      ytdl.getInfo(link, function(err, info) {
        titleList.push(info.title);
        console.log("Title added: " + info.title);
      });
    })
    .then(function() {
      let channel = message.channel;

      let embed = new discord.RichEmbed()
      .setTitle("Current queue")
      .setColor(0x4b42f4)
      .addField('Song:', songList, true)
      .addField('Title:', titleList, true);
      channel.sendEmbed(embed);
    })
    .catch(e);
*/

    //console.log("Titles: " + titleList);

    let channel = message.channel;

    let embed = new discord.RichEmbed()
    //.setTitle("Current queue")
    .setColor(0x4b42f4)
    //.addField('Song:', songList, true)
    //.addField('Title:', titleList, true);
    .addField('Currently queued:', titleList, true);
    channel.sendEmbed(embed);

  }
}

module.exports = QueueCommand;
