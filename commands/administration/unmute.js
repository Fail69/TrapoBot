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

class UnmuteCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'unmute',
      group: 'administration',
      memberName: 'unmute',
      description: 'TrapoBot unmutes a member'
    });
  }

  async run(msg, args, member) {
    let muteRole = msg.guild.roles.find("name", "Muted");
    var args = msg.content.split(/[ ]+/);
    let modLog = msg.guild.channels.find('name', 'log')
    let user = msg.mentions.users.first();
    if (!hasRole(msg.member, 'Bot Admin')) return msg.reply('You do not have the role "Bot Admin"');
    if (args[1] = user) {
      msg.guild.member(user).removeRole(muteRole);
    }
    msg.channel.send({
      embed: {
        color: 5627182,
        title: `:ballot_box_with_check: | ${user.username} unmuted!`
      }
    })
    const embed = new Discord.RichEmbed()
      .setAuthor(`${msg.author.tag}`, `${msg.author.avatarURL}`)
      .setTimestamp()
      .addField('Action:', '***unmute***')
      .addField('Member:', `${user.username}`)
      .addField('Member ID:', `${user.id}`)
      .setColor('RANDOM')
      .setFooter(`Unmuted by: ${msg.author.username}`)
    return msg.guild.channels.get(modLog.id).send({
      embed
    })
  }
}

module.exports = UnmuteCommand;
