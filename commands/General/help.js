const Discord = require("discord.js");
const tools = require("../../modules/Tools.js");

module.exports = {
      name: "help",
      description: "Get a list of the commands the bot offers",
      usage: "help [Command]",
      enabled: true,
      guildOnly: true,
      aliases: ["Help"],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 0,
      ownerOnly: false,

    async execute(client, message, args, data) {

            let infoEmbed = await tools.MapCats(client)
            return message.channel.send(infoEmbed);

    },
};
