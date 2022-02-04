const {afk} = require('../Collection')
const client = require('../index')
const moment = require('moment')
const { MessageEmbed } = require('discord.js')
const { user } = require('../index')

client.on('messageCreate', async (message) => {
    if (!message.guild || message.author.bot) return
    const mentionedMember = message.mentions.members.first()
    if (mentionedMember) {
        const data = afk.get(mentionedMember.id)

        if(data) {
            const [timestamp, reason ] = data
            const timeAgo = moment(timestamp).fromNow()
            const embed = new MessageEmbed()
            .setDescription(`${mentionedMember} is currently AFK for: ${reason}`)
            .setThumbnail(mentionedMember.displayAvatarURL({dynamic: true}))
            .setColor('RANDOM')
            message.reply({embeds: [embed]})
        }
    }

    const gData = afk.get(message.author.id)
    const afkEm = new MessageEmbed()
    .setTitle(`AFK removed`)
    .setDescription(`i have removed your afk`)
    .setColor('RANDOM')
    .setThumbnail(`https://th.bing.com/th/id/R.3e9d42d0819b7c53c18be3b413ed74ed?rik=0H8jSCCwz9rceA&riu=http%3a%2f%2fimage.en.yibada.com%2fdata%2fthumbs%2ffull%2f59930%2f685%2f0%2f0%2f0%2fjames-spader-played-ultron-in-joss-whedons-avengers-age-of-ultron.jpg&ehk=EcAcCDYLC2%2fn6WY4Gt3renew7YB%2bIKpEkyT%2fgKdtMZk%3d&risl=&pid=ImgRaw&r=0`)
    if (gData) {
        afk.delete(message.author.id)
        message.reply({embeds: [afkEm]})
    }
})