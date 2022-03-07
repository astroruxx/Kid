const {Message, MessageEmbed} = require('discord.js');
const client = require('../../index')
module.exports = {
    name: 'purr',
    UserPerms: ['MANAGE_MESSAGES'],
    run: async(client, message, args) => {
    const user = message.mentions.members.first();
    if (!user) return message.reply(`pounce, purrrrrr on ${message.author.username} <:blushie:947336675175063612>`)
    message.reply({content: `pounce, purrrrrr on ${user} <:blushie:947336675175063612>`})
    }
}