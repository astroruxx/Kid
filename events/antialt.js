const client = require("../index")
const ms = require('ms')
const { MessageEmbed } = require("discord.js")
const { user } = require("../index")
const warnings = require("../commands/moderation/warn/warnings")

client.on('guildMemberAdd', member => {
    let minAge = ms('2 days')
    let createdAt = new Date(member.user.createdAt).getTime()
    const reason = '[AUTO MOD]'
    let diff = Date.now() - createdAt
    const embed = new MessageEmbed()
    .setTitle(`Anti Alt`)
    .setDescription(`${member.user.username} your account age is to low. ${reason}`)
    .setThumbnail(`${member.displayAvatarURL({dynamic: true})}`)
    if(minAge > diff) {
         member.kick()
    }
})