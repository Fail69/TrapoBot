const Discord = require('discord.js')
const commando = require('discord.js-commando')
const winston = require('winston');
const Selector = require('../../structures/selector');
const config = require('../../config.json')
const track_error = !config.no_error_tracking;

class PlayCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'Plays music!',
    });
  }

  async run(msg) {
    let msgSplit = msg.content.split(' ').splice(1);
    if (msgSplit.length === 0) return msg.channel.send('Empty search...');
    let uwu = this.checkNext(msgSplit);
    let next = uwu.next;
    msgSplit = uwu.msgSplit;
    msg.content = msgSplit.join(' ').trim();
    try {
      let res = await this.v.addToQueue(msg, !next, next);
      if (Object.prototype.toString.call(res) === '[object Array]') {
        return this.searchResult(msg, res, next);
      } else {
        if (next) return msg.channel.send('Playing next', {
          song: res.title,
          user: `${msg.author.tag}`
        });
        msg.channel.send({
          song: res.title,
          user: `${msg.author.tag}`
        });
      }
    } catch (err) {
      console.error(err);
      if (err instanceof TranslatableError) {
        msg.channel.send('Error? Again?');
      } else {
        if (track_error) {
          this.r.captureException(err, {
            extra: {
              userId: msg.author.id,
              guildId: msg.channel.guild.id,
              msg: msg.content,
              msgId: msg.id
            }
          });
        }
        msg.channel.send('There was an error :c...');
      }
    }
  }
  checkNext(msgSplit) {
    let next = false;
    let index = msgSplit.indexOf('-next');
    if (index > -1) {
      msgSplit.splice(index, 1);
      next = true;
    }
    return {
      next,
      msgSplit
    };
  }

  searchResult(msg, results, next) {
    let selector = new Selector(msg, results, this.t, (err, number) => {
      if (err) {
        return msg.channel.send(err);
      }
      msg.content = `y.play https://youtube.com/watch?v=${results[number - 1].id}`;
      if (next) {
        msg.content += ' -next';
      }
      this.run(msg);
    });
  }
}
module.exports = PlayCommand;
