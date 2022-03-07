const client = require('../../index')
const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'purge',
    aliases: ['clear'],
    UserPerms: ['MANAGE_MESSAGES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        try {
            let delamount = args[0];
            if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply('```Error, Please specify amount of messages that need to be cleared```')

            const error = new MessageEmbed()
            .setTitle('Error')
            .setDescription('```API ERROR.CATCH(e)```')
            .addField('Invalid Argument', 'Please specify a valid amount ```1-99')
            .setColor('RED')
            if (parseInt(delamount) > 100) return message.reply({embeds: [error]}); console.log('error, user tried to purge over 100 messages')

            await message.channel.bulkDelete(parseInt(delamount) + 1, true);
            const embed = new MessageEmbed()
            .setTitle('```Deleted Messages```')
            .setColor(`GREEN`)
            .setDescription('The following amount of messages have been purged ```' + delamount + '```')

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