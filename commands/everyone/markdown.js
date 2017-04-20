const commando = require('discord.js-commando');

module.exports = class MarkdownCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'markdown',
      group: 'everyone',
      memberName: 'markdown',
      description: 'Need help with markup? This is for you!',
      args: [{
        key: 'question',
        label: 'question',
        prompt: 'What do you want to know how to do?',
        type: 'string'
      }]
    });
  }

  run(msg, args) {
    var query = args.question;

    switch (query) {
    case 'italics':
      msg.channel.sendMessage('\`*italics*\`');
      break;
    case 'bold':
      msg.channel.sendMessage('\`**bold**\`');
      break;
    case 'bold italics':
      msg.channel.sendMessage('\`***bold italics***\`');
      break;
    case 'strikeout':
      msg.channel.sendMessage('\`~~strikeout~~\`');
      break;
    case 'underline':
      msg.channel.sendMessage('\`__underline__\`');
      break;
    case 'underline italics':
      msg.channel.sendMessage('\`__*underline italics*__\`');
      break;
    case 'underline bold':
      msg.channel.sendMessage('\`__**underline bold**__\`');
      break;
    case 'underline bold italics':
      msg.channel.sendMessage('\`__***underline bold italics***__\`');
      break;
    default:
      msg.reply('that\'s not a markdown thing. Stop making typos before the Jonathans notice.');
    }
  }
};
