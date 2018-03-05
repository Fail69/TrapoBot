const commando = require('discord.js-commando');
const dateFormat = require('dateformat');
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy');
const Discord = require('discord.js');

class FuckCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'fuck',
      group: 'nsfw',
      memberName: 'fuck',
      description: 'Does this need a description?'
    });
  }

  async run(msg, args) {
    var args = msg.content.split(/[ ]+/);
    let user = msg.mentions.users.first();
    if (!msg.channel.name.startsWith('nsfw')) return msg.reply('You must be on a channel that starts with the word **`nsfw`**');
    if (args[1] = user) {
      var gifs = ['https://cdn.discordapp.com/attachments/290698026006085642/333458003837714441/tumblr_n84gdq5Gwb1s0sk8ho1_500.gif',
        'https://cdn.discordapp.com/attachments/290698026006085642/333458147194961920/tumblr_mndsfgiRVJ1s0sk8ho1_500.gif',
        'https://cdn.discordapp.com/attachments/290698026006085642/333458389944500236/3508-artwork-by-jyubei.gif',
        'https://cdn.discordapp.com/attachments/290698026006085642/333458584593760256/5289e37d63f6f5a858848a1a246b1c45.gif',
        'https://cdn.discordapp.com/attachments/290698026006085642/333458685055467520/tumblr_mkaxrxv9gq1s5fe8vo1_500.gif',
        'https://cdn.discordapp.com/attachments/290698026006085642/333458537487269888/tumblr_mj8bchDkAt1s2c8uno1_500.gif',
        'https://cdn.discordapp.com/attachments/300445739299897345/333458055591362563/fuck.gif',
        'http://68.media.tumblr.com/c5cb2defebe32381b303c6f0dce0e29c/tumblr_n8dtt4GFIY1s0sk8ho1_540.gif',
        'https://cdn.discordapp.com/attachments/294680821271363586/334074762395385856/b45c817d-0a24-4c88-8d4e-dcf221de6bd7.gif',
        'https://cdn.discordapp.com/attachments/294680821271363586/334074768309616640/16965642.gif',
        'https://cdn.discordapp.com/attachments/294680821271363586/334074778245660674/tumblr_nt8y68Sg3u1tp20ijo1_500.gif',
        'https://cdn.discordapp.com/attachments/294680821271363586/334074776467537931/tumblr_nf0573YJcF1u3sya5o1_400.gif',
        'https://cdn.discordapp.com/attachments/294680821271363586/334074773283930114/giphy.gif',
        'https://cdn.discordapp.com/attachments/290698026006085642/333727189583527936/blonde_anime_chick_gets_banged_gif_animated_2_1133845808.gif',
        'https://cdn.discordapp.com/attachments/290698026006085642/333459011641016321/2092483099879bab6d151207d4897d30.gif',
        'https://cdn.discordapp.com/attachments/290698026006085642/333458972843704330/ichinose_haru_akuma_no_riddle_drawn_by_solo_player__1421485a0cd880a93ed32c10c257af09.gif'
      ]
      var result = Math.floor((Math.random() * gifs.length) + 0);
      const embed = new Discord.RichEmbed()
        .addField('( ͡° ͜ʖ ͡°) (sexy song playing in the background)', `**${msg.author.username}** fucked **${user.username}**`, true)
        .setTimestamp()
        .setColor('RANDOM')
        .setImage(gifs[result])
      msg.channel.send({
        embed
      })
    } else {
      msg.reply("You need to specify a user (metion him/her)");
    }
  }
}

module.exports = FuckCommand;
