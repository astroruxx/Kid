const { MessageEmbed } = require('discord.js');
const { ModMailClient } = require('reconlx');
const { channels } = require('../index');
const client = require('../index')

const modmailClient = new ModMailClient({
    client,
    guildId: '938485402656981022',
    category: '938486121518739496',
    modmailRole: '938486149322768394',
    mongooseConnectionString: 
    'mongodb+srv://Stark:Judges2$@cluster0.o69ye.mongodb.net/Jarvis?retryWrites=true&w=majority',
    transcriptChannel: '938485405941129318',
    custom: {
        user: user => {
            return {
                content: `@${user.tag}`,
                embeds: [
                    new MessageEmbed()
                    .setTitle('Modmail')
                    .setDescription(`@${user.tag}. \nHere you can add any question about me @${client.user.tag}, Or report anything serious`)
                    .setThumbnail(user.displayAvatarURL())
                ]
            }
        },
        channel: (user) => {
            return {
                embeds: [
                    new MessageEmbed()
                    .setTitle(`@${user.tag}'s modmail`)
                    .setDescription('modmail opened')
                    .setThumbnail(user.displayAvatarURL())
                ]
            }
        }
    }
})
module.exports = modmailClient;