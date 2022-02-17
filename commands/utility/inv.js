const { Message, Client, MessageEmbed } = require("discord.js");
const { user } = require("../..");

module.exports = {
    name: "invite",
    aliases: ['inv'],
    UserPerms: ['MUTE_MEMBERS'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Permanent Invite Link')
        .setDescription(`<@!${message.author.id}> the link is https://discord.gg/4GACXhWXC9`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        console.log('Invite link was given to ' + message.author.id)
        
        message.reply({
            
            embeds: [embed]
        })
    },
};
