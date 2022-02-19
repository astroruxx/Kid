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
        .setTitle('Please Specify a Valid slowmode')
        .setDescription('Valid slowmodes are from 0s - 21600s')
        const negative = new MessageEmbed()
        .setColor('RED')
        .setTitle('Please Specify a Valid slowmode')
        .setDescription('Valid slowmodes are positive number in seconds')
        const valid = new MessageEmbed()
        .setColor('RED')
        .setTitle('Please Specify a Valid slowmode')
        .setDescription('Valid slowmodes are positive numbers from 0s - 21600s')        
        if(isNaN(args[0])) return message.reply({embeds: [valid]})
        
        if(args[0] < 0) return message.reply({embeds: [negative]})
        if(args[0] > 21600) return message.reply({embeds: [tomuch]})
        message.channel.setRateLimitPerUser(args[0])

        

        const embed = new MessageEmbed()
        .setTitle(`Slowmode Set to \`${args[0]}\` seconds`)
        .setColor('GREEN')
        message.channel.send({embeds: [embed]})
    }
}