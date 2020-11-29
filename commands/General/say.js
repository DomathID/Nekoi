const Discord = require("discord.js")
module.exports = {
    name: "say",
    description: "Say Something plz",
    usage: "{prefix}say say something",
    enabled: true,
    guildOnly: true,
    aliases: ["bicara"],
    memberPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,
async execute(client, message, args, data) {
if (!args[0])
      return message.channel.send(
        `Please Give Something To Saay ${message.author.username}`
      );
const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
}
