const {afk} = require('../../Collection')
const {MessageEmbed, Role} = require('discord.js')
const client = require('../..')

module.exports = {
    name: 'afk',
    description: 'set your afk',
    run: async(client, message, args, Discord) => {
        
        const reason = args.join(' ') || 'AFK'
        const user = message.member
<<<<<<< Updated upstream
        const embed = new MessageEmbed()
        .setTitle('you are now afk')
        .setDescription(`For: ${reason}`)
        .setTimestamp()
        .setColor('RANDOM')
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
=======
>>>>>>> Stashed changes
        const noembed = new MessageEmbed()
        .setTitle('you are not allowed to use this command')
        .setDescription(`<@!${user.id}>`)
        .setTimestamp()
        .setColor('BLUE')
        .setThumbnail(user.user.displayAvatarURL({dynamic: true})) 
<<<<<<< Updated upstream
        const nick = message.member.setNickname(`[AFK] ${message.author.username}`)
        if(!nick) return message.reply('you are afk but i could not change your nickname')
        if (message.member.roles.cache.has('947336672415203348')) afk.set(message.author.id, [Date.now(), reason]) 
       if (message.member.roles.cache.has('947336672415203348')) message.reply({embeds: [embed]})
       if (message.member.roles.cache.has('947336672415203348')) nick
=======
        if (message.member.roles.cache.has('947336672415203348')) afk.set(message.author.id, [Date.now(), reason]) 
       if (message.member.roles.cache.has('947336672415203348')) message.reply(`<@!${message.author.id}> I set your AFK: ${reason} `)
       if (message.member.roles.cache.has('947336672415203348')) message.member.setNickname(`[AFK] ${message.author.username}`)
>>>>>>> Stashed changes
       else return message.reply({embeds: [noembed]})
       
    } 
}

 
