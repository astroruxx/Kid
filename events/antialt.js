const client = require("../index")
const ms = require('ms')
const { MessageEmbed } = require("discord.js")

client.on('guildMemberAdd', member => {
    let minAge = ms('2 days')
    let createdAt = new Date(member.user.createdAt).getTime()
    let diff = Date.now() - createdAt
    const embed = new MessageEmbed()
    .setTitle(`Anti Alt`)
    .setDescription(`${member.user.username} your account age is to low.`)
    .setThumbnail(`${member.displayAvatarURL({dynamic: true})}`)

    if(minAge > diff) {
        member.send({ embeds: [embed] })
        member.kick()
    }
})