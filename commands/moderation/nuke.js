const { Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')


module.exports = {
    name: 'delete',
    description: 'nukes a channel',
    

    run: async (client, message, args) => {

         const reas=new MessageEmbed()
        .setDescription(`To Use This Command You Need To Have The **MANAGE_MESSAGES** permission.`)
        .setColor('RED')

          const rea=new MessageEmbed()
        .setDescription(`This channel cannot be nuked!.`)
        .setColor('RED')


       if(!message.member.permissions.has('MANAGE_MESSAGES')) 
       return message.channel.send({embeds:[reas]})
     
        let reason = args.join(" ") || "No Reason"
        if(!message.channel.deletable) { 
            return message.reply({embeds:[rea]})
        }
      

        let a = new MessageButton()
        .setCustomId('accept')
        .setStyle('SUCCESS')
          .setEmoji('<:tick:913042728542150667>')

        let b = new MessageButton()
        .setCustomId('decline')
        .setStyle('DANGER')
      .setEmoji('<:wrong:918906350111703090>')
  
        let row = new MessageActionRow().addComponents(a, b)
        const collector = message.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 30000})
      const mssg= await message.channel.send({embeds: [new MessageEmbed().setDescription(`**Are You Sure U Want To Nuke This Channel?** \n **All Message Data Will Be Lost If Nuked** \n\n <:tick:913042728542150667> To Confirm | <:wrong:918906350111703090> To Cancel`)
        .setColor('GREEN')], components: [row]})

        collector.on('collect', async (m) => {
            if (m.customId === 'accept') {
               
                 let newchannel = await message.channel.clone()
        await message.channel.delete()
        let embed = new MessageEmbed()
        .setTitle("Channel Nuked")
        .setDescription(reason)
           .setColor('RED')
        .setImage('https://c.tenor.com/Rl84jpphg7IAAAAC/explosion-space.gif')
        .setFooter(`Nuked by ${message.author.tag}`);
     
      
        await newchannel.send({embeds:[embed]})
            }

                     if (m.customId === 'decline') {
                         message.react("✅") 
                       collector.stop('success')
                  mssg.delete()
                       
        let embed = new MessageEmbed()
      
        .setDescription(`<:wrong:918906350111703090>| The Process Has Been Cancelled`)
           .setColor('RED')
     
     
      
        await message.channel.send({embeds:[embed]})
            }
          
        })
    }
}
