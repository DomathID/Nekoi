const Discord = require("discord.js");
const resolve = require("../../modules/Resolve.js");
module.exports = {
      name: "ban",
      description: "Ban a member from your server",
      usage: "ban @user",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: ["BAN_MEMBERS"],
      botPermissions: ["BAN_MEMBERS"],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {
      let user = await resolve.getMember(args[0], message.guild);
      if(!user){
          return message.channel.send("Sorry can't find this member currently, maybe they moved houses.");
      }
      if(user.id === message.author.id){
          return message.channel.send("You really tryna ban yourself??");
      }

      let member = await message.guild.members.fetch(user.id).catch(() => {});
      if(member && !member.bannable){
          return message.channel.send("You don't have permissions to ban this member");
      }

     message.guild.members.ban(user)
     return message.channel.send(`${user.user.username} has been banned from the server!`)

    },
};

