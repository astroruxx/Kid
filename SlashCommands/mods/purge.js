const client = require('../../index')
const {
    Client,
    Message,
    MessageEmbed,
    CommandInteraction
} = require('discord.js');

module.exports = {
    name: 'purge',
    UserPerms: ['MANAGE_MESSAGES'],
    description: 'purge messages in the channel',
    options: [
        {
            name: 'amount',
            type: 'INTEGER',
            description: 'the amount of messages you would like to be deleted',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const amount = message.options.getInteger('amount')
        try {
            let delamount = args[0];
            if (isNaN(amount) || parseInt(amount <= 0)) return message.followUp('```Error, Please specify amount of messages that need to be cleared```')

            const error = new MessageEmbed()
            .setTitle('Error')
            .setDescription('You can not delete over 100 messages')
            .setColor('RED')
            if (parseInt(amount) > 100) return message.followUp({embeds: [error]})

            await message.channel.bulkDelete(parseInt(amount) + 1, true);
            const embed = new MessageEmbed()
            .setTitle('```Deleted Messages```')
            .setColor(`GREEN`)
            .setDescription('The following amount of messages have been purged ```' + amount + '```')

            await message.channel.send({
                embeds: [embed]
            }).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000) 
            })
        } catch (e) {
            console.log(e)
        } 
    }
}