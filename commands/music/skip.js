const commando = require('discord.js-commando');
const JukeBox = require('./JukeBox.js');
const musicRole = require('../../config.json').musicRole;
const musicChannels = require('../../config.json').musicChannels;
class SkipCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'skip',
      group: 'music',
      memberName: 'skip',
      description: 'Skips the current song.'
    });
  }

  hasPermission(msg) {
    return msg.member.roles.find('name', musicRole);
  }

  /*
  Make it so
  Separate command for mod overrule? (might want to just vote instead of overruling sometimes)
  user leaves channel after vote -> get rid of vote
  */

  run(message, args) {
    if (!JukeBox.getPlayer().isPlaying()) {
      message.reply("I can't skip what isn't playing, smartass.");
      return;
    }
    JukeBox.getPlayer().addSkipVote(message.author);
    var voiceChannel = message.guild.channels.find('id', musicChannels[0]);
    let listenersAmount = voiceChannel.members.size - 1;
    let requiredSkipVotes = Math.floor((listenersAmount / 2) + 1);
    if (message.author === JukeBox.getPlayer().getQueue().getCurrentSong().getUser()) {
      //let skippedSong = JukeBox.getPlayer().skip();
    //  message.channel.send("Skipped " + skippedSong);
      message.channel.send("Skipped the song " + '_(simulating for now)_');
    }
    else if (JukeBox.getPlayer().getSkipVotes() >= requiredSkipVotes) {
      //let skippedSong = JukeBox.getPlayer().skip();
      message.channel.send("Skipped the song" + '_(simulating for now)_');
    } else {
      message.reply("Since you didn't request this song, you'll need more people to ask to skip it." + ' [' + JukeBox.getPlayer().getSkipVotes() + '/' + requiredSkipVotes + ']');
    }

  }

}

module.exports = SkipCommand;
