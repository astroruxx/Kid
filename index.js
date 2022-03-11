const { Client, Collection, MessageEmbed, Message, Discord } = require("discord.js");
const { token, clientId, clientSecret } = require('./config.json')
const usersMap = new Map();
const LIMIT = 5;
const TIME = 90000;
const DIFF = 5000;
const fs = require('fs')
const ms = require('ms')
const express = require("express")

const client = new Client({
    intents: 32767,
    partials : ["MESSAGE", "CHANNEL", "REACTION"],
    allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true }
});
module.exports = client;

const logs = require('discord-logs');




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
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                let muterole = message.guild.roles.cache.find(role => role.id === '947336653687635988');
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
                .setColor('RED')
                .setTitle(`You have been muted in ${message.guild.name}`)
                .setDescription('You have been muted')
                .addField('Reason' , '[AutoMod] Spam')
                .addField('Expires' , '15 minutes')
                
                message.member.send ({embeds: [mutedembed]});
                setTimeout(() => {
                    const un = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('You have been Unmuted')
                    .setDescription('You have been Unmuted')
                    .addField('Refrain From', 'Spamming')
                    message.member.roles.remove(muterole);
                   message.member.send({embeds: [un]})
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
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
})


 

client.on('message', async(msg) => {

    if(msg.author.bot) return;
    if(!msg.guild) return;
    if(msg.content.length >= 150) {
    msg.delete();
   return msg.channel.send(`${msg.author} , do not send long messages in this server`)
     
    }

if(msg.mentions.users.size > 2 && !msg.member.hasPermission('ADMINISTRATOR') && !msg.channel.id === '938485403437117495') {


msg.delete()
return msg.reply('You are not allowed mass mentions')

}
//ANTI LINE SPAM
try {
var lineArray = msg.content.match(/\n/g);
var number = lineArray.length

if(number >= 20) {
    msg.delete()
    return msg.reply('Line spamming is not allowed. If you continue you will be muted or warned')
    
}
}catch(err) {


}

    var array = ['banana' , 'words', 'go' , 'here', 'poop'];
 
        if(array.some(w =>  ` ${msg.content.toLowerCase()} `.includes(` ${w} `))){
            var emojiGuild = client.guilds.cache.find(guild => guild.name === 'GITBASHED') //PUT YOUR GUILD NAME HERE
             //PUT YOUR EMOJI NAME HERE

            const badowordem = new MessageEmbed()
            .setColor('RED')
            .setTitle('You have been warned')
            .setDescription('[Auto Mod] Warned for using filtered words')
            .addField('CAUTION', 'You will be muted if you continue')
            await msg.reply({embeds: [badowordem]})
            msg.delete()

            var warnsJSON = JSON.parse(fs.readFileSync('./warnInfo.json'))
            

            if(!warnsJSON[msg.author.id]) {
                warnsJSON[msg.author.id] = {
                    warns: 0
                }

                fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
            }

            warnsJSON[msg.author.id].warns += 1
            fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))


            setTimeout(function() {

                warnsJSON[msg.author.id].warns -= 1
                fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
            }, ms('24h'))

            const warnEm = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`You have been warned in ${msg.guild.name}`)
            .setDescription('[AutoMod] You have been warned')
            .addField('Reason' , '[AutoMod] Using filtered words')
            .addField('Expires' , '24h')

            try {
                msg.author.send({embeds: [warnEm]})

            } catch(err) {

            }


            if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
                const mutedEm = new MessageEmbed()
                .setColor('RED')
                .setDescription(`**${msg.member.user.username}** has been muted.`)
                .addField('**Reason**', 'continous infractions')
                msg.channel.send({embeds: [mutedEm]})

                const muteRole = msg.guild.roles.cache.find(r => r.name.toString() === '『🔇』Muted')
                const user = msg.member
                user.roles.add(muteRole.id)

                const yougotmuted = new MessageEmbed()
                .setColor('RED')
                .setTitle(`You have been muted in ${msg.guild.name}`)
                .setDescription('[AutoMod] You have been muted')
                .addField('Reason' , 'Multiple AutoMod Infractions')
                .addField('Expires' , '3h')

                try {

                    msg.author.send({embeds: [yougotmuted]})

                }catch(err) {

                }

                setTimeout(function () {
                    user.roles.remove(muteRole.id)
                }, ms('3h'));
			
            }
        return;
        }
 
})

client.on('guildMemberAdd' , async(member) => {

let warnsJSON = JSON.parse(fs.readFileSync('./warnInfo.json'));
  warnsJSON[member.id] = {
                warns: 0
            }
            fs.writeFileSync('./warnInfo.json', JSON.stringify(warnsJSON));
})


// Initializing the project
require("./handler")(client);
client.login(token);
