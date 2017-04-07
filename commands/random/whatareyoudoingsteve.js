const commando = require('discord.js-commando');

module.exports = class WhatAreYouDoingCommand extends commando.Command {
  constructor (stevebot) {
    super(stevebot, {
      name: 'whatareyoudoingsteve',
      aliases: ['whatareyoudoing', 'whatsupsteve', 'supsteve'],
      group: 'random',
      memberName: 'whatareyoudoingsteve',
      description: 'See what Steve is up to!',
    });
  }

  async run(msg) {
    var answers = [
      'Munching on eucalyptus!',
      'Wishing I had Enchilada\'s dogs.',
      'Looking for my last pixel on koalastothemax!',
      'Wondering why you all love Hamilton so much...'
    ];
    var random = Math.floor(Math.random() * answers.length);
    msg.channel.sendMessage(answers[random]);
  }
}
