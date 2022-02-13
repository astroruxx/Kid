const Levels = require('discord-xp');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    description: 'Shows the leaderboard',
    BotPerms: ["SEND_MESSAGES", "VIEW_CHANNELS", "SEND_MESSAGES_IN_THREAD", "EMBED_LINKS"], 
    emoji: '👑',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); 
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        const naembed = new MessageEmbed()
        .setTitle(`${user} there is nobody in the leaderboard, or/and this command is malifunctioning`)
        if (rawLeaderboard.length < 1) return message.reply({embeds: [naembed]});

        const l = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator} -> Level: ${e.level} -> Xp: ${e.xp.toString()}`); 
        const embed = new MessageEmbed()
            .setColor('#7a46b3') 
            .setTitle('**leaderboard**')
            .setImage('https://gifimage.net/wp-content/uploads/2017/12/jarvis-gif-9.gif')
            .addField('Leaderboard', `${l.join("\n\n")}`)
            message.channel.send({ content: ' ', embeds: [embed] }); 
        
    }
}