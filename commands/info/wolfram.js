const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const wa = require("./wolfram_plugin");
const wolfram_plugin = new wa();

module.exports = class WolframCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "wolfram",
      group: "info",
      memberName: "wolfram",
      description: "gives results from WolframAlpha using search terms."
    })
  }

  async run(msg, bot, suffix, args) {
    var args = msg.content.split(/[ ]+/);
    var suffix = args.join(" ").substring(10)
    if (args.length === 1) return msg.channel.send('Please, specify the search.')
    msg.channel.send("*Querying Wolfram Alpha...*").then(msg => {
      wolfram_plugin.respond(suffix, msg.channel, bot, msg);
    });
  }
}
