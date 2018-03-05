const commando = require('discord.js-commando');
const dateFormat = require('dateformat');
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
const Discord = require('discord.js');

class ServerInfoCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      group: 'info',
      memberName: 'serverinfo',
      description: 'Shows the server info!'
    });
  }

  async run(msg, args) {
    const millis = new Date().getTime() - msg.guild.createdAt.getTime();
    const days = millis / 1000 / 60 / 60 / 24;
    const verificationLevels = ['None', 'Low', 'Medium', 'Insane'];
    let server = msg.guild;
    const embed = new Discord.RichEmbed()
      .addField(`${server.name}`, "**Server info**")
      .setTimestamp()
      .setColor('RANDOM')
      .addField('Created on:', `${dateFormat(server.createdAt)}`, true)
      .addField('Days since creation:', `${days.toFixed(0)}`, true)
      .addField('Online/Total Members:', `${msg.guild.members.filter(m => m.presence.status !== 'offline').size} / ${msg.guild.memberCount}`, true)
      .addField('Channels:', `${server.channels.size}`, true)
      .addField('DefaultChannel:', `${server.defaultChannel}`, true)
      .addField('AFK Channel ID:', `${server.afkChannelID}`, true)
      .addField('AFK Channel Time Out:', `${server.afkTimeout}[seconds]`, true)
      .addField('Region:', `${server.region}`, true)
      .addField('Owner:', `${server.owner.user.username}`, true)
      .addField('Owner ID:', `${server.ownerID}`, true)
      .addField('Roles', `[${server.roles.size}]`, true)
      .addField('Verification Level:', `${verificationLevels[server.verificationLevel]}`)
      .setFooter(`Guild ID: ${server.id}`);
    msg.delete();
    msg.channel.send({
      embed
    });
  };
}

module.exports = ServerInfoCommand;
