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
    'mongodb+srv://Winter:Soldier@cluster0.npqr0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    transcriptChannel: '938485405941129318',
    custom: {
        user: user => {
            return {
                content: ``,
                const: embed = new MessageEmbed()
                    .setTitle('Modmail')
                    .setDescription(`<@!${user.id}>. \nHere you can add any question about me @${client.user.tag}, Or report anything serious`)
                    .setThumbnail(user.displayAvatarURL()),
                    embeds: [embed]
                    
            
            }
        },
        channel: (user) => {
            return {
                const: otherembed = new MessageEmbed()
                .setTitle(`@${user.tag}'s modmail`)
                .setDescription('modmail opened')
                .setThumbnail(user.displayAvatarURL()),
                        embeds: [otherembed]
                   
           
            }
        }
    }
})
module.exports = modmailClient;