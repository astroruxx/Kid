const {afk} = require('../../Collection')
const {MessageEmbed, Role} = require('discord.js')
const client = require('../..')

module.exports = {
    name: 'ultrax',
    description: 'set your afk',
    run: async(client, message, args, Discord) => {
        const user = message.member
        afk.set(message.author.id, [Date.now(), reason])
        const embed = new MessageEmbed()
        .setTitle('This is ultrax source code')
        .setDescription(``)
        .setTimestamp()
        .setColor('RANDOM')
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
        const noembed = new MessageEmbed()
        .setTitle('you are not allowed to use this command')
        .setDescription(`<@!${user.id}>`)
        .setTimestamp()
        .setColor('RANDOM')
        .setThumbnail(user.user.displayAvatarURL({dynamic: true})) 
        if (message.member.id('930619661626802247')) client.channels.fetch('938485405429411906').then(channel => channel.send({embeds: [embed]}))
       else return message.reply({embeds: [noembed]})
       
    } 
}

 
