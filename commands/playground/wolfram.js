const commando = require('discord.js-commando');
const wolfram = require('wolfram').createClient("7W542X-678AQHHJ87");

class WolframCommand extends commando.Command {

  constructor(stevebot) {
    super(stevebot, {
      name: 'wolfram',
      group: 'playground',
      memberName: 'wolfram',
      description: 'Does wolfram stuffs.',
      args: [
        {
          key: 'expression',
          label: 'expression',
          prompt: 'What would you like Wolfram to evaluate?',
          type: 'string'
        }
      ]
    });
  }

  run(message, args) {

    var answer = "idk m8, figure it out yourself jeez";

    wolfram.query(args.expression, function(err, result) {
      if (err) throw err;

      if (result[0]) {
        if (result[0].primary) {
          answer = result[0].subpods[0].value;
        } else if (result[1].primary) {
          answer = result[1].subpods[0].value;
        }
      }

      message.channel.send("Result: " + answer);
      //console.log("Result: %j", result);
    });
  }
}

module.exports = WolframCommand;
