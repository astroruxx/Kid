const { MessageEmbed } = require("discord.js");
const client = require('../index')
const chalkAnimation = require('chalk-animation');
//Rainbow
chalkAnimation.rainbow('fps added');

client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === '943694582347071488'){
        if(reaction.emoji.name === '2706verifypastelblue') {
            const embed = new MessageEmbed()
            await reaction.message.guild.members.cache.get(user.id).roles.add('938485402656981029')
            const cool = new MessageEmbed()
            .setTitle(`you obtained a role in **base**`)
            .setDescription(`member role has been given to you`)
            .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
            user.send({embeds: [cool]})
        }
    }
})