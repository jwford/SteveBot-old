const discord = require('discord.js');
const commando = require('discord.js-commando');

const JukeBox = require("./JukeBox.js");

const ytdl = require(require("../../config.json").downloader);

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
    var titleList = new Array();
    var positionList = new Array();
    if (songList.length > 0) {
      //var titles = JukeBox.getPlayer().getQueue().getTitles();
      for (var i = 0; i < songList.length; i++) {
        var currSong = songList[i];
        var position = i + 1;
        //positionList.push(position);
        if (position != 1) {
          titleList.push('[' + position + '.' + '\t' + currSong.getTitle() + ']' + '(' + currSong.url + ')' + ' - ' + ' [' + currSong.getDuration() + ']' + ' - ' + currSong.getUser());
        } else {
          titleList.push('[' + position + '. ' + '\t' + currSong.getTitle() + ']' + '(' + currSong.url + ')' + ' - ' + ' [' + currSong.getDuration() + ']' + ' - ' + currSong.getUser());
        }
        //titleList.push('[' + position + '.' + '\t' + titles[i] + ']' + '(' + songList[i] + ')');
        //titleList.push('[' + titles[i] + ']' + '(' + songList[i] + ')');

      }
    } else {
      titleList = "The queue is currently empty!";
    }

    let channel = message.channel;

    let embed = new discord.RichEmbed()
    //.setTitle('Currently queued:')
    .setColor(0x4b42f4)
  //  .addField('Position', positionList, false)

    .addField('Currently queued:', titleList, true);
    channel.send({embed});

  }
}

module.exports = QueueCommand;
