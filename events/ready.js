const { prefix } = require("../config.json")
module.exports = async (client, args) => {
  let users = client.users.cache.size;
  let guild = client.guilds.cache.size;
  let channel = client.channels.cache.size;
const activity_list = [
		[`${channel} Channels`, "LISTENING",`dnd`],
		[`${guild} Guilds`, "WATCHING", `dnd`],
		[`With ${users} User`, "PLAYING", `dnd`]
	];
    try {
        setInterval(() => {
		const index = Math.floor(Math.random() * activity_list.length);
		client.user.setPresence({
            activity:  {
                            name: activity_list[index][0], 
                             type: activity_list[index][1],
         },
          status: activity_list[index][2],
    })
	}, 7000);
    } catch (e) {
        console.log(e);
    }
};
