const Discord = require("discord.js");

module.exports = {
      //Command Information
      name: "createvoicechannel",
      description: "Create Custom Voice Channel",
      usage: "`n!createvoicechannel Name`",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data){
const name = message.content.replace(data.guild.prefix + 'createvoicechannel','')
    message.guild.channels
			.create(name, {
				type: 'voice'
			})
			.then(channel => {
		});
}}