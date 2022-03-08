const Levels = require('discord-xp');
const { MessageFlags, MessageEmbed, Role } = require('discord.js');
const {
    mongooseConnectionString
} = require("../../config.json");
const { user } = require('../../index');
Levels.setURL(mongooseConnectionString);
const client = require('../../index');
    /** 
     * @param {Message} message 
     * @param {String[]} args 
     */
    module.exports = {
        name: 'level-set',
        UserPerms: ['ADMINISTRATOR'],

        run: async(client, message, args) => {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            const target = message.mentions.users.first()
            const number = args.slice(1).join(' ');
            const hasLevelUp = await Levels.setLevel(target.id, message.guild.id, number);
            if(!number) return message.reply('what is the amount of the levels?')
            if (!target) return message.reply('who is getting the levels?')
            hasLevelUp.target
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`📲 added ${number} levels to user`)

            message.reply({embeds: [embed]})
        }
    }