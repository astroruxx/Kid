const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'execute',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {

        const user = message.mentions.members.first();
        if (!user) {
            message.channel.send('user was not found')
        }
        const reason = args.slice(1).join(' ');
        if (!reason) return message.channel.send('Why should I execute this user?');
        const embed = new MessageEmbed()
        .setTitle(`${user.displayName} was executed`)
        .setColor('RANDOM')

        if (user) {

            await user.ban({
                reason: reason,
            }).then(() => {
                message.reply({embeds: [embed]})
                user.send({embeds: [embed]})
            })

        } else {
            message.author.send('Could not execute the user mentioned please mention a valid user. `>execute @<user.id/user.@> <reason>`')
        }

    }
}