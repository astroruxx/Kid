const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
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
        const button = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel('Website')
            .setURL('https://astroruxx.github.io')
            .setStyle('LINK'),
            new MessageButton()
            .setLabel('Discord Invite')
            .setURL('https://discord.gg/Cbm8eUNV5n')
            .setStyle('LINK'))
        const embed = new MessageEmbed()
        .setTitle('Permanent Invite Link')
        .setDescription(`<@!${message.author.id}> press the **discord invite** button for the link`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        console.log('Invite link was given to ' + message.author.id)
        
        message.reply({
            components: [button],
            embeds: [embed]
        })
    },
};
