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
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});
module.exports = client;

const logs = require('discord-logs');
logs(client, {
    debug: true
});







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
                const mutedembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('MUTED')
                .setDescription('You have been muted for spam by [AUTO MOD] <a:7284birb:943294880195694622>')
                .setImage(`${message.member.displayAvatarURL({dynamic: true})}`)
                message.member.send ({embeds: [mutedembed]});
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
