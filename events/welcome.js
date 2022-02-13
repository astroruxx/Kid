const client = require('../index')
const {MessageEmbed} = require('discord.js')
const { user } = require('../index')


client.on('guildMemberAdd', async(member) => { 
    const Channel = member.guild.channels.cache.get('938485404326326316')
    //making embed
    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Welcome 👋')
        .setDescription(`**@${member.displayName}** welcome to **${member.guild.name}**, we now have ${member.guild.memberCount} members!`)
        .setThumbnail(`${member.displayAvatarURL({dynamic: true})}`)
    Channel.send({
        
        embeds: [embed]
    })
    member.send({embeds: [embed]})
})