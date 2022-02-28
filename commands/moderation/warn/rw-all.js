const { MessageEmbed } = require('discord.js');
const db = require('../../../model/warndb')

module.exports = {
    name: 'remove-all-warns',
    aliases: ['rw-all', 'rwa'],
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send('User not found.')
        const rwaembed = new MessageEmbed()
        .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
        .setTitle(`Deleted all of <@!${user.id}> \'s warnings`)
        .setColor('RED')
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`<@!${user.id}>`)
        .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
        .setDescription('This user does not have any warnings')
        db.findOne({
            guild: message.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await db.findOneAndDelete({
                    user: user.user.id,
                    guild: message.guild.id
                })
                await message.reply({embeds: [rwaembed]})
         // lets try it :D
    }
    else {
        message.reply({embeds: [embed]})
    }
})
    }
}