const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class GlobalMessageCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "gb",
      group: "misc",
      memberName: "gb",
      description: "Sends a global message (to every server Yui is in)"
    })
  }

  async run(msg, args, client) {
    var channel = msg.guild.channels.map(c => c.name);
    msg.channel.send('testing')
  }
}
