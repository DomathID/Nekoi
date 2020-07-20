require('dotenv').config();
const {Client, Attachment} = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');
const Discord = require('discord.js');
const alive = require('./alive.js');
const embed = new Discord.MessageEmbed()
var version = '1.0.5';
const prefix = "-";
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);
bot.on('ready', () => {
  console.log('Ok Cok Aku Alive');
 bot.user.setActivity('With Domath | -help');
});
const fs = require('fs');
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}
bot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'ping'){
        bot.commands.get('ping').execute(message, args);
    } 
   else if(command === 'link'){
    	bot.commands.get('link').execute(message, args);
    }
   else if(command === 'stats'){
    let statsembed = new Discord.MessageEmbed()
    .setTitle("Nekoi Stats")
    .setColor('#FF6000')
    .setDescription(`Server Count: ${bot.guilds.cache.size}`)
    .setFooter("Nekoi-Bot", "https://i.ibb.co/86R9gYn/78549391-p0.png")
    .setTimestamp()
    .setThumbnail("https://i.ibb.co/86R9gYn/78549391-p0.png")
    message.channel.send(statsembed);
    }
    else if(command === 'hentai'){
    bot.commands.get('hentai').execute(message, args);
    }
   else if(command === 'help'){
   let botembed = new Discord.MessageEmbed()
       .setTitle("Nekoi-Command-Help")
       .setColor('#00CEFF')
       .setDescription(`Prefix for Command **-**, Example: **-help <command>**`)
       .addFields(
         { name: '-help', value: 'Help Command, Untuk Bertanya Command Apa Saja Untuk Menjalankan Bot ini.', inline: true },
         { name: '-cek', value: 'Cek Signal, Untuk Mengecek Berapa Ping Signal.', inline: true },
         { name: '-stats', value: 'Bot Server Count', inline: true },
         { name: '-meme', value: 'Random Meme, Untuk Menampilkan Meme Secara Random.', inline: true },
         { name: '-servinfo', value: 'Server Info, Untuk Menampilkan Informasi Server.', inline: true },
         { name: '-kick', value: 'Kick Member from Server', inline: true },
         { name: '-ban', value : 'Banned Member From Server', inline: true },
         { name: '-about', value: 'About Bot.', inline: true },
        )
       .setFooter("Nekoi-Bot", "https://i.ibb.co/86R9gYn/78549391-p0.png")
       .setTimestamp()
       .setThumbnail("https://i.ibb.co/86R9gYn/78549391-p0.png")
       message.channel.send(botembed);
   }
   else if(command === 'about'){
       message.delete().catch(O_o=>{});
      let days = Math.floor(bot.uptime / 86400000);
      let hours = Math.floor(bot.uptime / 3600000) % 24;
      let minutes = Math.floor(bot.uptime / 60000) % 60;
      let seconds = Math.floor(bot.uptime / 1000) % 60;
      let botembed = new Discord.MessageEmbed()
         .setTitle("Nekoi-Bot-Discord")
          .setDescription(`Nekoi is A Gak Guna Bot.`)
          .setColor('#FFF400')
          .setTimestamp()
          .setFooter("Nekoi-Bot", "https://i.ibb.co/86R9gYn/78549391-p0.png")
          .setThumbnail("https://i.ibb.co/86R9gYn/78549391-p0.png")
          .addField("__**Information**__", "**Author :** Bang Domath ID")
          .addField("__**Source Code**__", "**https://github.com/DomathID**")
          .addField("__**Website**__", "**https://domathid.github.io/Nekoi69**")
          .addField("__**Donate**__", "**https://saweria.co/domathjav69**" );
         message.channel.send(botembed);
       }
       else if(command  === 'uptime'){
      let days = Math.floor(bot.uptime / 86400000);
      let hours = Math.floor(bot.uptime / 3600000) % 24;
      let minutes = Math.floor(bot.uptime / 60000) % 60;
      let seconds = Math.floor(bot.uptime / 1000) % 60;
      let botembed = new Discord.MessageEmbed()
      .setColor("#00FFB2")
      .setThumbnail("https://i.ibb.co/86R9gYn/78549391-p0.png")
      .addFields()
      .setDescription(`**__Waktu Aktif:__** ${days}d ${hours}h ${minutes}m ${seconds}s`);
      message.channel.send(botembed);
     }
     else if(command === 'cek'){
      var ping = Date.now() - message.createdTimestamp + " ms";
      let botembed = new Discord.MessageEmbed()
    .setColor('#00FF5D')
    .setDescription(`**__Your ping is:__** ${Date.now() - message.createdTimestamp}ms`)
    .setFooter("Nekoi-Bot", "https://i.ibb.co/86R9gYn/78549391-p0.png")
    .setThumbnail("https://i.ibb.co/86R9gYn/78549391-p0.png")
    .setTimestamp()
   message.channel.send(botembed);
    }
else if(command === 'servinfo') {
    const { guild } = message
    const { name, region, memberCount, owner, afkTimeout } = guild
    const icon = guild.iconURL()
    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for "${name}"`)
      .setThumbnail(icon)
      .setColor('#FFF400')
      .addFields(
        { name: 'Server:', value: name, },
        { name: 'Region:', value: region, },
        { name: 'Members:', value: memberCount, },
        { name: 'Owner:', value: owner.user.tag, },
        { name: 'AFK Timeout:', value: afkTimeout / 60, }
      )
      .setFooter("Nekoi-Bot", "https://i.ibb.co/86R9gYn/78549391-p0.png")
      .setTimestamp()
message.channel.send(embed);
 }
});
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome'); 
  if (!channel) return;
  channel.send(`**Selamat Datang ${member}!**`);
});
bot.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");
    switch (args[0]) {
        case 'meme':
        meme(message);
        break;
    }
});
function meme(message){
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "meme lucu banget",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
        $ = cheerio.load(responseBody); 
        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        if (!urls.length) {
            return;
        }
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
}
bot.on("message", function(message) {
const parts = message.content.split(" ");
if (parts[0] === "-image") {
image(message, parts);
}
});
function image(message, parts) {
const search = parts.slice(1).join(" ");
const options = {
url: "http://results.dogpile.com/serp?qc=images&q=" + search,
method: "GET",
headers: {
"Accept": "text/html",
"User-Agent": "Chrome"
}
};
request(options, function(error, response, responseBody) {
if (error) {
return;
}
$ = cheerio.load(responseBody);
const links = $(".image a.link");
const urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
if (!urls.length) {
return;
}
message.channel.send( urls[0] );
});
}
