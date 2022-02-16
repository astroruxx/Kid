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
       const allowedRole = message.guild.role(r => r.id === "943315302425460786");

       if (message.user.role.has(allowedRole)) {
        message.reply({
            embeds: [embed]
        })
    } else {
        return ('you do not have the right perms')
    }
       
}}