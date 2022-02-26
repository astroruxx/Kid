const {MessageEmbed} = require('discord.js')


module.exports = {
    name: 'fan',
    UserPerms: ['MANAGE_MESSAGES'],

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Fan Art Info')
        .setDescription('These are the rules for posting fan art in this server')
        .addField('Posting: ', `If you would like to post some shiny new art you have to \n#1 prove the art is yours (by creating a timeslapse),
        #2 DM a member with the role <@&938485402698936474>\n#3 Do not post ||nfsw|| art`)
        message.channel.send({embeds: [embed]})
    }
}