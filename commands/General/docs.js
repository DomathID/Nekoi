const fetch = require('node-fetch')
module.exports = {
    name: "docs",
    description: "Get the currently latency of the bot",
    usage: "ping",
    enabled: true,
    guildOnly: true,
    aliases: [],
    memberPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,

   async execute(client, message, args){
     if (!args[0]) return message.channel.send(`Please Give Something To Search`)
       const searchQuery = args.join(" ");
       const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(searchQuery)}`;

       fetch(url)
       .then((res)=> res.json())
       .then((embed)=>{
           if(embed && !embed.error){
               message.channel.send({embed})
           }else { 
               message.reply(`
               I don't know about you but ${searchQuery} isn't a valid doc.
               `)
           };
       })
       .catch((e)=>{
           message.reply('Woops, there\'s been an error. Check console for details.');
       });
    
    },
};

