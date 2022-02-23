const {MessageEmbed, Message, Discord} = require('discord.js')

module.exports = {
    name: 'fanart',
    UserPerms: ['ADMINISTRATOR'],
    /**
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(message, Discord) => {
        const info = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Fan Art Info')
        .setDescription('This MessageEmbed will explain everything about this channel')
        .addField('How to send art?', 'To send art you need level 15 or higher, else you will need to contact a member with the role <@&938485402698936474>')
        Message.reply({embeds: [info]});
    }


}
