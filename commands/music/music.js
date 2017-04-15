const commando = require('discord.js-commando');

const musicPlayer = require("./MusicPlayer.js");

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
    let voiceChannel = message.guild.channels.find('name', 'music');
    musicPlayer.joinVoiceChannel(voiceChannel);

    message.channel.sendMessage("Joined " + voiceChannel + ". Ready to play!");
    console.log("Ready to play... ");


    musicPlayer.addSong("https://www.youtube.com/watch?v=XXUCFk8VJFY");

    message.channel.sendMessage("Added " + "<" + musicPlayer.getQueue() + ">");

    //playList.add(link);

    musicPlayer.play();



  }
}

module.exports = MusicCommand;
