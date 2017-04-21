const commando = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const config = require('../../config.json');

module.exports = class GetDocCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'getdoc',
      aliases: ['doc'],
      group: 'everyone',
      memberName: 'getdoc',
      description: 'Need a doc? This is the command for you!',
      format: '[doc]',
      args: [{
        key: 'doc',
        label: 'doc',
        prompt: 'Input the doc you want to get.',
        type: 'string'
      }]
    });
  }

  run(msg, args) {
    var requestedDoc = args.doc;
    var doc = config.docs[requestedDoc.toLowerCase()];

    if(!doc) return msg.channel.sendMessage('Either I can\'t retrieve that doc (blame Enchilada or BoedJ), or it doesn\'t exist (blame yourself).');

    const embed = new RichEmbed()
    .setColor(0xef7300)
    .addField(`Here's your doc, ${msg.member.displayName}`, '<' + doc + '>', true);
    msg.channel.sendEmbed(embed);
  }
};
