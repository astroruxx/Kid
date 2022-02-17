const Discord = require('discord.js')
const client = require("../index");

client.on('messageCreate', async (message) => {
    if(message.content === 'hi') return message.reply('Hi!')
    if (message.content === 'hello') return message.reply('Hi!')
});

   