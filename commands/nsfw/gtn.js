const commando = require('discord.js-commando');
const Discord = require('discord.js');
const winston = require('winston');
const request = require('request');
const path = require('path');

class GtnImage extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'gtn',
      group: 'nsfw',
      memberName: 'gtn',
      examples: ['- tr!gtn'],
      description: "Well, it's for nsfw, what else do you need to know?",
    });
  }
  async run(msg, args) {
    if (!msg.channel.name.startsWith('nsfw')) {
      return msg.channel.send('You must be on a channel that starts with the word **`nsfw`**');
    }
    request.get('https://rra.ram.moe/i/r', {
      qs: {
        'type': 'nsfw-gtn',
        'nsfw': true
      }
    }, (err, result, body) => {
      if (err) return winston.error(err);
      let parsedBody = JSON.parse(body);
      msg.channel.send(`https://rra.ram.moe${parsedBody.path}`);
    });
  }
}
module.exports = GtnImage;
