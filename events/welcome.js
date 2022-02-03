const client = require('../index')
const {MessageEmbed} = require('discord.js')
const { user } = require('../index')


client.on('guildMemberAdd', async(member) => { // this event gets triggered when a new member joins the server!
    // Firstly we need to define a channel
    // either using .get or .find, in this case im going to use .get()
    const Channel = member.guild.channels.cache.get('938485404326326316') //insert channel id that you want to send to
    //making embed
    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Welcome 👋')
        .setDescription(`**@${member.displayName}** welcome to **${member.guild.name}**, we now have ${member.guild.memberCount} members!`)
        .setThumbnail(`${member.displayAvatarURL({dynamic: true})}`)
    // sends a message to the channel
    Channel.send({
        
        embeds: [embed]
    })
    member.send({embeds: [embed]})
})