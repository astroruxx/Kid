const {afk} = require('../../Collection')
const {MessageEmbed, Role} = require('discord.js')
const client = require('../..')

module.exports = {
    name: 'afk',
    description: 'set your afk',
    run: async(client, message, args, Discord) => {
        const reason = args.join(' ') || 'no reason was given'
        const user = message.member
        afk.set(message.author.id, [Date.now(), reason])
        const embed = new MessageEmbed()
        .setTitle('you are now afk')
        .setDescription(`For: ${reason}`)
        .setTimestamp()
        .setColor('RANDOM')
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
        const noembed = new MessageEmbed()
        .setTitle('you are not allowed to use this command')
        .setDescription(`<@!${user.user.id}>`)
        .setTimestamp()
        .setColor('RANDOM')
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
       if (message.member.roles.cache.has('938531722813923338')) return message.reply({embeds: [embed]}) 
       else (message.member.roles.cache.has('938531722813923338')); return message.reply({embeds: [noembed]})
    } 
}

 
