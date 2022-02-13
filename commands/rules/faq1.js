const {MessageEmbed} = require('discord.js')


module.exports = {
    name: 'faq1',
    UserPerms: ['rule'],

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('faq 1')
        .setDescription(`No blank nicknames. Go to rules if you do not understand or know the rules of this server`)
       .setColor('RANDOM')
       
        message.reply({
           content: 'https://discord.gg/5rGhw5Edpr',
            embeds: [embed]
        })
    },
};
