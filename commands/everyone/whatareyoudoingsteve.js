const { Command } = require('discord.js-commando');

module.exports = class WhatAreYouDoingCommand extends Command {
  constructor (stevebot) {
    super(stevebot, {
      name: 'whatareyoudoingsteve',
      aliases: ['whatareyoudoing', 'whatsupsteve', 'supsteve'],
      group: 'everyone',
      memberName: 'whatareyoudoingsteve',
      description: 'See what Steve is up to!',
    });
  }

  run(msg) {
    var answers = [
      'Munching on eucalyptus!',
      'Wishing I had Enchilada\'s dogs.',
      'Looking for my last pixel on koalastothemax!',
      'Wondering why you all love Hamilton so much...',
      '<:dumpsterfire:304109947682291741>',
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
      'I AM NOT THROWIN\' AWAY MY SHOT',
      'Hanging out with RoDad!',
      'Did you know that the odds of me appearing on http://koalastothemax.com are completely random?',
      'Just looking under park benches in Amsterdam!',
      'Observing puppy-sized elephants in the wild.',
      'Writing some Koana Lisa fanfic!',
      'Trying to explain pregaroo. It\'s not working out well...',
      '<http://tuataria.com>',
      'Reminder to drink water and :selfcarebunny:!',
      'Listening to Matilda because of Rith.',
      'Do you want to show your Tuataria pride in public? YES! Then you should go to DFTBA.com and purchase yourself an It\'s a Tuatara shirt to showcase your pride!! Don\'t forget that 15% of the proceeds goes towards Project for Awesome! Nothing is better than that!! Buy your Tuatara shirt now!! http://tuataria.com/shirt',
      '<:charizardthismofo:304073296138338314> worldsuck!',
      ':arrow_up: :arrow_up: :arrow_down: :arrow_down: :arrow_left: :arrow_right: :arrow_left: :arrow_right: :b: :a:',
      'Having an international dance party!',
      'Documenting the naughtiness.'
    ];
    var random = Math.floor(Math.random() * answers.length);
    msg.channel.send(answers[random]);
  }
};
