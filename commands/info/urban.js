const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const urban = require("urban");

module.exports = class UrbanCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "urban",
      group: "info",
      memberName: "urban",
      description: "Looks up a word on Urban Dictionary."
    })
  }

  async run(msg, bot, args) {
    var args = msg.content.split(/[ ]+/);
    var targetWord = urban(args.join(" ").substring(8));
    targetWord.first(function(json) {
      if (json) {
        var example = json.example;
        var word = json.word;
        var defin = json.definition;
        if (!example) {
          example = "None.";
        }
        const embed = new Discord.RichEmbed()
          .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
          .setTimestamp()
          .addField(`Urban Dictionary: **__${word}__**`, `${defin}`)
          .addField(`__Example__:`, `${example}`)
          .setColor('RANDOM')
          .addField('By:', `${json.author}`)
          .addField('👍:', `${json.thumbs_up}`)
          .setFooter(`UrbanDictionary: ${json.permalink}`)
        msg.channel.send({
          embed
        });
      } else {
        msg.channel.send("__No matches found__");
      }
    });
  }
}
