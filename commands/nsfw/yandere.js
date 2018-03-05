const commando = require('discord.js-commando');
const Discord = require('discord.js');
const winston = require('winston');
const request = require('request');
const yandereFilter = [
  'shota', // shota, shotacon
  'child' // child, child_porn
];

class YandereCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'yandere',
      aliases: ['yn'],
      group: 'nsfw',
      memberName: 'yandere',
      examples: ['- tr!<yandere/yn> [loli/shota/child]'],
      description: "Searchs some nsfw files in yande.re 7w7.",
    });
  }
  async run(msg, args) {
    if (!msg.channel.name.startsWith('nsfw')) {
      return msg.channel.send('You must be on a channel that starts with the word **`nsfw`**');
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

    for (let filter of yandereFilter) {
      if (searchOrig.indexOf(filter) > -1) {
        return msg.channel.send('There is a conflict with the Discord ToS.');
      }
    }

    msgSearch = 'order:score rating:explicit ' + searchOrig;
    request.get('https://yande.re/post.json', {
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
        if (typeof body !== 'undefined' && body.length > 0) {
          // Filter response for bad items
          body = body.filter(item => {
            if (typeof item === 'undefined' || typeof item.tags !== 'string') return false;
            for (let filter of yandereFilter) {
              if (item.tags.indexOf(filter) > -1) {
                return false;
              }
            }
            return true;
          });

          if (body.length > 0) {
            let random = Math.floor(Math.random() * body.length);
            if (typeof(body[random]) !== 'undefined' && typeof(body[random].file_url) !== 'undefined') {
              msg.channel.send(body[random].file_url);
            } else {
              msg.channel.send('There is an error with the body.');
            }
            return;
          }
        }

        msg.channel.send('Nothing was found.');
      }
    });
  }
}
module.exports = YandereCommand;
