const {Message, MessageEmbed}= require('discord.js')
const { request } = require('express')
const ms = require('ms')
const schema = require('../../../model/mute')
module.exports = {
    name : 'mute',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        const reason = args.slice(1).join(' ') || 'no reason given'
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const data = await schema.findOne({ GuildId: message.guild.id });
        const mutedrole = await message.guild.roles.cache.get( data.MuteRole)
        if(!mutedrole) {
            return message.reply('Please setup a muterole, run ?setup mute')
        }
        if(!Member) return message.channel.send('```Error Member Was Not Found```')
        
        if(Member.roles.cache.has(mutedrole)) return message.reply(`${Member.displayName} has already been muted`)
        if(!mutedrole) {
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
        await Member.roles.add(mutedrole)
        message.channel.send({embeds: [em]})
    }
}