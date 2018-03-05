const commando = require('discord.js-commando');
const fs = require("fs");
let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));

class LevelCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'level',
      group: 'info',
      memberName: 'level',
      description: 'Shows your actual level',
    });
  }

  async run(msg, args) {
    if (!points[msg.author.id]) points[msg.author.id] = {
      points: 0,
      level: 0
    };
    let userData = points[msg.author.id];
    userData.points++;

    let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
    msg.channel.send("", {
      embed: {
        color: 3447003,
        author: {
          name: msg.author.username,
          icon_url: msg.author.avatarURL
        },
        title: `${msg.author.username}'s level`,
        description: `Your actual level is ${userData.level}, with ${userData.points} points`
      }
    })
  }
}

module.exports = LevelCommand;
