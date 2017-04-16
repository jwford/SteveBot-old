const commando = require('discord.js-commando');

module.exports = class TimezoneCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'timezone',
      group: 'everyone',
      memberName: 'timezone',
      description: 'This doesn\'t do what you think it does.',
      throttling: {
        usages: 1,
        duration: 500
      }
    });
  }

  run(msg) {
    msg.channel.sendMessage('Watch this video to find out why the two uni students that have already dedicated far too much time to this project are not going to mess around with a timezone converter. Might happen later, but not right now. <https://goo.gl/KmHlq4>');
  }
};
