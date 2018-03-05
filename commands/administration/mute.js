const commando = require('discord.js-commando');
const Discord = require('discord.js');

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

class MuteCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      group: 'administration',
      memberName: 'mute',
      description: 'TrapoBot mutes a member'
    });
  }

  async run(msg, args, member) {
    let muteRole = msg.guild.roles.find("name", "Muted");
    var args = msg.content.split(/[ ]+/);
    let modLog = msg.guild.channels.find('name', 'log')
    let user = msg.mentions.users.first();
    let reason = args.slice(1, args.length).join(' ')

    if (!modLog) {
      msg.guild.createChannel('log')
    }

    if (reason.length < 1) {
      reason = 'None'
    }
    if (!muteRole) {
      msg.guild.createRole({
        name: 'Muted',
        color: 'GREY',
      })
      return msg.reply('Seems like you do not have the role "Muted" in your server, so i have just created it for you');
    }
    if (!msg.guild.roles.find("name", "Bot Admin")) {
      msg.guild.createRole({
        name: 'Bot Admin',
        color: 'BLUE',
      })
      return msg.reply('Seems like you do not have the role "Bot Admin" in your server, so i have just created it');
    }
    if (!hasRole(msg.member, "Bot Admin")) return msg.reply('You do not have the role "Bot Admin"');
    if (args[1] = user) {
      msg.guild.member(user).addRole(muteRole);

      setTimeout(function() {
        msg.guild.member(user).removeRole(muteRole);
        if (!msg.guild.member(user).hasRole(muteRole)) return;
      }, 960000);
    } else if (args[0]) return msg.reply("Please, mention a user first");
    msg.channel.send({
      embed: {
        color: 5627182,
        title: `:no_entry_sign: | Successfully muted ${user.username}!`
      }
    })
    const embed = new Discord.RichEmbed()
      .setAuthor(`${msg.author.tag}`, `${msg.author.avatarURL}`)
      .setTimestamp()
      .addField('Action:', '***mute***')
      .addField('Member:', `${user.username}`)
      .addField('Member ID:', `${user.id}`)
      .addField('Reason:', `${reason}`)
      .addField('Minute(s) Muted:', '15 minute(s)/default')
      .setColor('RANDOM')
      .setFooter(`Muted by: ${msg.author.username}`)
    return msg.guild.channels.get(modLog.id).send({
      embed
    })
  }
}

module.exports = MuteCommand;
