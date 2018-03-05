const commando = require('discord.js-commando');
const Discord = require('discord.js');

class AvatarCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      group: 'info',
      memberName: 'avatar',
      examples: ["-tr!avatar [@mention]", '- tr!avatar'],
      description: "Shows your or other's avatar/s",
    });
  }

  async run(msg, args) {
    let message = await msg.channel.send("**Generating avatar...**");
    var args = msg.content.split(/[ ]+/);
    let user = msg.mentions.users.first();
    if (args[1] = user) {
      if (!msg.guild) return;
      const embed = new Discord.RichEmbed()
        .setTitle(`${user.username}'s Avatar:`)
        .setTimestamp()
        .setImage(user.avatarURL)
        .setColor('RANDOM')
        .setFooter(`Member ID: ${msg.author.id}`)
      await msg.channel.send({
        embed
      })
      message.delete();
    } else {
      const embed = new Discord.RichEmbed()
        .setTitle(`${msg.author.username}'s Avatar:`)
        .setTimestamp()
        .setImage(msg.author.avatarURL)
        .setColor('RANDOM')
        .setFooter(`Member ID: ${msg.author.id}`)
      await msg.channel.send({
        embed
      })
      message.delete();
    }
  }
}

module.exports = AvatarCommand;
