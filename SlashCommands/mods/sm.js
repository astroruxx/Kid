const {MessageEmbed, Message, Client, CommandInteraction, Interaction} = require('discord.js')

module.exports = {
    name: 'slowmode',
    description: 'set the slowmode of the current channel',
    UserPerms: ['MANAGE_MESSAGES'],
    options: [
        {
            name: 'arg',
            type: 'INTEGER',
            description: 'the number of slowmode',
            required: true
        }
    ],
        /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const sm = message.options.getInteger('arg')
        const tomuch = new MessageEmbed()
        .setColor('RED')
        .setTitle('```catch(e) console.log(e)```')
        .setDescription('Slowmode not valid')
        .addField('**Reason**', '```Slowmode to high.```')
        .addField('Valid Sm:', '```1-21600s```')
        const negative = new MessageEmbed()
        .setColor('RED')
        .setTitle('```catch(e) console.log(e)```')
        .setDescription('Slowmode not valid')
        .addField('**Reason**', '```Slowmode can not be negative```')
        .addField('Valid Sm:', '```1-21600s```')
        const valid = new MessageEmbed()
        .setColor('RED')
        .setTitle('```catch(e) console.log(e)```')
        .setDescription('Slowmode not valid')
        .addField('**Reason**', '```Slowmode  is not a integer```')
        .addField('Valid Sm:', '```1-21600s```')
        message.channel.setRateLimitPerUser(sm)

        

        const embed = new MessageEmbed()
        .setTitle(`Slowmode Set to \`${sm}\` seconds`)
        .setColor('GREEN')
        message.followUp({embeds: [embed],ephemeral: true})
    }
}