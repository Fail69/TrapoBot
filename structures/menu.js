const utils = require('./utilities');
const winston = require('winston');

function sendMenuMessage(msg, content) {
  return msg.channel.send(content);
}

class Menu {
  constructor(title, description, choices, t, msg) {
    this.t = t;
    this.msg = msg;
    this.choices = choices;
    let content = utils.renderList(utils.prefixIndex(choices), 'js', true);
    this.menuText = this.buildMenu(title, description, content, t);
    this.menuMsg = null;
    this.sendWrongUsage = false;
    return this.setUpListener(msg);
  }

  setUpListener(msg) {
    return new Promise((res, rej) => {
      sendMenuMessage(msg, this.menuText).then(menuMsg => {
        this.menuMsg = menuMsg;
        let collector = msg.CON.addCollector(msg.channel.id, {
          filter: (collectorMsg) => {
            return collectorMsg.author.id === msg.author.id;
          }
        });
        let stopTimeout = setTimeout(() => {
          collector.end();
          try {
            this.menuMsg.delete();
          } catch (e) {
            winston.error(e);
          }
          res(-1);
        }, 1000 * 60 * 5); //5 mins
        collector.on('message', (collectorMsg) => {
          if (collectorMsg.content.startsWith(msg.prefix) || collectorMsg.content === 'c') {
            collector.end();
            try {
              this.menuMsg.delete();
            } catch (e) {
              winston.error(e);
            }
            clearTimeout(stopTimeout);
            res(-1);
            return;
          }
          let parseMsg;
          try {
            parseMsg = parseInt(collectorMsg.content);
          } catch (e) {
            console.error(e);
            if (!this.sendWrongUsage) {
              collectorMsg.channel.send('Invalid response.')
              this.sendWrongUsage = true;
              setTimeout(() => {
                this.sendWrongUsage = false;
              }, 500)
            }
          }
          if (parseMsg - 1 < this.choices.length) {
            collector.end();
            try {
              this.menuMsg.delete();
              collectorMsg.delete();
            } catch (e) {

            }
            clearTimeout(stopTimeout);
            res(parseMsg - 1);
          }
        });
      });
    });
  }

  buildMenu(title, description, content, t, lang) {
    return {
      content: `${title}`,
      embed: {
        title: description,
        footer: {
          text: `menu.disclaimer`
        },
        description: content
      }
    };
  }
}
module.exports = Menu;
