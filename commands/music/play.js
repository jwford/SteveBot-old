const commando = require('discord.js-commando');

var LOADDIR = "C:/Users/BoedJ/Music/cap.mp3";

var request = require("superagent");

class PlayCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: 'random',
      memberName: 'play',
      description: 'Plays a song.'
    });
  }

  async run(message, args) {
      //message.channel.sendMessage("Heard ya!");

      var link = message.content.split(" ");
		  link.splice(0, 1);
		  link = link.join(" ");
      message.channel.sendMessage("Now playing: " + link);

      var voiceChannel = message.member.voiceChannel;
      voiceChannel.join()
        .then(connection => {
          //var request = require("request");
      		var stream = request(link);
      		const dispatcher = connection.playStream(stream);
          //const dispatcher = connection.playFile(LOADDIR);
        })
          .catch(console.error());
  		message.channel.sendMessage("Joining this party!");


      var connection = message.member.voiceConnection;

      //var filePath = LOADDIR;// + link;
			//connection.playFile(filePath);

    //var request = require("request");
		//var stream = request(link);
		//connection.playStream(stream);

      /*message.channel.sendMessage("Trying to play... " + message.toString());

      var link = message.content.split(" ");
      link.splice(0,1);
      console.print(link);
      var connection = client.internal.voiceConnection;
      var request = require("request");
      var stream = request(link);

      connection.playRawStream(stream);*/
  }
}

module.exports = PlayCommand;


//NO IDEA WHAT I'M DOING HERE, JUST PLAYING AROUND
