const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Ws Ping')
        .setDescription(`${client.ws.ping}ms!`)
        interaction.followUp({ embeds: [embed] });
    },
};
