const {Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const client = require('../../index')
module.exports = {
    name: 'help',
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('**Find Command Help By Clicking the Button**')
        .setDescription('~~IF THE BUTTON DOES NOT WORK CLICK THE TITLE~~')
        const button = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel('Link to commands page')
            .setStyle('LINK')
            .setURL('http://astroruxx.github.io/commands')
            )
    message.reply({ embeds: [embed], components: [button] })
    }
}