const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class FollowCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "follow",
      group: "dev's commands",
      memberName: "follow",
      description: "Follows every damn move of certain people (just for the owner)."
    });
  }

  async run(msg, args) {
    let user = msg.mentions.users.first();
    if (args = user) {
      if (msg.author.id = user.id) {
        console.log(msg)
      }
    }
  }
}
