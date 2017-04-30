// const discord = require('discord.js');
// const commando = require('discord.js-commando');
//
// const JukeBox = require("./JukeBox.js");
//
// const ytdl = require("youtube-dl");
//
// class QueueCommand extends commando.Command {
//
//   constructor(stevebot) {
//     super(stevebot, {
//       name: 'queue',
//       group: 'music',
//       memberName: 'queue',
//       description: 'Displays the current queue.'
//     });
//   }
//
//   run(message, args) {
//
//     var songList = JukeBox.getPlayer().getQueue().getQueue();
//     var titleList = new Array();
//     if (songList.length > 0) {
//       var titles = JukeBox.getPlayer().getQueue().getTitles();
//       for (var i = 0; i < songList.length; i++) {
//         titleList.push('[' + titles[i] + ']' + '(' + songList[i] + ')');
//       }
//     } else {
//       titleList = "The queue is currently empty!";
//     }
//
//     let channel = message.channel;
//
//     let embed = new discord.RichEmbed()
//     .setColor(0x4b42f4)
//     .addField('Currently queued:', titleList, true);
//     channel.send({embed});
//
//   }
// }
//
// module.exports = QueueCommand;
