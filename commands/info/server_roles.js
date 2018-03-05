const commando = require('discord.js-commando');
const dateFormat = require('dateformat');
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
const Discord = require('discord.js');

class ServerRolesCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'serveroles',
      group: 'info',
      memberName: 'serveroles',
      description: 'Shows every role in the server'
    });
  }

  async run(msg, args) {
    const millis = new Date().getTime() - msg.guild.createdAt.getTime();
    const days = millis / 1000 / 60 / 60 / 24;
    const verificationLevels = ['None', 'Low', 'Medium', 'Insane'];
    let server = msg.guild;
    const embed = new Discord.RichEmbed()
      .addField(`${server.name}`, "**Server Roles**")
      .setTimestamp()
      .setColor('RANDOM')
      .addField('Roles:', msg.guild.roles.map(r => r.name).join(', '), true)
      .setFooter(`Guild ID: ${server.id}`)
    msg.delete();
    msg.channel.send({
      embed
    })
  };
}

module.exports = ServerRolesCommand;
