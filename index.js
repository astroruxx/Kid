const { Client, Collection, MessageEmbed, Message } = require("discord.js");
const fs = require('fs')

const client = new Client({
    intents: 32767,
    partials : ["MESSAGE", "CHANNEL", "REACTION"],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});
module.exports = client;

const logs = require('discord-logs');
logs(client, {
    debug: true
});

const usersMap = new Map();
const LIMIT = 5;
const TIME = 10000000;
const DIFF = 3000;

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
            userData.msgCount = 1;
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
                let muterole = message.guild.roles.cache.find(role => role.name === 'muted');
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
                const mute = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`you have been muted for ${TIME} seconds`)
                .setImage(`${message.author.displayAvatarURL({dynamic: true})}`)
                const unute = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`you have been unmuted please behave or a mod will ban you if you have been muted to many times!`)
                .setImage(`${message.author.displayAvatarURL({dynamic: true})}`)
                message.member.roles.add(muterole);
                message.author.send({embeds: [mute]});
                setTimeout(() => {
                    message.member.roles.remove(muterole);
                    message.author.send({embeds: [unute]})
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

client.commands = new Collection()
client.config = require('./config.json')
client.prefix = client.config.prefix
client.aliases = new Collection()


// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);
client.login(client.config.token);
