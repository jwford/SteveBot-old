const { Command } = require('discord.js-commando');

module.exports = class MarkdownCommand extends Command {
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
        type: 'string',
        default: ''
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
    case '':
      msg.channel.sendMessage('\`\`\`fix\n *italics* \n \n **bold** \n \n ***bold italics*** \n \n ~~strikeout~~ \n \n __underline__ \n \n __*underline italics*__ \n \n __**underline bold**__ \n \n __***underline bold italics***__ \n \n The code blocks are done with backticks. Single backtick on either side for a one line code block, three backticks for a multi-line code block.\`\`\`');
      break;
    default:
      msg.reply('that\'s not a markdown thing. Stop making typos before the Jonathans notice.');
    }
  }
};
