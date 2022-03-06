const { MessageEmbed, Message } = require('discord.js');
const { ModMailClient } = require('reconlx');
const { channels } = require('../index');
const client = require('../index')

const modmailClient = new ModMailClient({
    client,
    guildId: '938485402656981022',
    category: '947336654769774633',
    modmailRole: '947336654773977118',
    mongooseConnectionString: 
    'mongodb+srv://Winter:Soldier@cluster0.npqr0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    transcriptChannel: '947336684800991275',
    custom: {
        user: user => {
            return {
                const: embed = new MessageEmbed()
                    .setTitle('Modmail')
                    .setDescription(`<@!${user.id}>. \nYou have been connected to the staff team\nYou can Suggest anything you would like\nSome examples are, A bot command for me(give code)\nModeration Questions, Reporting Users.(give user id)\nThank you for contacting us, Please give the mods atleast 48 hours to respond or read your message.\nYour Cooperation is our greatest ally. `)
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