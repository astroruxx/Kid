const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const log = require('../../../model/guildlogs')
module.exports = {
    name: 'execute',
    UserPerms: ['MODERATE_MEMBERS'],
    aliases: ['ban', 'destroy'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        
        log.findOne({
            channel: message.mentions.channels.first()
        })
        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ');
        const embedd = new MessageEmbed()
        .setColor('RED')
        .setTitle('```Api error.catch(e) ban member not specified```')
        .addField('Invalid Argument', 'Please specify a valid member')
        if (!reason || !user) return client.channels.fetch(channel).then(channel => channel.send({embeds: [embedd]}))
        const embed = new MessageEmbed()
        .setTitle(`${user.displayName} was banned`)
        .setDescription(`reason: ${reason}`)
        .setColor('GREEN')
        .setImage(`${user.displayAvatarURL({dynamic: true})}`)
        const send = user.send({embeds: [embed]})
        if (user) {

            await user.ban({
                reason: reason,
            }).then(() => {
                message.reply({embeds: [embed]})
                client.channels.fetch(channel).then(channel => channel.send({embeds: [embed]}))
                send
            })
            if (!send) {
                return ('```Error could not send message to user```')
            }
            }

        }  
        }


