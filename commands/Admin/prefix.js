const Discord = require("discord.js");

module.exports = {
      name: "prefix",
      description: "Set the prefix for the guild.",
      usage: "`n!prefix {prefix}`",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {
      if (
			!message.member.hasPermission('ADMINISTRATOR', {
				checkAdmin: true,
				checkOwner: true
			})
		)
			return message.channel.send(
				"**I'm sorry, you don't have the permission to use this. Please ask an Owner!**"
			);
      let prefix = args[0];
      if(!prefix){
        return message.channel.send("Uh-Oh!\n\nThis guilds prefix is: " + data.guild.prefix);
      }

      if(prefix){
        data.guild.prefix = prefix;
        await data.guild.save();
        return message.channel.send("Guild prefix has been changed to " + prefix)
      }


    },
};
