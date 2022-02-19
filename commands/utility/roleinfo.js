const {MessageEmbed, Message, Client} = require('discord.js')

module.exports = {
    name: 'rl',
    UserPerms: ['MANAGE_MESSAGES'],
    aliases: ['slowmode', 'slow'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        let role; 

        if (!args[0]) return message.reply('you need to provide a role, name, id') 
    
        if(args[0] && isNaN(args[0]) && message.mentions.roles.first()) role = message.mentions.roles.first()
    
        if(args[0] && isNaN(args[0]) && !message.mentions.roles.first()){ 
    
          
          role = message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim()) 
    
          
          if(!message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim())) return message.reply("Role not found!")
        }
    
       
        if(args[0] && !isNaN(args[0])){
    
          
          role = message.guild.roles.cache.find(e => e.id == args[0])
    
          
          if(!message.guild.roles.cache.has(args[0])) return message.reply("This role id is invalid!")
        }
      
      
        if(!role) return message.reply("You must mention a role, give ID, or say the name!")
    
    
      let WithRole; 
    
      
      if(role.members.size > 5) WithRole = role.members.map(e => `<@${e.id}>`).slice(0,5).join(", ") + ` and ${role.members.size - 5} more members...` 
    
     
      if(role.members.size < 5) WithRole = role.members.map(e => `<@${e.id}>`).join(", ")
        
    
        let embed = new MessageEmbed()
        .setColor(role.color)
        .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL()})
        .setDescription(`**Role Name:** ${role.name}, (<@&${role.id}>)
        **Role ID:** **\`${role.id}\`**
        **Role Mentionable:** ${role.mentionable.toString().replace("true","Yes").replace("false","No")}
        **Role Members Size:** ${role.members.size || 0}`)
    
      .addField("Role Members:",WithRole ? WithRole : "No one has the role yet!")
      
        message.channel.send({embeds: [embed]}) 
    }
}