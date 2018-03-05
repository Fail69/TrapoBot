const commando = require('discord.js-commando');
const Discord = require('discord.js');
const winston = require('winston');
const axios = require('axios');
const request = require('request');

class RandomKittyCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'randomcat',
      aliases: ['rdmcat'],
      group: 'misc',
      memberName: 'randomcat',
      examples: ["- tr!<randomcat/rdmcat>"],
      description: "Sends a cute kitty <3.",
    });
  }

  async run(msg, args) {
    try {
      let req = await axios.get('http://random.cat/meow');
      let url = req.data.file.replace('\\', 'g');
      msg.channel.send(url);
    } catch (e) {
      winston.error(e);
      msg.channel.send('Error...')
    }
  }
}
module.exports = RandomKittyCommand;
