const Commando = require('discord.js-commando');
const Discord = require('discord.js');

const request = require('request');
const winston = require('winston');
const fs = require('fs');
const path = require('path');

module.exports = class WikiCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "wiki",
      group: "info",
      memberName: "wiki",
      description: "returns the summary of the first matching search result from Wikipedia."
    })
  }

  async run(msg, args, message) {
    var args = msg.content.split(/[ ]+/);
    var query = args;
    if (!query) {
      msg.channel.send("__usage__: **y.wiki [Search Terms]**");
      return;
    }
    var Wiki = require('wikijs');
    new Wiki().search(query, 1).then(function(data) {
      new Wiki().page(data.results[0]).then(function(page) {
        page.summary().then(function(summary) {
          var sumText = summary.toString().split('\n');
          var continuation = function() {
            var paragraph = sumText.shift();
            if (paragraph) {
              msg.channel.send(paragraph);
            }
          };
          continuation();
        });
      });
    }, function(err) {
      msg.channel.send(err);
    });
  }
}
