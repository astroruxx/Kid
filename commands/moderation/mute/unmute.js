const { Message } = require('discord.js')

module.exports=  {
    name : 'unmute', 
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toString() === '『🔇』Muted');
        const role2 = message.guild.roles.cache.find(r => r.name.toString() === 'muted');

        await Member.roles.remove(role)
        if (!role) {
            await Member.roles.remove(role2)
        }
        

        message.channel.send(`${Member.displayName} is now unmuted`)
    }
}