const Discord = require("discord.js");
module.exports = {
name: "avatar",
   description: "avatar command",
    usage: "avatar",
    enabled: true,
    guildOnly: true,
    aliases: [],
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES","MANAGE_MESSAGES"],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,
    
    async execute (client, message, args, data){
  let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.author;
  }
  
  let avatar = user.displayAvatarURL({size: 4096, dynamic: true});
  const embed = new Discord.MessageEmbed()
  .setTitle(`${user.tag} avatar`)
  .setDescription(`[Avatar URL of ${user.tag} ](${avatar})`)
  .setColor(data.config.color)
  .setFooter(data.config.footer)
  .setTimestamp()
  .setImage(avatar)
  
  return message.channel.send(embed);
}
}
