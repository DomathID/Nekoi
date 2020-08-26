
// Nekoi Bot Discord
// v1.4
require('dotenv').config({ path: 'Nekoi-config/.env' });
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "n!"
const fs = require('fs');
const config = require('./Nekoi-config/config.json');
const alive = require('./Nekoi-alive/alive.js');
const command = require('./Nekoi-config/cmd.js');
const logo = "https://i.ibb.co/86R9gYn/78549391-p0.png"

client.on('ready', () => {
	console.log('Nekoi Was Online !');
	client.user.setActivity('With Domath | n!help');
});
command(client, 'help', message => {
	let footer = config.avatar_list;
	const index = Math.floor(Math.random() * footer.length);
	const embed = new Discord.MessageEmbed()
		.setTitle('Nekoi Bot Help')
		.setDescription(`Prefix for Command **n!**, Example: **n!<command>**.`)
		.setColor('#FFFD00')
		.setFooter('Nekoi Bot', footer[index])
		.setThumbnail(footer[index])
		.setTimestamp()
		.setImage(
'https://media.tenor.com/images/ca70065f2722e40a65deaae7233bb392/tenor.gif'
		)
		.addField(
			'**__General Command__:**',
			'Commands That Can Be Used by Members'
		)
		.addFields(
			{
				name: 'help',
				value: 'Help Command for This Bot',
				inline: true
			},
			{
				name: 'uptime',
				value: 'Uptime This Bot',
				inline: true
			},
			{
				name: 'ping',
				value: 'Cek Your Ping Signal in (ms)',
				inline: true
			},
			{
				name: 'meme',
				value: 'Random Meme Generator',
				inline: true
			}
		)

		.addField(
			'**__Admin Command:__**',
            'Only the Admin Role Can Use This Command, Add Role Bot to Admin for Permission'
		)
		.addFields(
			{
				name: 'createvoicechannel',
				value: 'Create Voice Channel',
				inline: true
			},
			{
				name: 'createtextchannel',
				value: 'Create Text Channel',
				inline: true
			},
			{
				name: 'kick',
				value: 'Kick Mentioned User',
				inline: true
			},
			{
				name: 'ban',
				value: 'Banned Mentioned User',
				inline: true
			},
			{
				name: 'cc',
				value: 'Clear Bulk Message',
				inline: true
			}
		)

		.addField(
			'**__About Me__**',
			'This bot was made by Bang Domath ID, Support: https://saweria.co/donate/domathjav69'
		);
	message.channel.send(embed);
});

command(client, 'createtextchannel', message => {
	if (
		!message.member.hasPermission('ADMINISTRATOR', {
			checkAdmin: true,
			checkOwner: true
		})
	)
		return message.channel.send(
			"**I'm sorry, you don't have the permission to use this. Please ask an Owner!**"
		);
	const name = message.content.replace('n!createtextchannel ', '');

	message.guild.channels
		.create(name, {
			type: 'text'
		})
		.then(channel => {
			const categoryId = '719799253706342421';
			channel.setParent(categoryId);
			channel.setUserLimit(1000000000);
		});

	command(client, 'createvoicechannel', message => {
		if (
			!message.member.hasPermission('ADMINISTRATOR', {
				checkAdmin: true,
				checkOwner: true
			})
		)
			return message.channel.send(
				"**I'm sorry, you don't have the permission to use this. Please ask an Owner!**"
			);
		const name = message.content.replace('n!createvoicechannel', '');

		message.guild.channels
			.create(name, {
				type: 'voice'
			})
			.then(channel => {
				const categoryId = '719799253706342421';
				channel.setParent(categoryId);
				channel.setUserLimit(100000000);
			});
	});
});
command(client, 'serverinfo', message => {
	if (message.channel instanceof Discord.DMChannel)
	return message.channel.send('**This command is not available in DMs**');
	const { guild } = message;
	let footer = config.avatar_list;
	const index = Math.floor(Math.random() * footer.length);
	const { name, region, memberCount, owner, afkTimeout } = guild;
	const icon = guild.iconURL();
	const embed = new Discord.MessageEmbed()
		.setTitle(`Server info for "${name}"`)
		.setThumbnail(icon)
		.setColor('#FFFD00')
		.setFooter('Nekoi Bot', footer[index])
		.addFields(
			{
				name: 'Region',
				value: region
			},
			{
				name: 'Members',
				value: memberCount
			},
			{
				name: 'Owner',
				value: owner.user.tag
			},
			{
				name: 'AFK Timeout',
				value: afkTimeout / 60
			}
		);

	message.channel.send(embed);
});
command(client, 'ban', message => {
	if (message.channel instanceof Discord.DMChannel)
		return message.channel.send('**This command is not available in DMs**');
	const { member, mentions } = message;

	const tag = `<@${member.id}>`;

	if (
		member.hasPermission('ADMINISTRATOR') ||
		member.hasPermission('BAN_MEMBERS')
	) {
		const target = mentions.users.first();
		if (target) {
			const targetMember = message.guild.members.cache.get(target.id);
			targetMember.ban();
			message.channel.send(`${tag} That user has been banned`);
		} else {
			message.channel.send(`${tag} Please specify someone to ban.`);
		}
	} else {
		message.channel.send(
			`${tag} You do not have permission to use this command.`
		);
	}
});

command(client, 'kick', message => {
	if (message.channel instanceof Discord.DMChannel)
		return message.channel.send('**This command is not available in DMs**');
	const { member, mentions } = message;

	const tag = `<@${member.id}>`;

	if (
		member.hasPermission('ADMINISTRATOR') ||
		member.hasPermission('KICK_MEMBERS')
	) {
		const target = mentions.users.first();
		if (target) {
			const targetMember = message.guild.members.cache.get(target.id);
			targetMember.kick();
			message.channel.send(`${tag} That user has kicked`);
		} else {
			message.channel.send(`${tag} Please specify someone to kick.`);
		}
	} else {
		message.channel.send(
			`${tag} You do not have permission to use this command.`
		);
	}
});
command(client, 'uptime', message => {
	let footer = config.avatar_list;
	const index = Math.floor(Math.random() * footer.length);
	let days = Math.floor(client.uptime / 86400000);
	let hours = Math.floor(client.uptime / 3600000) % 24;
	let minutes = Math.floor(client.uptime / 60000) % 60;
	let seconds = Math.floor(client.uptime / 1000) % 60;
	let botembed = new Discord.MessageEmbed()
		.setTitle('Nekoi Uptime')
		.setColor('#FFFD00')
		.setThumbnail(footer[index])
		.setFooter('Nekoi Bot', footer[index])
		.setTimestamp()
		.setDescription(
			`**__Uptime:__** ${days}d ${hours}h ${minutes}m ${seconds}s`
		);
	message.channel.send(botembed);
});

command(client, 'servers', message => {
	if (message.channel instanceof Discord.DMChannel)
		return message.channel.send('**This command is not available in DMs**');
	if (message.author.id != '529369089521614848')
		return message.channel.send("**You don't have permission to do this**");
	client.guilds.cache.forEach(guild => {
		message.channel.send(
			`${guild.name} has a total of ${guild.memberCount} members`
		);
	});
});

command(client, ['cc', 'clearchannel'], message => {
	if (message.channel instanceof Discord.DMChannel)
		return message.channel.send('**This command is not available in DMs**');
	if (
		!message.member.hasPermission('ADMINISTRATOR', {
			checkAdmin: true,
			checkOwner: true
		})
	)
		return message.channel.send(
			"**I'm sorry, you don't have the permission to use this. Please ask an Owner!**"
		);
	if (message.member.hasPermission('ADMINISTRATOR')) {
		message.channel.messages.fetch().then(results => {
			message.channel.bulkDelete(results);
		});
	}
});

command(client, 'status', message => {
	if (message.author.id != '529369089521614848')
		return message.channel.send("**You don't have permission to do this**");
	const content = message.content.replace('n!status ', '');
	const link = 'https://github.com/domathid/Nekoi'
	client.user.setPresence({
		activity: {
			name: content,
			type: 0,
			url: link
		}
	});
});
command(client, 'ping', message => {
	let footer = config.avatar_list;
	const index = Math.floor(Math.random() * footer.length);
	var ping = Date.now() - message.createdTimestamp + ' ms';
	let botembed = new Discord.MessageEmbed()
		.setTitle('Nekoi Ping')
		.setColor('#FFFD00')
		.setDescription(
			`**__Your ping is:__** ${Date.now() - message.createdTimestamp}ms`
		)
		.setFooter('Nekoi Bot', footer[index])
		.setThumbnail(footer[index])
		.setTimestamp();
	message.channel.send(botembed);
});
command(client, 'statscount', message => {
	if (message.author.id != '529369089521614848')
	return message.channel.send("**You don't have permission to do this**");
	let embed = new Discord.MessageEmbed()
	.setTitle("Nekoi Server Count")
	.setColor('#FFFD00')
	.setThumbnail(footer[index])
	.setDescription(`Server Count: ${client.guilds.cache.size}`)
	.setFooter('Nekoi Bot')
	.setTimestamp()
	message.channel.send(embed);
  });
 command(client, 'meme', message => {
if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
   let toMeme = [
      'https://cdn.discordapp.com/attachments/310611569794875404/353539349742092289/image.jpg',
      'http://weknowmemes.com/wp-content/uploads/2012/02/the-internet-is-a-series-of-tubes-and-theyre-full-of-cats.jpg',
      'http://assets8.popbuzz.com/2017/09/shooting-stars-meme-1488215847-list-handheld-0.png',
      'http://imgur.com/vG98twU',
      'https://thechive.files.wordpress.com/2016/07/the-dankest-memes-of-all-time-38-photos-36.jpg?quality=85&strip=info&w=600',
      'https://media0.giphy.com/media/ehc19YLR4Ptbq/giphy.gif',
      'https://qph.ec.quoracdn.net/main-qimg-cf520202236c0a99986988706131aafb-c',
      'https://qph.ec.quoracdn.net/main-qimg-762390f6c44fdcb31cf01657d776d181-c',
      'https://s-media-cache-ak0.pinimg.com/originals/2b/87/17/2b8717e385f04061c8b6b78cd4c663c7.jpg',
      'https://lh3.googleusercontent.com/-VHV916run58/WC9To_x72tI/AAAAAAAACkE/f59cQ9_9-XY/safe_image_thumb.gif?imgmax=800',
      'https://digitalsynopsis.com/wp-content/uploads/2015/03/web-designer-developer-jokes-humour-funny-41.jpg',
      'https://pbs.twimg.com/media/ClH8MiWUgAAkIqr.jpg',
      'https://s-media-cache-ak0.pinimg.com/originals/35/01/ae/3501ae95813921b4a17e7d9469f1ba05.jpg',
      'https://img.memecdn.com/me-programmer_o_331911.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/d4/f2/00/d4f20041254a0727ddce7cb81be9e68c.jpg',
      'https://wyncode.co/wp-content/uploads/2014/08/81.jpg',
      'http://4.bp.blogspot.com/-u16rpXWn7Nw/U1jWM7-8NVI/AAAAAAAAHkY/gshqLZwE8iE/s1600/Difference+Between+Gamers+&+Programmers+Keyboard.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvk7n1gMlDTW4V4BJ9dVbJuMNs0Js7nVXt2WqHzCU5hXbGNe2u',
      'http://2.bp.blogspot.com/-94oft_Og47c/U1ja4YagplI/AAAAAAAAHlU/Q0dCHUkj0_s/s1600/How+Programmers+Talk.jpg',
      'https://wyncode.co/wp-content/uploads/2014/08/191.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/cc/42/ae/cc42ae3bf4a60760c48f25b654c0cc83.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/e8/48/18/e84818a407481f290a786a9cadb2ee03.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/00/88/15/008815b7888e82d5a82dbd8eac2f0205.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/33/06/85/330685a41fa6198be3aee58339a37c62.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/03/a1/75/03a17558ed2efaea1ca19bbddea51dff.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/4f/54/29/4f5429df5ea6361fa8d3f08dfcdccdf9.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/6e/f0/bc/6ef0bc2a3298187807efa501cb05a375.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/ce/46/a6/ce46a66f29e4cc4a8179e44d70d2e560.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/20/1e/b1/201eb13e53e5d038e54b16f4f5786d0f.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/45/2b/9c/452b9c8cacfb365f9afa5baaa0bb59b4.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/ee/9a/08/ee9a08c938b4856c1b4d08486c89ad13.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/7e/90/6b/7e906b6eeac775ad40290f6d7a65f59c.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/eb/b5/d8/ebb5d8cb556236a732549ad83937546b.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/a2/9a/bc/a29abc6432badfba5106344c11c88029.jpg',
      'https://s-media-cache-ak0.pinimg.com/236x/87/dd/9e/87dd9ed4e8edeff76f8e5a1218656e16.jpg',
      'https://s-media-cache-ak0.pinimg.com/236x/eb/b5/d8/ebb5d8cb556236a732549ad83937546b.jpg',
      'https://s-media-cache-ak0.pinimg.com/236x/9f/7c/42/9f7c42a12a59e2706b144d62d9b67f4e.jpg',
      'https://cdn.discordapp.com/attachments/304065566396645377/323264999684309002/b5ac1149b38bfeec57a6e81331b699a675a2223faa69943c15a35c9409ba463f.png',
      'Your code can\'t error if you don\'t run it',
      'You can\'t go through the stages of coding if you don\'t code',
      'https://cdn.discordapp.com/attachments/283339767884677121/307266230203711489/image.jpg',
      'http://quotesnhumor.com/wp-content/uploads/2016/12/30-In-Real-Life-Memes-3-Real-Life-Funny-Memes.jpg',
      'http://cbsnews1.cbsistatic.com/hub/i/r/2016/12/20/d4acaba0-86d5-43ed-8f75-78b7ba6b8608/resize/620x465/e1d65d1488d27435ddc9e0670299dc44/screen-shot-2016-12-20-at-2-01-34-pm.png',
      'https://s-media-cache-ak0.pinimg.com/736x/3b/f8/39/3bf839473fdec43adaaba5b475832e3a.jpg',
      'http://www.fullredneck.com/wp-content/uploads/2016/04/Funny-Russia-Meme-20.jpg',
      'https://img.washingtonpost.com/news/the-intersect/wp-content/uploads/sites/32/2015/04/obama-meme.jpg',
      'http://www.fullredneck.com/wp-content/uploads/2016/11/Funny-Global-Warming-Meme-13.jpg',
      'https://i0.wp.com/blogs.techsmith.com/wp-content/uploads/2016/09/what-is-a-meme.jpg?resize=640%2C480',
      'https://s-media-cache-ak0.pinimg.com/736x/92/bd/51/92bd51939ce6e27f773aee3516b2cd6f.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8nr0iyakAda0ySUV_JceEiG9LNwNthZ71hrbvq1vhHd0j7UNdxw',
      'https://s-media-cache-ak0.pinimg.com/736x/6f/28/66/6f2866766ac899a6f91bb4775fc69b2d.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/e2/86/f9/e286f9d7ecf6f571b4a58215a2170a80.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/7f/bd/94/7fbd94ac3dca74643cc73aede5da366d.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/3d/54/8b/3d548b4bd6c1651bd13ac48edb07eba7.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/01/0b/68/010b68214bf1eeb91060732aa58bed1e.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/34/8a/92/348a92212ef1bcd89c94555e3d8380b5.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/88/40/22/8840225f3b254ee4ecaafa17b3cf324b.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/ff/56/59/ff56598016c0529acf61c70f80530456.jpg',
      'http://i0.kym-cdn.com/photos/images/original/001/256/969/543.jpg',
      'https://carlchenet.com/wp-content/uploads/2016/01/githubdown.png'];
      toMeme = toMeme[Math.floor(Math.random() * toMeme.length)];
      message.channel.send({embed: {
      color: 3447003,
      title: "Nekoi Bot",  
      description: "Random Meme Generator",  
      image: {url: toMeme}
      }}); 
  });
  
client.login(process.env.TOKEN);
