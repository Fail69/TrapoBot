const commando = require('discord.js-commando');
const Discord = require('discord.js');

class KissCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'kiss',
      group: 'fun',
      memberName: 'kiss',
      examples: ['- tr!kiss [@mention]', '- <@MentionTrapoBot> kiss [@mention]'],
      description: "You can kiss another persons with this command <3.",
      guildOnly: true
    });
  }

  async run(msg, args) {
    var kiss = ['https://s-media-cache-ak0.pinimg.com/originals/37/15/a2/3715a2c5072d44795c4997e8a44798a0.gif',
      'http://24.media.tumblr.com/tumblr_m8yxnswMgE1rc0fd6o1_r5_500.gif',
      'https://68.media.tumblr.com/cb032baaaed21e1e14d5e55625e025dc/tumblr_om0qcpqkZ11tmp0dno1_400.gif',
      'https://media.giphy.com/media/QGc8RgRvMonFm/giphy.gif',
      'https://s-media-cache-ak0.pinimg.com/originals/4f/8c/53/4f8c530342c1f68162cc6a102493f7d2.gif',
      'http://pa1.narvii.com/5836/cc3e4b92a59039e1e7394a2d57aafabb3711c591_hq.gif',
      'https://38.media.tumblr.com/482e05f0cccfba3d6dfbf9ebbab22b96/tumblr_nfi7ozFxhx1qcsnnso1_500.gif',
      'https://68.media.tumblr.com/97b8ee97f83254048d637865722a755f/tumblr_obg6npjjNd1vu70jco1_500.gif',
      'https://s-media-cache-ak0.pinimg.com/originals/b0/3c/ce/b03ccec6a139859c578ab427bb084927.gif',
      'http://data.whicdn.com/images/175365916/original.gif',
      'http://pa1.narvii.com/5735/ced8d3141922fc0e37d9baf5951a6ca48d491719_hq.gif'
    ]
    var result = Math.floor((Math.random() * kiss.length) + 0);
    var args = msg.content.split(/[ ]+/);
    let user = msg.mentions.users.first();
    if (args[1] = user) {
      const embed = new Discord.RichEmbed()
        .setTitle(`:heart: ___${msg.author.username}___ kissed ___${user.username}___ :heart:`)
        .setTimestamp()
        .setImage(kiss[result])
        .setColor('RANDOM')
        .setFooter(`Guild ID: ${msg.guild.id}`)
      msg.channel.send({
        embed
      })
    }
  }
}

module.exports = KissCommand;
