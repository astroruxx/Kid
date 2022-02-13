const {MessageEmbed} = require('discord.js')


module.exports = {
    name: 'blank',
    UserPerms: ['rule'],

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('faq 1')
        .setDescription(`No blank nicknames. Go to <#938485403437117494> if you do not understand or know the rules of this server`)
       .setColor('RANDOM')
       
        message.reply({
            embeds: [embed]
        })
    },
};
