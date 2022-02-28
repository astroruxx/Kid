const { Message, Client, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { user } = require("../..");

module.exports = {
    name: "socials",
    aliases: ['sl'],
    UserPerms: ['MUTE_MEMBERS'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const but = new MessageActionRow().addComponents(new MessageButton()
        .setLabel('Website')
        .setStyle('LINK')
        .setURL('https://astroruxx.github.io')).addComponents(new MessageButton()
        .setLabel('Youtube')
        .setURL('https://www.youtube.com/channel/UCRvdoWRuIFmwnDuhCgmWbZQ')
        .setStyle("LINK"))
     
        const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Socials') 
        .setDescription('Click Buttons to View Socials')     
        message.channel.send({components: [but], embeds: [embed]})
    }
};
