const {
    MessageEmbed, User, CommandInteraction, Message
} = require('discord.js')
const schema = require('../../model/logs')

module.exports = {
    name: 'ban',
    description: 'Ban a user from the guild',
    options: [{
        name: 'target',
        type: 'USER',
        description: 'Select a user',
        required: true,
    },
    {
        name: 'reason',
        description: 'the reason of banning this member',
        type: 'STRING',
        required: false
    }],
    UserPerms: ['MANAGE MESSAGES'],

    /**
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction, options) => {
        const user = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason') || 'no reason specified'
        const data = await schema.findOne({ GuildId: interaction.guild.id });
        const channelaa = await client.channels.fetch(data.ChannelId);
        let member = interaction.guild.members.cache.get(user.id);
        const embedd = new MessageEmbed()
        .setColor('RED')
        .setTitle('```Api error.catch(e) ban member not specified```')
        .addField('Invalid Argument', 'Please specify a valid member')
        const embed = new MessageEmbed()
        .setTitle(`${user} was banned`)
        .setDescription(`reason: ${reason}`)
        .setColor('GREEN')
        const send = user.send({embeds: [embed]})
        const channelsend = client.channels.fetch(channelaa.id).then(channel => channel.send({embeds: [embed]}))
        if(!channelsend) return interaction.followUp('Please setup a log channel for the bot to work properly')
       

            await member.ban({
                reason: reason,
            }).then(() => {
                interaction.followUp({embeds: [embed]})
                channelsend
                
            })
    }
}