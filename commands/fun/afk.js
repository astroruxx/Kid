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
        .setDescription(`<@!${user.id}>`)
        .setTimestamp()
        .setColor('RANDOM')
        .setThumbnail(user.user.displayAvatarURL({dynamic: true})) 
        if (message.member.roles.cache.has('938531725066248232')) afk.set(message.author.id, [Date.now(), reason]) 
       if (message.member.roles.cache.has('938531725066248232')) message.reply({embeds: [embed]})
       if (message.member.roles.cache.has('938531725066248232')) message.member.setNickname(`[AFK] ${message.author.username}`)
       if (message.member.roles.cache.has('938485402770210927')) afk.set(message.author.id, [Date.now(), reason]) 
       if (message.member.roles.cache.has('938485402770210927')) message.reply({embeds: [embed]})
       if (message.member.roles.cache.has('938485402770210927')) message.member.setNickname(`[AFK] ${message.author.username}`)
       else return message.reply({embeds: [noembed]})
       
    } 
}

 
