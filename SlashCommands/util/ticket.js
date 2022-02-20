const simplydjs = require("simply-djs")
const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'setup-ticket',
    aliases: ['ticket'],
   description: 'setup ticket command',
    run: async(client, message, args) => {

simplydjs.ticketSystem(message, message.channel);
 }
}