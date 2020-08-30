
const Discord = require("discord.js");
const config = require("../config.json");
const embeds = require("../modules/Embeds.js");
const cmdCooldown = {};

module.exports = async (client, message) => {

    let guildData = await client.data.getGuildDB(message.guild.id);
    let userData = await client.data.getUserDB(message.author.id);

    if (message.author.bot) return;
    if (message.content.indexOf(guildData.prefix) !== 0) return;
    const args = message.content.slice(guildData.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    let data = {};

    data.user = userData;
    data.guild = guildData;
    data.config = config;
    if (!cmd) return message.channel.send(`<@${message.author.id}> Please send a spesific command`);
    
    if (cmd.guildOnly) {
        if (message.channel.type === "dm") return embeds.Error();
    }

    if(!cmd.enabled){
      return;
    }

    if(!message.channel.nsfw && cmd.nsfw){
      return embeds.nsfw(message);
    }
    if(cmd.ownerOnly && message.author.id !== config.ownerID){
      return message.channel.send("**You don't have permission to do this**");
    }

    if(message.guild){
      let neededPerms = [];
      if(!message.channel.permissionsFor(message.member).has("SEND_MESSAGES")){
          neededPerms.push("SEND_MESSAGES");
      }

      cmd.botPermissions.forEach((perm) => {
      if(!message.channel.permissionsFor(message.member).has(perm)){
          neededPerms.push(perm);
        }
      });

      if(neededPerms.length > 0){
          return message.channel.send("Looks like you're missing the following permissions:\n" +neededPerms.map((p) => `\`${p}\``).join(", "));
      }

    }
    if(message.guild){
      let neededPerms = [];

      if(!message.channel.permissionsFor(message.member).has("SEND_MESSAGES")){
          neededPerms.push("SEND_MESSAGES");
      }

      if(!message.channel.permissionsFor(message.member).has("EMBED_LINKS")){
          return message.channel.send("I need permission to send EMBED_LINKS")
      }

      cmd.botPermissions.forEach((perm) => {
      if(!message.channel.permissionsFor(message.guild.me).has(perm)){
          neededPerms.push(perm);
          }
      });

      if(neededPerms.length > 0){
          return message.channel.send("Looks like I'm missing the following permissions:\n" +neededPerms.map((p) => `\`${p}\``).join(", "));
      }

      let userCooldown = cmdCooldown[message.author.id];
      if(!userCooldown){
          cmdCooldown[message.author.id] = {};
          userCooldown = cmdCooldown[message.author.id];
      }
      let time = userCooldown[cmd.name] || 3000;
      if(time && (time > Date.now())){
        let timeLeft = Math.ceil((time-Date.now())/1000);
          return embeds.Cooldown(message, timeLeft);
      }
      cmdCooldown[message.author.id][cmd.name] = Date.now() + cmd.cooldown;

    }
    
    try {
        cmd.execute(client, message, args, data);
    }
    catch (err) {
        console.error(err);
    }
};
