const commando = require('discord.js-commando');

class InvLinkCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'invlink',
      group: 'info',
      memberName: 'invlink',
      description: 'Sends my invite link'
    });
  }

  async run(msg, args) {
    msg.channel.send("You can invite me with this: https://discordapp.com/api/oauth2/authorize?client_id=401764707955900417&permissions=8&scope=bot")
  }
}

module.exports = InvLinkCommand;
