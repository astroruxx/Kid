const { Client, Collection, MessageEmbed, Message, Discord } = require("discord.js");
const { token, clientId, clientSecret } = require('./config.json')
const fs = require('fs')
const express = require("express")
const os = require("os")
const app = express()
const DiscordOauth2 = require("discord-oauth2")
const cookieParser = require('cookie-parser');
const usersMap = new Map();
const LIMIT = 5;
const TIME = 90000;
const DIFF = 5000;
const Fs = require('fs')
const ms = require('ms')

const client = new Client({
    intents: 32767,
    partials : ["MESSAGE", "CHANNEL", "REACTION"],
    allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true }
});
module.exports = client;

const logs = require('discord-logs');
const res = require("express/lib/response");
const req = require("express/lib/request");
logs(client, {
    debug: true
});
app.enable("trust proxy") 
app.set("etag", false) 
app.use(express.static(__dirname + "/website"))
app.set("views", __dirname)
app.set("view engine", "ejs")
app.use(cookieParser());
process.oauth = new DiscordOauth2({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: "http://localhost:90/callback"
})
app.get("/", async (req, res) => {

    const users = client.users.cache.size
    const guilds = client.guilds.cache.size
    

    let file = fs.readFileSync("./website/html/home.ejs", { encoding: "utf8" })
    file = file.replace("$$guilds$$", guilds)
    file = file.replace("$$users$$", users)

    res.send(file)
    // res.sendFile('./website/html/home.html', { root: __dirname })
})
let files = fs.readdirSync("./website/public").filter(f => f.endsWith(".js"))
// Looping thru all files in it
files.forEach(f => {
    // requiring the file
    const file = require(`./website/public/${f}`)
    if(file && file.name) { // if the file exosts and has a name, do:
        // set "name" from inside the file as a route, and run the function
        app.get(file.name, file.run)
        // logs which files are being loaded
        console.log(`[Dashboard] - Loaded ${file.name}`)
    }
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
                let muterole = message.guild.roles.cache.find(role => role.id === '938485402698936479');
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
            console.log('map remove.')
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
   return msg.channel.send(`${msg.author} , do not send long messages`)
     
    }

if(msg.mentions.users.size > 2 && !msg.member.hasPermission('ADMINISTRATOR') && !msg.channel.id === '938485403437117495') {


msg.delete()
return msg.reply('No mass mentions allowed.')

}
//ANTI LINE SPAM
try {
var lineArray = msg.content.match(/\n/g);
var number = lineArray.length

if(number >= 20) {
    msg.delete()
    return msg.reply('no line spamming read rules if needed')
    
}
}catch(err) {


}
 
    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
      };
      var testContent = msg.content;
      if(isValidURL(testContent)) {
         
        msg.delete();
        return msg.channel.send('you cannot send links in this server!')
      }

      

    var array = ['banana' , 'words', 'go' , 'here', 'poop'];
 
        if(array.some(w =>  ` ${msg.content.toLowerCase()} `.includes(` ${w} `))){
            var emojiGuild = client.guilds.cache.find(guild => guild.name === 'GITBASHED') //PUT YOUR GUILD NAME HERE
             //PUT YOUR EMOJI NAME HERE


            await msg.reply('we do not tolerate this language')
            msg.delete()

            var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            

            if(!warnsJSON[msg.author.id]) {
                warnsJSON[msg.author.id] = {
                    warns: 0
                }

                Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
            }

            warnsJSON[msg.author.id].warns += 1
            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))


            setTimeout(function() {

                warnsJSON[msg.author.id].warns -= 1
                Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
            }, ms('24h'))

            const warnEm = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`You have been warned in ${msg.guild.name}`)
            .setDescription('You have recieved a warning from the moderation system')
            .addField('Reason' , '[AutoMod] Using filtered words')
            .addField('Expires' , '24h')

            try {
                msg.author.send({embeds: [warnEm]})

            } catch(err) {

            }


            if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
                const mutedEm = new MessageEmbed()
                .setColor('RED')
                .setDescription(`**${msg.member.user.username}** has been muted for continuous infractions`)
                msg.channel.send({embeds: [mutedEm]})

                const muteRole = msg.guild.roles.cache.find(r => r.name.toString() === '『🔇』Muted')
                const user = msg.member
                user.roles.add(muteRole.id)

                const yougotmuted = new MessageEmbed()
                .setColor('RED')
                .setTitle(`You have been muted in ${msg.guild.name}`)
                .setDescription('You have been muted after 3 infractions')
                .addField('Reason' , 'Multiple AutoMod Infractions')
                .addField('Expires' , '2h')

                try {

                    msg.author.send({embeds: [yougotmuted]})

                }catch(err) {

                }

                setTimeout(function () {
                    user.roles.remove(muteRole.id)
                }, ms('2h'));
			
            }
        return;
        }
 
})

client.on('guildMemberAdd' , async(member) => {

let warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'));
  warnsJSON[member.id] = {
                warns: 0
            }
            Fs.writeFileSync('./warnInfo.json', JSON.stringify(warnsJSON));
})


// Initializing the project
require("./handler")(client);
client.login(token);
app.listen(process.env.PORT || 90, () => console.log(`App processed on ${process.env.PORT || 90}`))
