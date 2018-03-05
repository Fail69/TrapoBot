const commando = require('discord.js-commando');

function pluck(array) {
  return array.map(function(item) {
    return item['name']
  })
}

function hasRole(mem, role) {
  if (pluck(mem.roles).includes(role)) {
    return true
  } else {
    return false
  }
}

class BanCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      group: 'administration',
      memberName: 'ban',
      description: 'Used to ban a user from a guild.'
    });
  }

  async run(msg, args, member) {
    var args = msg.content.split(/[ ]+/);
    let user = msg.mentions.users.first();
    let guildMember = msg.guild.member(msg.mentions.users.first())
    let modLog = msg.guild.channels.find('name', 'log')
    let reason = args.join(' ').substring(user + 1)

    if (reason.length === 1) {
      reason = 'None'
    }

    if (!modLog) {
      msg.guild.createChannel('log')
    }
    if (!msg.guild.roles.find("name", "Bot Admin")) {
      msg.guild.createRole({
        name: 'Bot Admin',
        color: 'BLUE',
      })
      msg.reply('Seems like you do not have the role "Bot Admin" in your server, so i have just created it');
    } else if (!hasRole(msg.member, 'Bot Admin')) return msg.reply('You do not have the role "Bot Admin"');
    if (args[1] = user) {
      guildMember.ban();
    } else {
      msg.reply("Please, mention a user first");
    }
    if (user.id === msg.guild.ownerID) {
      msg.reply('Trying to ban the owner, huh?... Good try, but that is not possible.');
      return;
    }
    msg.channel.send({
      embed: {
        color: 5627182,
        title: `:white_check_mark:  | Successfully banned ${user.username}!`
      }
    })
    const embed = new Discord.RichEmbed()
      .setAuthor(`${msg.author.tag}`, `${msg.author.avatarURL}`)
      .setTimestamp()
      .addField('Action:', '***ban***')
      .addField('Member:', `${user.username}`)
      .addField('Member ID:', `${user.id}`)
      .addField('Reason:', `${reason}`)
      .setColor('RANDOM')
      .setFooter(`Banned by: ${msg.author.username}`)
    return msg.guild.channels.get(modLog.id).send({
      embed
    })
  }
}

module.exports = BanCommand;
