const commando = require('discord.js-commando');
const Discord = require('discord.js');
const winston = require('winston');
const request = require('request');
const Danbooru = require('danbooru');
const config = require('../../config.json');
const authedBooru = new Danbooru({
  login: config.danLogin,
  api_key: config.danAPIKey
});
const moment = require('moment');
const dateFormat = require('dateformat');
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy');

function embed(text, msg) {
  return ({
    embed: new Discord.MessageEmbed().setDescription(text).setColor(`${msg.guild.me.displayHexColor!=='#000000' ? msg.guild.me.displayHexColor : config.hexColour}`)
  });
}

let guildPrefix = 'y.'

class DanbooruCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'danbooru',
      aliases: ['db'],
      group: 'nsfw',
      memberName: 'danbooru',
      examples: ['- tr!<danbooru/db> [Images_To_Search]'],
      description: "Searchs some nsfw files in danbooru.donmai.us :o.",
    });
  }
  async run(msg, args, rating) {
    const millis = new Date().getTime() - msg.guild.createdAt.getTime();
    const days = millis / 1000 / 60 / 60 / 24;


    if (!msg.channel.nsfw && rating === 'e') return msg.channel.send(`**ERROR:** This channel has not been marked for NSFW content`);
    var tag1 = '';
    var tag2 = '';
    var tag = '';
    var flag = false;
    var count = 0;
    var sp = msg.content.replace(/\//g, ' / ').split(/\s+/g);
    sp.shift();
    for (var i = 0; i < sp.length && count < 2; i++) {
      if (sp[i] === '/') {
        flag = true;
        count++;
      }
      if (sp[i] !== '/' && flag === false) { //tag 1
        tag1 += `${sp[i]}_`;
      } else {
        if (sp[i] !== '/' && flag === true) { //tag 2
          tag2 += `${sp[i]}_`;
        }
      }
    }
    tag1 = tag1.slice(0, tag1.length - 1);
    tag2 = tag2.slice(0, tag2.length - 1);
    if (flag === true) {
      tag = `${tag1}+${tag2}`;
    } else {
      tag = `*${tag1}*`;
    }
    if ((tag.toLowerCase().match(/kanna/g) && rating === 'e') || (tag.toLowerCase().match(/kamui/g) && rating === 'e'))
      return msg.channel.send(`Don't lewd the dragon loli`);
    request(`https://danbooru.donmai.us/posts.json?tags=${tag}&rating=${rating}&limit=1&random=true`, function(error, response, body) {
      body = JSON.parse(body);
      if (error != null) {
        msg.channel.send(`**ERROR:** Could not access Danbooru API`);
      } else {
        if (body[0]) {
          var post = body[0];
          const embed = new Discord.RichEmbed()
            .setTitle(`Artist: ${post.tag_string_artist} | [Source](https://danbooru.donmai.us/posts/${post.id}) | [Original Source](${post.source})`)
            .setFooter(`Not what you expected? Try using ${guildPrefix}danbooru ${tag1} ${tag2 ? `or ${guildPrefix}danbooru ${tag2}`:``}`)
            .setColor('RANDOM')
            .setImage(`http://danbooru.donmai.us${post.file_url}`)
          msg.channel.send({
            embed
          });
        } else { //no posts found -- so lets see if any of the tags are invalid and display subsequent suggestions
          var valid1 = false;
          var valid2 = false;
          var sugg = '';

          request(`https://danbooru.donmai.us/tags.json?search[name]=${tag1}`, function(e, r, b) { //validate tag 1
            if (b !== '[]') { //tag is valid
              // console.log('tag 1 valid');
              request(`https://danbooru.donmai.us/tags.json?search[name]=${tag2}`, function(e, r, b) { //validate tag 2
                if (b !== '[]') { //tag is valid
                  // console.log('tag 2 valid');
                  msg.channel.send(`**ERROR:** Could not find posts matching ${tag2? `**${tag1}** and **${tag2}**`:`**${tag1}**`}\n\nMaybe try some different tags.`);
                } else { //tag is invalid -- do an autocomplete lookup
                  // console.log('tag 2 invalid');
                  sugg += `Suggested tags for ${tag2}\n`;
                  request(`https://danbooru.donmai.us/tags/autocomplete.json?search[name_matches]=*${tag2}*`, function(e, r, b) {
                    b = JSON.parse(b);
                    if (b[0] != null) {
                      for (var i = 0; i < b.length && i < 3; i++)
                        sugg += `${b[i].name}\n`;
                    } else {
                      sugg += 'None found\n';
                    }
                  }).auth(config.danLogin, config.danAPIKey);
                  msg.channel.send(`**ERROR:** Could not find posts matching ${tag2? `**${tag1}** and **${tag2}**`:`**${tag1}**`}\n\nTry re-wording the parameters with the **${guildPrefix}tags [search term]** command to find what you're looking for\n\nHere are some suggestions we generated:\n\`\`\`${sugg}\`\`\``);
                }
              }).auth(config.danLogin, config.danAPIKey);
            } else { //tag is invalid -- do an autocomplete lookup
              // console.log('tag 1 invalid');
              sugg += `--- Suggested tags for ${tag1}\n`;
              request(`https://danbooru.donmai.us/tags/autocomplete.json?search[name_matches]=*${tag1}*`, function(e, r, b) {
                b = JSON.parse(b);
                if (b[0] != null) {
                  for (var i = 0; i < b.length && i < 3; i++)
                    sugg += `${b[i].name}\n`;
                } else {
                  sugg += 'None found\n';
                }
                request(`https://danbooru.donmai.us/tags.json?search[name]=${tag2}`, function(e, r, b) { //validate tag 2
                  if (b !== '[]') { //tag is valid
                    // console.log('tag 2 valid');
                    msg.channel.send(`**ERROR:** Could not find posts matching ${tag2? `**${tag1}** and **${tag2}**`:`**${tag1}**`}\n\nMaybe try some different tags.`);
                  } else { //tag is invalid -- do an autocomplete lookup
                    // console.log('tag 2 invalid');
                    sugg += `--- Suggested tags for ${tag2}\n`;
                    request(`https://danbooru.donmai.us/tags/autocomplete.json?search[name_matches]=*${tag2}*`, function(e, r, b) {
                      b = JSON.parse(b);
                      if (b[0] != null) {
                        for (var i = 0; i < b.length && i < 3; i++)
                          sugg += `${b[i].name}\n`;
                      } else {
                        sugg += 'None found\n';
                      }
                      msg.channel.send(`**ERROR:** Could not find posts matching ${tag2? `**${tag1}** and **${tag2}**`:`**${tag1}**`}\n\nTry re-wording the parameters with the **${guildPrefix}tags [search term]** command to find what you're looking for\n\nHere are some suggestions we generated:\n\`\`\`${sugg}\`\`\``);
                    }).auth(config.danLogin, config.danAPIKey);
                  }
                }).auth(config.danLogin, config.danAPIKey);
              }).auth(config.danLogin, config.danAPIKey);
            }
          }).auth(config.danLogin, config.danAPIKey);
        }
      }
    }).auth(config.danLogin, config.danAPIKey);
  }
}
module.exports = DanbooruCommand;
