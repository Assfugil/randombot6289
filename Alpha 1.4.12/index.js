'use strict'
const cooldown8ball = new Set() // 10s
const cooldownapi = new Set() // 15s
const cooldownban = new Set() // 5s
const cooldowncat = new Set() // 2s
const cooldownchannel = new Set() // 5s
const cooldowncoinflip = new Set() // 0.8s
const cooldowncreateguild = new Set() // 1min
const cooldowncredits = new Set() // 3s
const cooldowndac = new Set() // 30s
const cooldowndevpanel = new Set() // 0.8s
const cooldowndog = new Set() // 2s
const cooldownembed = new Set() // 5s
const cooldownhelp = new Set() // 0.8s
const cooldownhowgay = new Set() // 0.8s
const cooldownkick = new Set() // 5s
const cooldownluck = new Set() // 0.8s
const cooldownping = new Set() // 2s
const cooldownprefix = new Set() // 10s
const cooldownpurge = new Set() // 10s
const cooldownrandomstring = new Set() // 5s
const cooldownrolldie = new Set() // 0.8s
const cooldownrps = new Set() // 0.8s
const cooldownsetactivity = new Set() // 12s
const cooldownslowmode = new Set() // 5s
const cooldownspam = new Set() // 5min
const cooldowntime = new Set() // 0.8s
const cooldownuserinfo = new Set() // 3s
const cooldownversion = new Set() // 3s



const discord = require('discord.js')
const fs = require('fs')
const bot = new discord.Client()
const fetch = require('node-fetch')
const developers = []
const version = "Alpha 1.4.12 modification 7"
bot.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

const prefix = ">>";

let prefixes = require('./data/prefixes.json');

bot.on('ready', () => {
  console.log(`Bot has started!`)
	console.log(`Time: ${new Date().getTime()}`)
	console.log(`Version: ${version}`)
	console.log(`Developer count: ${developers.length}`)
	console.log(`Guild count: ${bot.guilds.size}`)
	console.log(`Total channels in guilds: ${bot.channels.size}`)
	console.log(`Total users in guilds: ${bot.users.size}`)
})

bot.on('message', message => {
if (!message.guild) return;

	if (!prefixes[message.guild.id]) {
		prefixes[message.guild.id] = {
			prefix: prefix
		}
		fs.writeFile('./data/prefixes.json', JSON.stringify(prefixes,null,2), (err) => {
			if (err) console.log(err)
		})
}

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
	if (!message.channel.permissionsFor(message.guild.me).serialize().READ_MESSAGES || !message.channel.permissionsFor(message.guild.me).serialize().SEND_MESSAGES || !message.channel.permissionsFor(message.guild.me).serialize().READ_MESSAGE_HISTORY || !message.channel.permissionsFor(message.guild.me).serialize().EMBED_LINKS) return message.member.send("The bot is missing at least one permission in the channel you are using the bot in.\nRequired permissions: **Read messages, Send messages, Read message history, Embed links**")

	if (message.content === `<@${message.guild.me.id}>` || message.content === `<@!${message.guild.me.id}>`) return message.channel.send(`My prefix for **${message.guild.name}** is \`${prefixes[message.guild.id].prefix}\`\nSend **${prefixes[message.guild.id].prefix}help** (no formatting) for a list of commands.`)
	if (!message.content.startsWith(prefixes[message.guild.id].prefix)) return;

  var args = message.content.slice(prefixes[message.guild.id].prefix.length).split(' ')
	var splitArgs = message.content.slice(prefixes[message.guild.id].prefix)

  const command = args[0].toLowerCase()

  function sendEmbed(a,b,c) {
  const embed = new discord.RichEmbed()
   .setColor("#" + a)
   .setTitle(b)
   .setDescription(c)
   message.channel.send(embed)
   }

   function sendErrorEmbed(a) {
    const embed = new discord.RichEmbed()
     .setColor("#ff0000")
     .setTitle("Technical Issue")
     .setDescription(a)
     message.channel.send(embed)
   }

	 function sendSuccessfulAction(a) {
		 const embed = new discord.RichEmbed()
		 	.setColor("#00ff00")
			.setTitle("Successful Action")
			.setDescription(a)
			message.channel.send(embed)
	 }

	 function sendUnsuccessfulAction(a) {
		 const embed = new discord.RichEmbed()
			.setColor("#ff0000")
			.setTitle("Unsuccessful Action")
			.setDescription(a)
			message.channel.send(embed)
	 }

   if (command === "embed") {
     bot.commands.get('embed').execute(message, args, version, splitArgs, command, prefixes, sendEmbed, sendUnsuccessfulAction, cooldownembed)
   }

   if (command === "version" || command === "about") {
     bot.commands.get('version').execute(message, version, command, prefix, sendEmbed, sendErrorEmbed, cooldownversion)
   }

   if (command === "ping") {
		 bot.commands.get('ping').execute(message, bot, command, prefix, sendEmbed, sendErrorEmbed, cooldownping)
	 }

	 if (command === "8ball" || command === "8-ball") {
		 bot.commands.get('8ball').execute(message, args, version, command, prefix, sendEmbed, sendUnsuccessfulAction, cooldown8ball)
	 }

	 if (["commands","help","cmnds","cmds"].includes(command)) {
		 bot.commands.get('help').execute(message, args, bot, command, prefix, sendEmbed, sendErrorEmbed, cooldownhelp)
	 }

	 if (command === "randomstring" || command === "random-string") {
		 bot.commands.get('randomstring').execute(message, bot, args, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, cooldownrandomstring)
	 }

	 if (command === "test") {
		 bot.commands.get('test').execute(message, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, developers)
	 }

	 if (["kick","remove-member","removemember"].includes(command)) {
		 bot.commands.get('kick').execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, cooldownkick)
	 }

	 if (command === "ban") {
		 bot.commands.get('ban').execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, cooldownban)
	 }

	 if (["delete-messages","purge","clear","delmessages","delmessage","deletemessages","deletemsg","delmsg"].includes(command)) {
		 bot.commands.get('purge').execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, cooldownpurge)

	 }
   if (command === "prefix" || command === "pre") {
		 bot.commands.get('prefix').execute(message, bot, args, command, prefixes, prefix, fs, sendEmbed, sendErrorEmbed, sendSuccessfulAction, sendUnsuccessfulAction, cooldownprefix)
	 }

	if (command === "channel" || command === "channels") {
		bot.commands.get('channel').execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, cooldownchannel)
	}

	if (["delallchannels","delallchannel","deleteallchannels","dac","delete-all-channels","removeallchannels","remove-all-channels"].includes(command)) {
		bot.commands.get('delete-all-channels').execute(message, args, bot, command, prefix, sendEmbed, sendUnsuccessfulAction, sendErrorEmbed, cooldowndac)
	}

	if (["rps","rockpaperscissors","rock-paper-scissors"].includes(command)) {
    bot.commands.get('rps').execute(message, args, version, command, prefix, sendEmbed, sendErrorEmbed, cooldownrps)
	}

	if (["flipacoin","flipcoin","flip-coin","flip-a-coin","coin-flip","coinflip"].includes(command)) {
		bot.commands.get('coinflip').execute(message, args, version, command, prefix, sendEmbed, sendErrorEmbed, cooldowncoinflip)
	}

	if (["rolldice","rolladie","roll-a-die","rolldie","roll"].includes(command)) {
		bot.commands.get('rolldie').execute(message, bot, args, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, cooldownrolldie)
	}

	if (["howgay","how-gay","gayrate","gayr8","howgae"].includes(command)) {
		bot.commands.get('howgay').execute(message, bot, args, command, prefix, sendEmbed, sendErrorEmbed, cooldownhowgay)
	}

	if (command === "time" || command === "date") {
		bot.commands.get('time').execute(message, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, developers)
	}

	if (command === "credits") {
		bot.commands.get('credits').execute(message, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, developers, cooldowncredits)
	}

	if (["devhelp","devpanel","developerhelp","developerpanel","dev-help"].includes(command)) {
		bot.commands.get('devpanel').execute(message, args, bot, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, developers, cooldowndevpanel)
  }

  if (["createguild","createserver","create-guild","create-server"].includes(command)) {
		bot.commands.get('createguild').execute(message, args, bot, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, developers, cooldowncreateguild)
	}

	if (command === "eval" || command === "evalulate") {
		bot.commands.get('eval').execute(message, args, discord, fs, bot, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, developers)
	}

	if (command === "spam" || command === "mass-message" || command === "massmessage") {
		bot.commands.get('spam').execute(message, bot, args, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, cooldownspam)
	}

	if (command === "setactivity" || command === "set-activity") {
		bot.commands.get('setactivity').execute(message, args, bot, command, prefix, sendEmbed, sendErrorEmbed, sendSuccessfulAction, sendUnsuccessfulAction, developers, cooldownsetactivity)
	}

	if (command === "slowmode" || command === "slow-mode") {
		bot.commands.get('slowmode').execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, cooldownslowmode)
	}

	if (command === "api" || command === "fetch") {
		bot.commands.get('api').execute(message, args, fetch, discord, bot, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, developers, cooldownapi)
	}

	if (command === "dog") {
		bot.commands.get('dog').execute(message, fetch, bot, command, prefix, sendErrorEmbed, cooldowndog)
	}

	if (command === "user-info" || command === "userinfo") {
		bot.commands.get('user-info').execute(message, args, bot, command, prefix, sendEmbed, sendErrorEmbed, cooldownuserinfo)
	}

	if (command === "cat") {
		bot.commands.get('cat').execute(message, fetch, bot, command, prefix, sendErrorEmbed, cooldowncat)
	}

	if (command === "luck") {
		bot.commands.get('luck').execute(message, bot, command, prefix, sendEmbed, cooldownluck)
	}


	 })

bot.login("")
