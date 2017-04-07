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
      'Wondering why you all love Hamilton so much...',
      ':dumpsterfire:',
      'IF YOU SHOULD BE SLEEPING, GO TO SLEEP.',
      '*wakes up* ..wha? John Green was here? IS HE HERE NOW??? Oh, okay. Back to sleep...',
      'If you aren\'t bringing me eucalyptus, go away.',
      'BEAUTIFULLY SUNG',
      'Where\'s Meg? I want to learn about plant sex.',
      'DERP AND FLOOF',
      'Time to close some of these tabs...',
      'Huh? People need to sleep? Where\'s Samuel L. Jackson when you need him...',
      ':fire: :fire: :fire: :fire: :fire:',
      ':boom: :boom: :boom: :boom: :boom:',
      'FOR THE FORSEEABLE FUTURE',
      'http://koalastothemax.com',
      'I AM NOT THROWIN\' AWAY MY SHOT'
    ];
    var random = Math.floor(Math.random() * answers.length);
    msg.channel.sendMessage(answers[random]);
  }
}
