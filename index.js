const Discord = require('discord.js');
const commando = require('discord.js-commando')
const trap = new commando.Client({
  owner: '131403526411780096',
  commandPrefix: 'tr!'
})
const dateFormat = require('dateformat');
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy');
const token = 'NDAxNzY0NzA3OTU1OTAwNDE3.DT7adg.kzfOfTaCXiyJsf5QXE98tAqOQNc'
const config = require('./config.json')
const fs = require('fs')
const YTDL = require('ytdl-core')
let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'))
const prefix = 'tr!'
const ascii = require('ascii-table');
const newUsers = []
const sqlite = require('sqlite');

trap.registry.registerGroup('info', 'Info')
trap.registry.registerGroup('modules', 'Modules')
trap.registry.registerGroup('resolver', 'Resolver')
trap.registry.registerGroup('worker', 'Worker')
trap.registry.registerGroup('misc', 'Misc')
trap.registry.registerGroup('music', 'Music')
trap.registry.registerGroup('nsfw', 'Nsfw')
trap.registry.registerGroup('administration', 'Administration')
trap.registry.registerGroup("dev's commands", "Dev's Commands")
trap.registry.registerGroup('fun', 'Fun')
trap.registry.registerDefaults()
trap.registry.registerCommandsIn(__dirname + '/commands')

function commandIs(str, msg) {
  return msg.content.toLowerCase().startsWith(config.prefix + str)
}

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
trap.on('ready', function() {
  var ProgressBar = require('progress')

  var list = [
    'nodes', 'points', 'config', 'modules', 'prefix',
    'fuck her right in the pussy', 'what is there to read anymore',
    'still reading?', 'so it seems', 'nearly completed so fucking stop reading', "'kay that's it", 'completed'
  ]

  var bar = new ProgressBar(':percent :eta downloading :current/:total :file', {
    total: list.length
  })

  var id = setInterval(function() {
    bar.tick({
      'file': list[bar.curr]
    })
    if (bar.complete) {
      clearInterval(id)
    }
  }, 1000)
  trap.users.get('131403526411780096')
  trap.user.setStatus('online')
  console.log("-----");
  console.log("TrapoBot just started!");
  console.log('Prefix: "' + config.prefix + '"')
  trap.user.setGame('tr!help <command/all>');
  console.log("Guilds on: " + trap.guilds.size);
  console.log(trap.guilds.map(g => g.name).join("\n"));
  console.log('---------------')
});
//Console Log codes part
trap.on("message", msg => {
  if (!msg.guild) return;
  if (msg.content.startsWith(prefix)) {
    console.log(`\n${msg.author.username} used a command from ${msg.guild.name}`)
  }
})
trap.on("message", msg => {
  if (!msg.guild) return;
  if (msg.author.bot) return;

  if (!points[msg.author.id]) points[msg.author.id] = {
    points: 0,
    level: 0
  };
  let userData = points[msg.author.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    userData.level = curLevel;
    msg.reply('', {
      embed: {
        color: 5497106,
        title: ":sun_with_face: | Level up!",
        description: `${msg.author.username}, You have just leveled up to level **${curLevel}**! good job, goshoujin-sama!`
      }
    })
  }
  fs.writeFile('./points.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });
});
trap.on("message", msg => {
  if (commandIs("traps", msg)) {
    var sayings = ["https://cdn.discordapp.com/attachments/290692704755646474/317709811150225408/520.jpg",
      "https://cdn.discordapp.com/attachments/290692704755646474/317709627577991169/Jorge.png",
      "https://cdn.discordapp.com/attachments/290692704755646474/317709990632882176/17553805_1272709902784418_6800477749161082656_n.jpg",
      "https://cdn.discordapp.com/attachments/290692704755646474/317710253900955649/Felix.Argyle.full.2018176.jpg",
      "https://cdn.discordapp.com/attachments/290692704755646474/317710358204907522/full_body_3_by_matthewrock-d81swlo.jpg",
      "https://cdn.discordapp.com/attachments/290692704755646474/317713240421564417/35f2f5baeebf98f20efd70f49ac884e0fe263add_hq.jpg"
    ];

    var result = Math.floor((Math.random() * sayings.length) + 0); {
      msg.channel.send(sayings[result]);
    }
  }
});
trap.on("guildCreate", guild => {
  console.log(`New guild added "${guild.name}"", owned by ${guild.owner.user.username}`);
});
trap.on('message', msg => {
  if (commandIs('maths', msg)) {
    let args = msg.content.split(" ").slice(1);
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce((p, c) => p + c);
    msg.channel.send('(calculating...)');
    msg.channel.send(total);
  }

});

trap.on('message', msg => {
  if (msg.content === 'Tadaima') {
    msg.channel.send(`Okaerinasaimase, ${msg.author.username}-sama`);
  }
});
trap.on('message', msg => {
  if (msg.content === 'Buenas') {
    msg.channel.send(`Buenos días/tardes/noches, ${msg.author.username}`);
  }
});
trap.on('message', msg => {
  if (msg.content === 'Malas') {
    msg.channel.send(`Malos tardes/días/noches, ${msg.author.username}`);
  }
});
trap.on('message', msg => {
  if (msg.content === 'malas') {
    msg.channel.send(`Malas tardes/días/noches, ${msg.author.username}`);
  }
});

trap.on('message', msg => {
  if (msg.content === 'buenas') {
    msg.channel.send(`Buenos días/tardes/noches, ${msg.author.username}`);
  }
});
trap.on('message', msg => {
  if (msg.content === 'Send nudes') {
    msg.reply('http://i68.tinypic.com/514l1w.png');
  }
})
trap.on('message', msg => {
  if (msg.content === 'send nudes') {
    msg.reply('http://i68.tinypic.com/514l1w.png');
  }
});
trap.on('message', msg => {
  if (commandIs("flip", msg)) {
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
      msg.channel.send("The coin landed on heads");
    }
    if (result == 2) {
      msg.channel.send("The coin landed on tails");
    }
  }
});
trap.on('message', msg => {
  if (msg.content === "Vientos ;v") {
    msg.channel.send('http://i65.tinypic.com/sd22xh.jpg');
  }
});
trap.on('message', msg => {
  if (commandIs("8ball", msg)) {
    var args = msg.content.split(/[ ]+/);
    if (args.length === 1) {
      msg.channel.send('You did not use it properly. Usage: `y.8ball do you like traps?`');
    } else {
      var sayings = ["Yes",
        "No",
        "I don't think so, goshoujin-sama",
        "Very doubtful, goshoujin-sama",
        "I am in doubt of that, goshoujin-sama",
        "I do not even know, i just want your love, goshoujin-sama"
      ];

      var result = Math.floor((Math.random() * sayings.length) + 0); {
        msg.channel.send(`${msg.author.username} ` + sayings[result]);
      }
    }
  }
});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}


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
