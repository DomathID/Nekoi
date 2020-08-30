const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Get the currently latency of the bot",
    usage: "ping",
    enabled: true,
    guildOnly: true,
    aliases: [],
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES"],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,

    async execute(client, message, args, data) {
      message.channel.send(`Ping....`).then((m) => {
        let latencyPing =Math.floor( m.createdTimestamp - message.createdTimestamp)
          m.delete()
          message.channel.send(`Your Ping: `+"``"+ `${latencyPing}`+"``"+ "ms");
        });


    },
};
