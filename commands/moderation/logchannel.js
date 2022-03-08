const {Message, MessageEmbed, MessageActionRow, MessageButton,  Client} = require('discord.js');
const logchanneldb = require('../../model/logchanneldb')
module.exports = {
    name: 'logchannelset',
     /**
    * 
    * @param {Client} client 
    * @param {Message} message
    * @param {String[]} args 
    */
    run: async(client, message, args) => {
        const chan = message.mentions.channels.first()
        if(!chan) return message.reply('Please specify a channel')
        const moderator = message.author.id

        logchanneldb.findOne({
            guild: message.guild.id,
           channel: message.mentions.channels.first()
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new logchanneldb({
                    guild: message.guild.id,
                    channel: message.mentions.channels.first(),
                    content: [{
                        moderator: message.author.id,
                    }]
                })
            }
            data.save()
        })

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Log channel was set')
        .setDescription(`Log channel was set to ${chan}`)
    message.reply({embeds: [embed]})
    }
}