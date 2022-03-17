const {Message, MessageEmbed, MessageActionRow, MessageButton,  Client} = require('discord.js');
const schema = require('../../model/mute')
module.exports = {
    name: 'set-muterole',
    aliases: ['mute-role', 'smr'],
    UserPerms: ['ADMINISTRATOR'],
     /**
    * 
    * @param {Client} client 
    * @param {Message} message
    * @param {String[]} args 
    */
    run: async(client, message, args) => {
        const chan = message.mentions.roles.first()
        if(!chan) return message.reply('Please specify a channel')
        const moderator = message.author.id
        let data;
        try {
           data = await schema.findOne({ GuildId:message.guild.id })
           if(!data) {
              data = await schema.create({ GuildId: message.guild.id, MuteRole: chan.id})
           }
           if(data) {
              data = await schema.findOneAndUpdate({ MuteRole: chan.id})
           }
           await data.save()
        } catch(e) {
           console.log(e)
           message.reply('An Error has occured please try again at a later time.')
        }
        
        
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('MuteRole was set')
        .setDescription(`MuteRole was set to ${chan}`)
    message.reply({embeds: [embed]})
    }
}