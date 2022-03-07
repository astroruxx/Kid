const {MessageEmbed, Message, Client} = require('discord.js')

module.exports = {
    name: 'sm',
    UserPerms: ['MANAGE_MESSAGES'],
    aliases: ['slowmode', 'slow'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const tomuch = new MessageEmbed()
        .setColor('RED')
        .setTitle('```catch(e) console.log(e)```')
        .setDescription('Slowmode not valid')
        .addField('**Reason**', '```Slowmode to high.```')
        .addField('Valid Sm:', '```1-21600s```')
        const negative = new MessageEmbed()
        .setColor('RED')
        .setTitle('```catch(e) console.log(e)```')
        .setDescription('Slowmode not valid')
        .addField('**Reason**', '```Slowmode can not be negative```')
        .addField('Valid Sm:', '```1-21600s```')
        const valid = new MessageEmbed()
        .setColor('RED')
        .setTitle('```catch(e) console.log(e)```')
        .setDescription('Slowmode not valid')
        .addField('**Reason**', '```Slowmode  is not a integer```')
        .addField('Valid Sm:', '```1-21600s```')
        if(isNaN(args[0])) return message.reply({embeds: [valid]})
        
        if(args[0] < 0) return message.reply({embeds: [negative]})
        if(args[0] > 21600) return message.reply({embeds: [tomuch]})
        message.channel.setRateLimitPerUser(args[0])

        

        const embed = new MessageEmbed()
        .setTitle(`Slowmode Set to \`${args[0]}\`s`)
        .setColor('GREEN')
        message.channel.send({embeds: [embed]})
    }
}