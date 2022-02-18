const Levels = require('discord-xp');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    description: 'Shows the leaderboard',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); 
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        if (rawLeaderboard.length < 1) return message.reply('Nobody is in the leaderboard');

        const l = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator} -> Level: ${e.level} -> Xp: ${e.xp.toString()}`); 
        const embed = new MessageEmbed()
            .setColor('#7a46b3') 
            .setTitle('**leaderboard**')
            .setImage('https://gifimage.net/wp-content/uploads/2017/12/jarvis-gif-9.gif')
            .addField('Leaderboard', `${l.join("\n\n")}`)
            message.channel.send({ content: ' ', embeds: [embed] }); 
        
    }
}