const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'mute',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        const reason = args.slice(1).join(' ') || 'no reason given'
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!Member) return message.channel.send('```Error Member Was Not Found```')
        const role = message.guild.roles.cache.find(r => r.name.toString() === '『🔇』Muted')
        if(Member.roles.cache.has(role)) return message.reply(`${Member.displayName} has already been muted`)
        if(!role) {
            try {
                message.channel.send('Muted role is not found, attempting to create muted role.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : '🔇 Muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Muted role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };
        const em = new MessageEmbed()
        .setColor('RED')
        .setTitle(`${Member.displayName} was muted`)
        .setDescription(`Reason: ${reason}`)
        .addField('Muted by:', `<@!${message.author.id}>`)
        await Member.roles.add(role)
        message.channel.send({embeds: [em]})
    }
}