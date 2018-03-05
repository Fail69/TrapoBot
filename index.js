const Discord = require('discord.js');
const trap = new Discord.Client();

trap.on('ready', () => {
  trap.user.setActivity('bot en heroku', {
    type: 'WATCHING'
  });
  console.log('Listo!');
});


let prefix = process.env.PREFIX;

trap.on('message', message => {
  if (!message.content.startsWith(prefix) || !message.guild) return;
  if (message.author.bot) return;

  const cont = message.content.split(' ').slice(1);
  const args = cont.join(' ');

  if (message.content.startsWith(prefix + 'ping')) {
    message.channel.send('pong');

  } else if (message.content.startsWith(prefix + 'say')) {
    if (!args) return;
    message.channel.send(args);
  }
});

trap.login(process.env.TOKEN);
