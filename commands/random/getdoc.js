const commando = require('discord.js-commando');

module.exports = class GetDocCommand extends commando.Command {
  constructor(stevebot) {
    super(stevebot, {
      name: 'getdoc',
      aliases: ['doc'],
      group: 'random',
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
    const docs = new Map();
    docs.set('archived tuatara report', 'https://goo.gl/eEzr8W');
    docs.set('alive tuatara report', 'https://goo.gl/NpoSXl');
    docs.set('welcome to discord', 'https://goo.gl/naQdQ8');
    docs.set('constitution', 'https://goo.gl/Me7d73');
    docs.set('doctionary', 'https://goo.gl/3OWBVM');
    docs.set('pronouns', 'https://goo.gl/w6jnT2');
    docs.set('birthdays', 'https://goo.gl/w6jnT2');
    docs.set('tldr', 'https://goo.gl/VZomUJ');
    docs.set('isnotid', 'https://goo.gl/81Mgb3');
    docs.set('side puzzles', 'https://goo.gl/xXV3Lq');
    docs.set('haiku', 'https://goo.gl/jmjvOC');
    docs.set('creative galleries', 'https://goo.gl/a03tXH');
    docs.set('adoption', 'https://goo.gl/Ir3pA3');
    docs.set('census', 'https://goo.gl/MdF2Xb');
    docs.set('cookbook', 'https://goo.gl/zJPMHC');
    docs.set('fanfic', 'https://goo.gl/hF1GKO');
    docs.set('hank challenge', 'https://goo.gl/qYgCLT');
    docs.set('harry potter', 'https://goo.gl/fWN6Dm');
    docs.set('homework', 'https://goo.gl/HKXbgc');
    docs.set('koalas', 'https://goo.gl/MiBR7T');
    docs.set('snoopana lisa', 'https://goo.gl/Gl9pTU');
    docs.set('koana lisa', 'https://goo.gl/KijI0l');
    docs.set('quotes', 'https://goo.gl/4hkABA');
    docs.set('recommendations', 'https://goo.gl/tXrlve');
    docs.set('songs', 'https://goo.gl/nUuz4S');
    docs.set('capes', 'https://goo.gl/75Nkn8');
    docs.set('john ama', 'https://goo.gl/jR2p27');
    docs.set('trivia', 'https://goo.gl/TAi4oD');
    docs.set('houses', 'https://goo.gl/cMAkYg');
    docs.set('wikiwars', 'https://goo.gl/kcPBzQ');
    docs.set('media', 'https://goo.gl/6EsC9s');
    docs.set('admin meeting notes', 'https://goo.gl/vruk6x');
    docs.set('ceremonial titles', 'https://goo.gl/0GlosQ');
    docs.set('tuatara? tuatara', 'https://goo.gl/S0bSgi');
    docs.set('birthday form', 'https://goo.gl/0ZXIIn');

    var doc = args.doc;
    doc = doc.toLowerCase();
    doc = docs.get(doc);

    if(!doc) return msg.channel.sendMessage('Either I can\'t retrieve that doc (blame Enchilada or BoedJ), or it doesn\'t exist (blame yourself).');

    msg.channel.sendMessage('<' + doc + '>');
  }
};
