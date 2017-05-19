const commando = require('discord.js-commando');
const ytdl = require(require("../../config.json").downloader);
const musicRole = require('../../config.json').musicRole;
const JukeBox = require("./JukeBox.js")

class PlauCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'plau',
      group: 'music',
      aliases: ['pway', 'pkay', 'pla?', 'pla', 'olay', 'okay', 'lay', 'pay', 'poay', 'llay', 'plsy', 'plat', 'plag', 'plah', 'plaj', 'okt', '[;su'],
      memberName: 'plau',
      description: 'Starts playing the songs in the queue.'
    });
  }

  hasPermission(msg) {
    return msg.member.roles.find('name', musicRole);
  }

  run(message, args) {
      let amount = Math.floor((Math.random() * 60) + 1);
      message.reply("you pulled a Katherine!");
      setTimeout(this.kath, amount*1000);
  }

  kath() {

    JukeBox.getPlayer().getVoiceChannel().connection.playFile('C:/Users/BoedJ/Desktop/Tuataria/KathScreech.mp3');
  }

}

module.exports = PlauCommand;
