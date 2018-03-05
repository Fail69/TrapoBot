const commando = require('discord.js-commando');
const Discord = require('discord.js');
const winston = require('winston');
const axios = require('axios');
const request = require('request');

class RandomDogCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'randomdog',
      aliases: ['rdmdog'],
      group: 'misc',
      memberName: 'randomdog',
      examples: ["- tr!<randomdog/rdmdog>"],
      description: "Sends a cute dog <3.",
    });
  }

  async run(msg, args) {
    try {
      let req = await axios.get('https://random.dog/woof.json');
      let url = req.data.file.replace('')
      msg.channel.send(url);
    } catch (e) {
      winston.error(e);
      msg.channel.send('Error...')
    }
  }
}
module.exports = RandomDogCommand;
