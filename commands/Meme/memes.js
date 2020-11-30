const Discord = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
      name: "meme",
      description: "memes.",
      usage: "meme",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

      randomPuppy("memes")
          .then(url => {
              let embed = new Discord.MessageEmbed()
              .setImage(url)
              .setTitle("Random Meme Generator")
              .setURL("https://www.reddit.com/r/memes")
              .setColor(data.config.color)
              .setTimestamp()
              .setFooter(data.config.footer)
              return message.channel.send(embed)
          })

    },
};

