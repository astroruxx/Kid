const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'roleinfo',
    UserPerms: ['ADMINISTRATOR'],
    
    run: async (message, client, args) => {
        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('<a:blobchain:947336656510418945> Role Info')
        .setDescription('This embed will display role information, including permissions you will gain.')
        .addField('Levels', '<@')
        message.channel.send({embeds: [embed]})
    }
}