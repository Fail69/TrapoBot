const commando = require('discord.js-commando');
const dateFormat = require('dateformat');
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy');
const Discord = require('discord.js');
const fs = require("fs");
let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));

class ProfileCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'info',
      group: 'info',
      memberName: 'info',
      description: 'See your profile info'
    });
  }

  async run(msg, args) {
    let talkedRecently = new Set();

    let author = msg.author;
    let authorGuild = msg.guild.member(msg.author)
    const millis = new Date().getTime() - msg.guild.createdAt.getTime();
    const days = millis / 1000 / 60 / 60 / 24;

    var args = msg.content.split(/[ ]+/);
    let user = msg.guild.member(msg.mentions.users.first());
    let member = msg.mentions.users.first();

    if (args[1] = user) {
      if (member.bot) return msg.channel.send(':robot: | Bots has no profiles');
      if (!points[author.id]) points[author.id] = {
        points: 0,
        level: 0
      }
      let userData = points[author.id];
      userData.points++;

      let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
      let server = msg.guild;

      if (talkedRecently.has(author.id)) {
        return;
      }
      talkedRecently.add(author.id);
      setTimeout(() => {
        talkedRecently.delete(author.id);
      }, 22500);
      const embed = new Discord.RichEmbed()
        .setAuthor(`${member.tag}`, member.avatarURL)
        .addField(`Created at:`, `**${dateFormat(member.createdAt)}**`, true)
        .addField(`Joined to **${msg.guild.name}** at:`, `**${dateFormat(user.joinedAt)}**`, true)
        .addField('Channel ID:', `${msg.channel.id}`, true)
        .setTimestamp()
        .addField('Nickname:', `**${user.nickname}**`, true)
        .addField('Status:', `${member.presence.status}`, true)
        .setThumbnail(member.avatarURL)
        .addField(`Level: ${userData.level}`, `Points [${userData.points}]`, true)
        .setColor('RANDOM')
        .addField('y.help', 'Type this in chat. This will give you a list of things you can do!')
        .addField(`Roles [${user.roles.filter(role => role.id !== msg.guild.id).size}]:`, msg.guild.member(user).roles.filter(role => role.id !== msg.guild.id).map(r => r.name), true)
        .setFooter(`Member ID: ${member.id}`)
      msg.channel.send({
        embed
      })
    } else {
      if (!points[author.id]) points[author.id] = {
        points: 0,
        level: 0
      };
      let userData = points[author.id];
      userData.points++;

      let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
      let server = msg.guild;

      if (talkedRecently.has(author.id)) {
        return;
      }
      talkedRecently.add(author.id);
      setTimeout(() => {
        talkedRecently.delete(author.id);
      }, 22500);
      const embed = new Discord.RichEmbed()
        .setAuthor(`${author.tag}`, author.avatarURL)
        .addField(`Created at:`, `**${dateFormat(author.createdAt)}**`, true)
        .addField(`Joined to **${msg.guild.name}** at:`, `**${dateFormat(authorGuild.joinedAt)}**`, true)
        .addField('Channel ID:', `${msg.channel.id}`, true)
        .setTimestamp()
        .addField('Nickname:', `**${authorGuild.nickname}**`, true)
        .addField('Status:', `${author.presence.status}`, true)
        .setThumbnail(author.avatarURL)
        .addField(`Level: ${userData.level}`, `Points [${userData.points}]`, true)
        .setColor('RANDOM')
        .addField('y.help', 'Type this in chat. This will give you a list of things you can do!')
        .addField(`Roles [${msg.guild.member(author).roles.filter(role => role.id !== msg.guild.id).size}]:`, msg.guild.member(author).roles.filter(role => role.id !== msg.guild.id).map(r => r.name), true)
        .setFooter(`Member ID: ${author.id}`)
      msg.channel.send({
        embed
      })
    };
  }
}

module.exports = ProfileCommand;
