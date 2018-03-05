const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const qs = require("querystring");
const giphy_config = {
  "api_key": "e1158716028e4187b90f64da7a3850a1",
  "rating": "r",
  "url": "http://api.giphy.com/v1/gifs/random",
  "permission": ["NORMAL"]
};
const request = require("request");

function getGif(tags, func) {
  let params = {
    "api_key": giphy_config.api_key,
    "rating": giphy_config.rating,
    "format": "json",
    "limit": 1
  };
  let query = qs.stringify(params);
  if (tags) {
    query += "&tag=" + tags.join('+');
  }
  request(giphy_config.url + "?" + query, function(error, response, body) {
    if (error || response.statusCode !== 200) {
      console.error("giphy: Got error: " + body);
      console.log(error);
    } else {
      try {
        let responseObj = JSON.parse(body);
        func(responseObj.data.id);
      } catch (err) {
        func(undefined);
      }
    }
  }.bind(this));
}

module.exports = class GiphyCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "gif",
      group: "info",
      memberName: "gif",
      description: "returns a random gif from Giphy.com matching the tags passed."
    })
  }

  async run(msg, args) {
    let tags = args.split(" ");
    getGif(tags, id => {
      if (id) {
        msg.channel.send("http://media.giphy.com/media/" + id + "/giphy.gif [Tags: " + (tags ? tags : "Random GIF") + "]");
      } else {
        msg.channel.send("Invalid tags, try something different. [Tags: " + (tags ? tags : "Random GIF") + "]");
      }
    });
  }
}
