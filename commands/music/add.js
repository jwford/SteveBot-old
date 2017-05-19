const discord = require('discord.js');
const commando = require('discord.js-commando');
const ytdl = require(require("../../config.json").downloader);
const musicRole = require('../../config.json').musicRole;
const JukeBox = require("./JukeBox.js");

class AddCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'add',
      group: 'music',
      memberName: 'add',
      description: 'Adds a song to the queue.',
      args: [
        {
          key: 'link',
          label: 'link',
          prompt: 'Which link should I play?',
          type: 'string'
        }
      ]
    });
  }

  hasPermission(msg) {
    return msg.member.roles.find('name', musicRole);
  }

  async run(message, args) {

    if (!JukeBox.joinedVoice()) {
      message.reply("get me into voice before you start making me remember a list of those awful collections of sounds you call songs.");
      return;
    }

    var link = args.link;

    if (link.charAt(0) == '<') {
      link = link.substr(1).slice(0, -1);
    }

    JukeBox.getPlayer().addSong(link, message.author);

/*

    let channel = message.channel;

    var currentSong = JukeBox.getPlayer().getQueue().getCurrentSong();
    let requests = JukeBox.getPlayer().getQueue().getUsers().get(message.author);
    let songString = ' song';
    if (requests > 1) songString = songString + 's';

    let embed = new discord.RichEmbed()
    .setColor(0x4b42f4)
    .addField("Song added:" , currentSong.getTitle() + ' [' + currentSong.getDuration() + ']', false)
    .addField("Requested by:", message.author + " [" + "requested " + requests + songString + " out of " + JukeBox.getPlayer().getQueue().getQueue().length + " in the current queue" + "]", false);
    //.addField("Duration:", info.duration, false);
    //.addField("Position:", JukeBox.getPlayer().getQueue().getQueue().length, true);
    channel.send({embed});

    message.delete();
*/

/*
    ytdl.getInfo(link, function(err, info) {
      var songTitle = '[' + info.title + ']' + '(' + link + ')';
      //message.channel.send("Added " + songTitle + " as per " + message.author + "'s request");
      //message.channel.send('[' + info.title + ']' + '(' + link + ')');

      let channel = message.channel;

      let requests = JukeBox.getPlayer().getQueue().getUsers().get(message.author);
      let songString = ' song';
      if (requests > 1) songString = songString + 's';

      let embed = new discord.RichEmbed()
      .setColor(0x4b42f4)
      .addField("Song added:" , songTitle + ' [' + info.duration + ']', false)
      .addField("Requested by:", message.author + " [" + "requested " + requests + songString + " out of " + JukeBox.getPlayer().getQueue().getQueue().length + " in the current queue" + "]", false);
      //.addField("Duration:", info.duration, false);
      //.addField("Position:", JukeBox.getPlayer().getQueue().getQueue().length, true);
      channel.send({embed});

      message.delete();
    });

*/
  }
}

module.exports = AddCommand;
