const Discord = require("discord.js");

module.exports = {
      //Command Information
      name: "createtextchannel",
      description: "Create Custom Text Channel",
      usage: "`n!createtextchannel Name`",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data){
const name = message.content.replace(data.guild.prefix + 'createtextchannel','')
    message.guild.channels
			.create(name, {
				type: 'text'
			})
			.then(channel => {
		});
}}