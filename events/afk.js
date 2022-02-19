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
            .setTimestamp(timeAgo)
            .setThumbnail(mentionedMember.displayAvatarURL({dynamic: true}))
            .setColor('RANDOM')
            message.reply({embeds: [embed]})
        }
    }

    const gData = afk.get(message.author.id)
    const afkEm = new MessageEmbed()
    .setTitle(`AFK removed`)
    .setDescription(`Welcome back!`)
    .setColor('RANDOM')
    if(gData) {
        afk.delete(message.author.id)
        message.reply({embeds: [afkEm]})
    }
})