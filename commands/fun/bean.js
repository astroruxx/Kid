const {Message, MessageEmbed} = require('discord.js');
const client = require('../../index')
module.exports = {
    name: 'bean',
    UserPerms: ['MANAGE_MESSAGES'],
    run: async(client, message, args) => {

    const userem = new MessageEmbed()
    .setColor('RED')
    .setTitle(message.author.username +' you beaned yourself noob')
    const user = message.mentions.members.first();
    if (!user) return message.reply({embeds: [userem]});
    const bean = new MessageEmbed()
    .setColor('RED')
    .setTitle(`Beaned ${user.displayName} .`)
    message.reply({ embeds: [bean]})
    user.send('you were beaned u noob');
    }
}