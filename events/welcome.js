const client = require('../index')
const {MessageEmbed, GuildMember} = require('discord.js')
const { user } = require('../index')


client.on('guildMemberAdd', async(member) => {
    const Channel = member.guild.channels.cache.get('947336656187437066') 
    

    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Welcome 👋')
        .setDescription(`**<@!${member.id}>** welcome to **${member.guild.name}**, we now have ${member.guild.memberCount} members!`)
        .setThumbnail(`${member.displayAvatarURL({dynamic: true})}`)
        member.roles.add('938485402656981029')
 
    Channel.send({
        
        embeds: [embed]
    }).catch(console.error())
})