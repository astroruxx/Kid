const { Client, Collection, MessageEmbed, Message } = require("discord.js");
const usersMap = new Map();
const LIMIT = 200000;
const TIME = 1000000;
const DIFF = 5000;
const fs = require('fs')
const ultrax = require('ultrax')

const client = new Client({
    intents: 32767,
    partials : ["MESSAGE", "CHANNEL", "REACTION"],
    allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true }
});
module.exports = client;

const logs = require('discord-logs');
logs(client, {
    debug: true
});

ultrax.boost.start(client, '937069384734769192')
client.on('boost', async booster => {
    const boostImage = ultrax.boostImage
    let avatar = booster.user.displayAvatarURL({ dynamic: false})
    let boostCard = await boostImage(avatar)
	const boostchannel = client.channels.cache.get('938485403856539655')
	boostchannel.send({ content: `${booster} boosted the server!!`, files: [ boostCard ] })

})





// replace the files accordi

client.commands = new Collection()
client.config = require('./config.json')
client.prefix = client.config.prefix
client.aliases = new Collection()


// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");




client.on('message', async(message) => {
    if(message.author.bot) return;
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if(difference > DIFF) {
            clearTimeout(timer);
            console.log('Cleared Timeout');
            userData.msgCount = 10;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from map.')
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                let muterole = message.guild.roles.cache.find(role => role.id === '937071229532254307');
                if(!muterole) {
                    try{
                        muterole = await message.guild.roles.create({
                            name : "muted",
                            permissions: []
                        })
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS : false
                            })
                        })
                    }catch (e) {
                        console.log(e)
                    }
                }
                message.member.roles.add(muterole);
                message.member.send ('you have been muted!');
                setTimeout(() => {
                    message.member.roles.remove(muterole);
                   message.member.send('You have been unmuted!')
                }, TIME);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed from map.')
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
})

// Initializing the project
require("./handler")(client);
client.login(client.config.token);
