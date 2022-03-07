const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'kick',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
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
            })
        } else {
            message.channel.send('Error member is unknown')
        }

    }
}