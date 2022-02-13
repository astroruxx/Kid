const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'ban',
    UserPerms: ['MODERATE_MEMBERS'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {

        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ');
        if (!reason) return message.channel.send('I need a valid reason.');

        if (user) {
            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(reason)
            .setTitle(`<a:9992rgbcatshrug:938633982256508940> Banned ${user.id}`)

            await user.ban({
                reason: reason,
            }).then(() => {
                message.reply({embeds: [embed]})
            })

        } else {
            message.channel.send('could not find the specified person')
        }

    }
}