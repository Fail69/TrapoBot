const commando = require('discord.js-commando');
const Discord = require('discord.js');
const google = require('../../util/google');

function search(msg) {
  google.search(msg.content, msg.channel.nsfw)
    .then(({
      card,
      results
    }) => {
      if (card) {
        msg.reply(card);
      } else if (results.length) {
        const links = results.map((r) => r.link);
        msg.reply(`${links[0]}
**See Also:**
${links.slice(1, 3).map((l) => `<${l}>`).join('\n')}`.trim(), {
          bold: false
        });
      } else {
        msg.reply('No results found');
      }
    });
}

module.exports = class GoogleSearchCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "google",
      group: "misc",
      memberName: "google",
      description: "Searchs on Google.com, does this really need a description?"
    });
  }

  async run(msg, args) {
    search();
  }
}
