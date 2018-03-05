const commando = require('discord.js-commando');
const Discord = require('discord.js');

class PurgeCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'purge',
      group: 'administration',
      memberName: 'purge',
      description: 'Purges an specific amount of messages; limit 100.'
    });
  }

  async run(msg, args) {
    let message = await msg.channel.send(`***__Purging ${args} messages. Please wait, this might take a while...__***`)
    let modLog = msg.guild.channels.find('name', 'log')
    if (msg.member.hasPermission('MANAGE_MESSAGES')) {
      if (args) {
        if (!isNaN(args)) {
          msg.channel.fetchMessages({
            before: msg.id,
            limit: args
          }).then(messages => {
            msg.channel.bulkDelete(messages);
            msg.channel.send(`:wastebasket: | **__${args} messages successfully deleted!__**`);
            message.delete();
          }).catch(console.log);
          msg.delete();
        } else {
          msg.channel.send("That's not a number, silly.");
          return;
        }
      } else {
        msg.channel.send("I need to know how many messages to delete, buddy.");
        return;
      }
    } else {
      msg.reply("I can't really take that order from you. Sorry. :c");
    }

    const embed = new Discord.RichEmbed()
      .setAuthor(`${msg.author.tag}`, `${msg.author.avatarURL}`)
      .setTimestamp()
      .addField('Action:', '***purge***')
      .addField('Purged By:', `${msg.author}`)
      .addField('Purged Messages:', `**${args}**`)
      .setColor('RANDOM')
      .setFooter(`ServerID: ${msg.guild.id}`)
    return msg.guild.channels.get(modLog.id).send({
      embed
    })
  }
}

module.exports = PurgeCommand;
