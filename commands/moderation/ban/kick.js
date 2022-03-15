const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const schema = require('../../../model/logs')
module.exports = {
    name: 'kick',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const data = await schema.findOne({ GuildId: message.guild.id });
        const channelaa = await client.channels.fetch(data.ChannelId);
        const channelsend = client.channels.fetch(channelaa.id).then(channel => channel.send({embeds: [embed]}))
        if(!channelsend) return message.reply('Please setup a log channel for the bot to work properly')
        const reason = args.slice(1).join(' ');
        const user = message.mentions.members.first();
        const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Kicked')
        .setDescription(`${user} was kicked`)
        .addField('Reason', `${reason}`)
        
        if (user) {
            user.kick().then(() => {
                message.channel.send({embeds: [embed]})
                channelsend
            })
        } else {
            message.channel.send('Error member is unknown')
        }

    }
}