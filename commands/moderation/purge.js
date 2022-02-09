const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'purge',
    aliases: ['clear'],
    UserPerms: ['MANAGE_MESSAGES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        try {
            let delamount = args[0];
            if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply({content: 'Please use the correct format', ephemeral: true})

            if (parseInt(delamount) > 100) return message.reply('you cant delete over 300 messages')

            await message.channel.bulkDelete(parseInt(delamount) + 1, true);
            const embed = new MessageEmbed()
            .setTitle(`Purged messages`)
            .setColor(`RANDOM`)
            .setThumbnail(`https://th.bing.com/th/id/R.3e9d42d0819b7c53c18be3b413ed74ed?rik=0H8jSCCwz9rceA&riu=http%3a%2f%2fimage.en.yibada.com%2fdata%2fthumbs%2ffull%2f59930%2f685%2f0%2f0%2f0%2fjames-spader-played-ultron-in-joss-whedons-avengers-age-of-ultron.jpg&ehk=EcAcCDYLC2%2fn6WY4Gt3renew7YB%2bIKpEkyT%2fgKdtMZk%3d&risl=&pid=ImgRaw&r=0`)
            .setDescription(`I have purged ${delamount} messages`)

            await message.channel.send({
                embeds: [embed]
            }).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000) 
            })
        } catch (e) {
            console.log(e)
        } 
    }
}