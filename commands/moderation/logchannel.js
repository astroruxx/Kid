const {Message, MessageEmbed, MessageActionRow, MessageButton,  Client} = require('discord.js');
const guildData = require('../../model/guildlogs')
module.exports = {
    name: 'logchannelset',
     /**
    * 
    * @param {Client} client 
    * @param {Message} message
    * @param {String[]} args 
    */
    run: async(client, message, args) => {
        const channel = message.mentions.channels.first().id
        if(!channel) return message.reply('Please specify a channel')

        guildData = await guildData.findOne({ Guild: message.guild.id });
    if(!guildData) { 
     let guild = await guildData.create({
      Guild: message.guild.id,
      GuildName: message.guild.name,
      LogChannel: Disabled
    });
    guild.save();
    }
    const channelM = await guildData.findOneAndUpdate(
        {
        Guild: message.guild.id,
        LogChannel: channel
    }
)
channel.save();
 
const channelem = new MessageEmbed()
.setColor('GREEN')
.setTitle('Log channel set')
.setDescription('A log channel is where ban logs and such will be sent.')
       
    message.reply('Log channel updated!')
    channel.send({embeds: [channelem]})
    }
}