const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'fun',
      memberName: 'roll',
      description: 'Rolls a die',
    });
  }

  async run(msg, args) {
    var roll = Math.floor(Math.random() * 6) + 1;
    msg.channel.send(`${msg.author.username} You've rolled a ${roll}`);
  }
}

module.exports = DiceRollCommand;
