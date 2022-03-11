const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const schema = require('../../../model/logs')
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
        
        
        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ');
        const data = await schema.findOne({ GuildId: message.guild.id });
        const channelaa = await client.channels.fetch(data.ChannelId);
        const embedd = new MessageEmbed()
        .setColor('RED')
        .setTitle('```Api error.catch(e) ban member not specified```')
        .addField('Invalid Argument', 'Please specify a valid member')
        if (!reason || !user) await message.reply({embeds: [embedd]})
        const embed = new MessageEmbed()
        .setTitle(`${user.} was banned`)
        .setDescription(`reason: ${reason}`)
        .setColor('GREEN')
        .setImage(`${user.displayAvatarURL({dynamic: true})}`)
        const send = user.send({embeds: [embed]})
        if (user) {

            await user.ban({
                reason: reason,
            }).then(() => {
                message.reply({embeds: [embed]})
                send
            })
            if (!send) {
                return ('```Error could not send message to user```')
            }
            }

        }  
        }


