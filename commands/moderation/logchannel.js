const {Message, MessageEmbed, MessageActionRow, MessageButton,  Client} = require('discord.js');
const schema = require('../../model/logs')
module.exports = {
    name: 'logchannel',
     /**
    * 
    * @param {Client} client 
    * @param {Message} message
    * @param {String[]} args 
    */
    run: async(client, message, args) => {
        const chan = message.mentions.channels.first()
        if(!chan) return message.reply('Please specify a channel')
        const moderator = message.author.id
        let data;
        try {
           data = await schema.findOne({ GuildId:message.guild.id })
           if(!data) {
              data = await schema.create({ GuildId: message.guild.id, ChannelId: chan.id})
           }
           if(data) {
              data = await schema.findOneAndUpdate({ ChannelId: chan.id})
           }
           await data.save()
        } catch(e) {
           console.log(e)
           message.reply('An Error has occured please try again at a later time.')
        }
        
        
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Log channel was set')
        .setDescription(`Log channel was set to ${chan}`)
    message.reply({embeds: [embed]})
    }
}