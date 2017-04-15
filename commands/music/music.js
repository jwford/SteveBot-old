const commando = require('discord.js-commando');

//const MusicPlayer = require("./MusicPlayer.js");

const JukeBox = require("./JukeBox.js");

//let myMusicPlayer;

class MusicCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'music',
      group: 'music',
      memberName: 'music',
      description: 'Starts up a music session.'
    });
  }

  run(message, args) {
    var voiceChannel = message.guild.channels.find('name', '🎵 music');

    //var myMusicPlayer = new MusicPlayer(voiceChannel);
    JukeBox.startPlayer(voiceChannel);

    JukeBox.getPlayer().joinVoiceChannel();
    //myMusicPlayer.joinVoiceChannel();

    message.channel.sendMessage("Joined " + voiceChannel + ". Ready to play!");
    console.log("Ready to play... ");

    //JukeBox.getPlayer().addSong("https://www.youtube.com/watch?v=XXUCFk8VJFY");
    //myMusicPlayer.addSong("https://www.youtube.com/watch?v=XXUCFk8VJFY");

    //message.channel.sendMessage("Added " + "<" + musicPlayer.getQueue() + ">");

    //playList.add(link);

    //myMusicPlayer.play();



  }
}

module.exports = MusicCommand;
