
const Levels = require('discord-xp');
const { MessageFlags, MessageEmbed, Role } = require('discord.js');
const {
    mongooseConnectionString
} = require("../config.json");
const { user } = require('../index');
Levels.setURL(mongooseConnectionString);
const client = require('../index');
    /** 
     * @param {Message} message 
     * @param {String[]} args 
     */
     client.on('message', async (message) =>{
        const user = await Levels.fetch(message.author.id, message.guild.id);
        if(message.content.toLowerCase().includes('https://www.youtube.com/%27')) {
          return
        }
        if(message.content.toLowerCase().includes('https://open.spotify.com/%27')) {
          return
        }
        if (user.level === 10) {
            if(message.content.toLowerCase().includes === 'https://tenor.com/%27') return
        }
        if (!user.level === 10) {
            if(message.content.toLowerCase().includes === 'https://tenor.com/%27') return message.reply('You need level 10 or more for embed perms')
            message.delete()
            
        }
        if(message.content.toLowerCase().includes('discord.gg/')) {
          await message.delete()
          await message.channel.send(`${message.author.username} was warned for posting discord invite links`)
          console.log(`${message.author.tag} was warned in ${message.guild.name} for posting discord invite links`)
          if(!warnings[message.author.id]) warnings[message.author.id] = {
            warnings: 0
          }
          await warnings[message.author.id].warnings++
          await message.author.send(`You have been warned for posting Discord invite links in ${message.guild.name}. Warnings: ${warnings[message.author.id].warnings}`)
        }
        if(message.content.toLowerCase().includes('https://')){
          await message.delete()
          await message.channel.send(`${message.author.username} was warned for posting links`)
          console.log(`${message.author.tag} was warned in ${message.guild.name}`)
          if(!warnings[message.author.id]) warnings[message.author.id] = {
            warnings: 0
          }
          await warnings[message.author.id].warnings++
          await message.author.send(`You have been warned for posting links in ${message.guild.name}. Warnings: ${warnings[message.author.id].warnings}`)
        }
      })