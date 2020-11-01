
const Discord = require("discord.js");
const client = new Discord.Client();
const alive = require("./alive.js")
const { GiveawaysManager } = require("discord-giveaways");
const db = require("quick.db");
if(!db.get("giveaways")) db.set("giveaways", []);
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    async getAllGiveaways(){
        return db.get("giveaways");
    }
    async saveGiveaway(messageID, giveawayData){
        db.push("giveaways", giveawayData);
        return true;
    }

    async editGiveaway(messageID, giveawayData){
        const giveaways = db.get("giveaways");
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        newGiveawaysArray.push(giveawayData);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }

    async deleteGiveaway(messageID){
        const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }
};
const manager = new GiveawayManagerWithOwnDatabase(client, {
    storage: false,
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
client.giveawaysManager = manager;
const config = require("./config.json"),
fs = require("fs"),
util = require("util"),
readdir = util.promisify(fs.readdir),
mongoose = require("mongoose");
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.GG_TOKEN, client);
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

client.logger = require("./modules/Logger.js");
client.errors = require("./modules/Embeds.js");
client.tools = require("./modules/Tools.js");
client.data = require("./modules/MongoDB.js");

client.events = new Discord.Collection();
client.commands = new Discord.Collection();
client.categories = [];
async function init(){

const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.logger.event(`Loading Event - ${eventName}`);
    client.on(eventName, event.bind(null, client));
}

let folders = await readdir("./commands/");
folders.forEach(direct =>{
  const commandFiles = fs.readdirSync('./commands/' + direct + "/").filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
      const command = require(`./commands/${direct}/${file}`);
      client.commands.set(command.name, command);
  }
  })
  
  mongoose.connect(process.env.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      client.logger.log("Connected to the Mongodb database.", "log");
  }).catch((err) => {
      client.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
  });


}

init();
client.login(process.env.TOKEN);
