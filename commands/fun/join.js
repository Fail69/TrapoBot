const commando = require('discord.js-commando');

class JoinCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'join',
      group: 'fun',
      memberName: 'join',
      description: 'Makes TrapoBot join your voice channel',
    });
  }

  async run(msg, args) {
    if (!msg.guild) return;
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join().then(connection => {
          const receiver = connection.createReceiver();
          msg.channel.send(`${msg.author.username} I have successfully connected to your channel!`);
        })
        .catch(console.log);
    } else {
      msg.channel.send(`${msg.author.username}, You need to join a voice channel first!`);
    }
  }
}

module.exports = JoinCommand;
