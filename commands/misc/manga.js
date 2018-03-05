const commando = require('discord.js-commando');
const Discord = require('discord.js');
const axios = require('axios');
const winston = require('winston');
const Menu = require('../../structures/menu');

class MangaCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'manga',
      group: 'misc',
      memberName: 'manga',
      examples: ['- tr!manga [Manga_Name]'],
      description: "Shows you some details of an specific manga. Not usable ATM.",
      guildOnly: true
    });
  }

  async run(msg, args) {
    let cmd = 'manga';
    let prefix = 'y.';

    let searchQuery = msg.content.substring(7);
    if (!searchQuery) return await msg.channel.send('Empty search.');
    try {
      let authRequest = await axios.post(`https://anilist.co/api/auth/access_token`, {
        grant_type: 'client_credentials',
        client_id: 'fail69-o3ia3',
        client_secret: '72kPUCqMHZfwQiIVOWXuS1KXSW'
      });
      let accessToken = authRequest.data.access_token;
      let mangaRequest = await axios({
        url: `https://anilist.co/api/manga/search/${encodeURI(searchQuery)}`,
        params: {
          access_token: accessToken
        }
      });
      if (mangaRequest.data.error) {
        if (mangaRequest.data.error.messages[0] === 'No Results.') {
          return msg.channel.send('There was not even one result, sad.');
        }
      }
      if (mangaRequest.data.length === 1) {
        let characters = await this.loadCharacters(mangaRequest.data[0].id, accessToken);
        let embed = this.buildResponse(msg, mangaRequest.data[0], characters);
        return msg.channel.send(embed);
      } else if (mangaRequest.data.length > 1) {
        let pick = await new Menu('search.anime', 'menu.guide', mangaRequest.data.map(m => {
          return (m.title_english !== m.title_romaji ? `${m.title_romaji} | ${m.title_english}` : m.title_romaji)
        }).slice(0, 10), msg);
        if (pick === -1) {
          return msg.channel.send('The command was cancelled.');
        }
        if (pick > -1) {
          let manga = mangaRequest.data[pick];
          let characters = await this.loadCharacters(manga.id, accessToken);
          let embed = this.buildResponse(msg, manga, characters);
          return msg.channel.send(embed);
        }
      } else {
        return msg.channel.send('There was no results.');
      }
    } catch (e) {
      console.error(e);
      await msg.channel.send('There was an error.');
    }
  }

  async loadCharacters(id, token) {
    let characterRequest = await axios({
      url: `https://anilist.co/api/manga/${id}/characters`,
      params: {
        access_token: token
      }
    });
    return characterRequest.data.characters;
  }

  buildResponse(msg, data, characters) {
    let description = data.description.replace(/<br>/g, '');
    description = description.replace(/\n|\\n/g, '');
    description = description.replace(/&mdash;/g, '');
    description = description.replace(/&#039;/g, '');
    description = description.split('.').join('.\n\n');
    if (description.length > 1024) {
      description = description.substring(0, 1020);
      description += '...';
    }
    let mainCharacters = characters.filter((c) => {
      return c.role === 'Main';
    });
    let characterString = mainCharacters.map(c => {
      return `[${c.name_first}${c.name_last ? ` ${c.name_last}` : ''}](https://anilist.co/character/${c.id})`
    });
    characterString = characterString.join(', ');
    let titleString = data.title_english !== data.title_romaji ? `${data.title_romaji} | ${data.title_english}` : data.title_romaji;
    return {
      embed: {
        "title": titleString,
        "description": description,
        "url": `https://anilist.co/manga/${data.id}/`,
        "color": 0x00ADFF,
        "footer": {
          "text": `⭐${anime.score}: ${data.average_score}/100`
        },
        "image": {
          "url": data.image_url_lge
        },
        "fields": [{
            "name": `:movie_camera: ${anime.genres}`,
            "value": `**${data.genres.join(', ')}**`
          },
          {
            "name": `:1234: ${manga.chapters}`,
            "value": `**${data.total_chapters > 0 ? data.total_chapters : `${generic.unknown}` }**`
          },
          {
            "name": `:man_dancing: ${anime.characters}`,
            "value": `**${characterString}**`
          }
        ]
      }
    };
  }
}

module.exports = MangaCommand;
