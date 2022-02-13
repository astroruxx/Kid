const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('ws ping')
        .setDescription(`${client.ws.ping} ws ping`)
        .setTimestamp()
        message.reply({
            content: 'ws ping',
            embeds: [embed]
        })
    },
};
