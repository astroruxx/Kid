const {MessageEmbed} = require('discord.js')


module.exports = {
    name: 'colors',
    UserPerms: ['MANAGE_MESSAGES'],

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('choose a role')
        .setDescription(`🔴: Bloody Mary
        🔵: Jet Blue
        🟢: Lime Green
        ⚫: Phantom`)
       .setColor('RANDOM')
        message.channel.send({embeds: [embed]})
    }
}