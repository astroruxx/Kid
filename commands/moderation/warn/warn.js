const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const warndb = require('../../../model/warndb');

module.exports = {
    name: 'warn',
    UserPerms: ['MODERATE_MEMBERS'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!user) return message.reply('Mention a valid user')
        const reason = args.slice(1).join(" ")
        if (!reason) return message.reply('Tell me a reason')

        warndb.findOne({
            guild: message.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new warndb({
                    guild: message.guild.id,
                    user: user.user.id,
                    content: [{
                        moderator: message.author.id,
                        reason: reason
                    }]
                })
            } else {
                const object = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.content.push(object)
            }
            data.save()

        })
        const embed = new MessageEmbed()
        .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
        .setColor('RANDOM')
        .setTitle(`${user.id} you have been warned for ${reason}`)
        .setDescription('if you keep up this behavior you will be kicked or banned')
        const dmembed = new MessageEmbed()
        .setTitle(`${user.id} has warned you`)
        .setDescription(`reason: ${reason}`)
        .setColor('RANDOM')
        .setImage(`${user.displayAvatarURL({dynamic: true})}`)

        message.channel.send({embeds: [embed]})
        client.channels.fetch('937071230190768167').then(channel => channel.send({embeds: [embed]}))
        user.send({embeds: [dmembed]})

    }
}