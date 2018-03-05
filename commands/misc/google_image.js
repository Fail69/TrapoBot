const commando = require('discord.js-commando');
const Discord = require('discord.js');
const google = require('../../util/google');

function image(msg) {
  google.image(msg.content, msg.channel.nsfw)
    .then((link) => {
      msg.reply(link || 'No results found', {
        bold: !link
      })
    })
}

module.exports = class GoogleImageCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "gimg",
      group: "misc",
      memberName: "gimg",
      description: "Searchs for an image on Google Image."
    });
  }

  async run(msg, args) {
    image();
  }
}
