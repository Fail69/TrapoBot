const RRACommand = require('../../structures/rraCommand');

class LewdImage extends RRACommand {
  constructor({
    t
  }) {
    super();
    this.cmd = 'lewd';
    this.cat = 'fun';
    this.needGuild = false;
    this.t = t;
    this.accessLevel = 0;
  }
}
module.exports = LewdImage;
