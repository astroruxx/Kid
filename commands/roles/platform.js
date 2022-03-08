const {MessageEmbed} = require('discord.js')


module.exports = {
    name: 'platform',
    UserPerms: ['MANAGE_MESSAGES'],

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('choose a role')
        .setDescription(`1️⃣: MOBILE
        2️⃣: PC
        3️⃣: XBOX
        4️⃣: PLAYSTATION`)
       .setColor('RANDOM')

       const remove = new MessageEmbed()
       .setTitle('remove platform roles')
       .setDescription(`1️⃣: MOBILE
        2️⃣: PC
        3️⃣: XBOX
        4️⃣: PLAYSTATION`)
       .setColor('RANDOM')
        message.channel.send({
            embeds: [embed]
        })
        message.channel.send({embeds: [remove]})
    },
};

