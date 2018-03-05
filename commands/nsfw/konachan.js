const commando = require('discord.js-commando');
const Discord = require('discord.js');
const winston = require('winston');
const request = require('request');
const konachanFilter = [
  'shota', // shota, shotacon
  'child' // child, child_porn
];

class KonachanCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'konachan',
      aliases: ['kn'],
      group: 'nsfw',
      memberName: 'konachan',
      examples: ['- tr!<konachan/kn> [loli/shota/child]'],
      description: "Searchs some nsfw files in konachan.com 7w7.",
    });
  }
  async run(msg, args) {
    if (!msg.channel.name.startsWith('nsfw')) {
      return msg.channel.send('You must be on a channel that starts with the word **`nsfw`**')
    }

    let msgSplit = msg.content.split(' ');
    let msgSearch = '';
    let searchOrig = '';
    for (let i = 1; i < msgSplit.length; i++) {
      if (i === 1) {
        searchOrig = msgSplit[i];
      } else {
        searchOrig = searchOrig + ' ' + msgSplit[i];
      }
    }

    // Filter query
    for (let filter of konachanFilter) {
      if (searchOrig.indexOf(filter) > -1) {
        return msg.channel.send('There is a conflict with Discord ToS.');
      }
    }

    msgSearch = 'order:score -rating:explicit ' + searchOrig;
    request.get('https://konachan.com/post.json', {
      qs: {
        limit: 200,
        tags: msgSearch
      }
    }, (error, response, body) => {
      if (error) {
        return msg.channel.send('There is an error with the body of this file.');
      }
      if (!error && response.statusCode === 200) {
        try {
          body = JSON.parse(body);
        } catch (e) {
          return msg.channel.send('There is an error with the body of this image.');
        }
        if (typeof body !== 'undefined') {
          // Filter response for bad items
          body = body.filter(item => {
            if (typeof item === 'undefined' || typeof item.tags !== 'string') return false;
            for (let filter of konachanFilter) {
              if (item.tags.indexOf(filter) > -1) {
                return false;
              }
            }
            return true;
          });

          if (body.length > 0) {
            let random = Math.floor(Math.random() * body.length);
            if (typeof(body[random]) !== 'undefined' && typeof(body[random].file_url) !== 'undefined') {
              msg.channel.send(`https://${body[random].file_url.substring(2)}`);
            } else {
              msg.channel.send('There is an error with the body');
            }
            return;
          }
        }

        msg.channel.send('Nothing was found.');
      }
    });
  }
}
module.exports = KonachanCommand;
