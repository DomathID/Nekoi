
const { prefix } = require("../config.json");



const activity_list = [
		["Yahari Ore no Seishun Love Comedy wa Machigatteiru", "STREAMING"],
		["n!help", "STREAMING"],
		["Ore no Kanojo to Osananajimi ga Shuraba Sugiru", "STREAMING"],
		["in Another World", "STREAMING"],
		["Uzaki-chan wa Asobitai!", "STREAMING"],
		["in Servers", "STREAMING"]
	];
module.exports = async (client) => {
    try {
        setInterval(() => {
		const index = Math.floor(Math.random() * activity_list.length);
		client.user.setActivity(activity_list[index][0], {type: activity_list[index][1], url: "https://domathid.github.io/nekoi"});
	}, 6000);
    } catch (e) {
        console.log(e);
    }
};
