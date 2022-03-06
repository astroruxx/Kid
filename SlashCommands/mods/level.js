const Levels = require('discord-xp');
const { Client, Message, MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    description: 'Shows the leaderboard',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        if (message.channel.id !== '947336675292483614') return message.followUp('please use this command in a bot command channel')
        else{            const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); 
            const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
            if (rawLeaderboard.length < 1) return message.followUp('Nobody is in the leaderboard');
    
            const l = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator} -> Level: ${e.level} -> Xp: ${e.xp.toString()}`); 
            const embed = new MessageEmbed()
                .setColor('#7a46b3') 
                .setTitle('**leaderboard**')
                .addField('Leaderboard', `${l.join("\n\n")}`)
                message.followUp({ embeds: [embed] }); }

            
          
        
        }
    }
