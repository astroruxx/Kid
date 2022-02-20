const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const warndb = require('../../../model/warndb')

module.exports = {
    name: 'warnings',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {

        const user = message.mentions.members.first() || message.author.id;

        warndb.findOne({
            guild: message.guild.id, 
            user: user.id
        }, async (err, data) => {
            if (err) throw err
            if (data) {
                const e = data.content.map(
                    (w, i) => `\n\`${i + 1}\` - Moderator: ${message.guild.members.cache.get(w.moderator).user.tag}, Reason: ${w.reason}`
                )
                const embed = new MessageEmbed()
                    .setDescription(e.join(' '))
                    .setColor('GREEN')
                message.channel.send({
                    embeds: [embed]
                })
            }
        }) 

    }
}