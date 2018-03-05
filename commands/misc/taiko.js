const Discord = require('discord.js');
const request = require('request');
const commando = require('discord.js-commando');
const winston = require('winston');
const fs = require('fs');
const path = require('path');
var config = JSON.parse(fs.readFileSync('./config.json'));
var osuAPIKey = config.osu_token;
const osu = require('node-osu');
var osuApi = new osu.Api(osuAPIKey, {
  notFoundAsError: true,
  completeScores: false
})

class TaikoCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'taiko',
      group: 'misc',
      aliases: ['t'],
      memberName: 'taiko',
      description: "Shows some user's stats!",
      examples: ['tr!<taiko/t> [User_Name/ID]']
    });
  }

  async run(msg, args) {
    osuApi.getUser({
      u: args,
      m: 1
    }).then(user => {
      const embed = new Discord.RichEmbed()
        .setAuthor(`${user.name}`, `https://a.ppy.sh/${user.id}_${Date.now()}.png`)
        .setTitle(`${user.name}'s taiko Stats:`)
        .addField('Name:', `${user.name}`)
        .addField('Country:', `${user.country}`)
        .addField('Level:', `${user.level}`)
        .setThumbnail(`https://a.ppy.sh/${user.id}_${Date.now()}.png`)
        .addField('Acc:', `${user.accuracyFormatted}`)
        .setTimestamp()
        .addField('SS:', `${user.counts.SS}`)
        .addField('S:', `${user.counts.S}`)
        .addField('A:', `${user.counts.S}`)
        .addField('Plays:', `${user.counts.plays}`)
        .addField('PP:', `${user.pp.raw}`)
        .setColor('RANDOM')
        .addField('Rank:', `#${user.pp.rank}`)
        .addField('Country Rank:', `#${user.pp.countryRank}`)
        .setFooter(`UserID: ${user.id}`)
      msg.channel.send({
        embed
      })
    }).catch(error => {
      msg.channel.send("**User does not exist, or I cannot find you.**");
      console.log(error)
    });
  }
}
module.exports = TaikoCommand;
