
const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "uptime",
    description: "Uptime Bot Stats",
    usage: "botstats",
    enabled: true,
    guildOnly: true,
    aliases: ["up"],
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: true,

    async execute(client, message, args, data) {
    let uptime = convertMS(message.client.uptime);
    let announcementEmbed = new Discord.MessageEmbed()
     .setThumbnail(client.user.displayAvatarURL())
      .setFooter(config.footer)
      .setColor(config.color);
      if(uptime.day > 0){
        announcementEmbed.addFields({name: "Uptime", value: `${uptime.day} days ${uptime.hour} hours ${uptime.minute} minutes ${uptime.seconds} seconds`})
      }else if(uptime.hour > 0){
        announcementEmbed.addFields({ name: "Uptime", value: `${uptime.hour} hours ${uptime.minute} minutes ${uptime.seconds} seconds`})
      }else if(uptime.minute > 0){
        announcementEmbed.addFields({ name: "Uptime", value: `${uptime.minute} minutes ${uptime.seconds} seconds`})
      }else if(uptime.seconds > 0){
        announcementEmbed.addFields({ name: "Uptime", value: `${uptime.seconds} seconds`})
      }else{
        announcementEmbed.addFields({ name: "Uptime", value: `IDK :sob:`})
      }
      return message.channel.send(announcementEmbed)
      function convertMS( milliseconds ) {
          var day, hour, minute, seconds;
          seconds = Math.floor(milliseconds / 1000);
          minute = Math.floor(seconds / 60);
          seconds = seconds % 60;
          hour = Math.floor(minute / 60);
          minute = minute % 60;
          day = Math.floor(hour / 24);
          hour = hour % 24;
          return {
              day: day,
              hour: hour,
              minute: minute,
              seconds: seconds
           }
       }
}

