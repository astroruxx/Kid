const { CommandInteraction, Client, MessageEmbed, Intents } = require("discord.js");
const { Canvas, resolveImage } = require('canvas-constructor')
const canvas = require('canvas')

module.exports = {
    name: "rickroll",
    description: "rickroll someone",
    type: 'CHAT_INPUT',

    options: [
        {
            name: "user",
            description: "User to rickroll",
            type: 'USER',
            required: true,
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const member = interaction.options.getUser('user') 
        const user1 = member.id
      
 let pfp = await resolveImage(member.displayAvatarURL({
            format: "png",
            size: 128
        }))

const background = await resolveImage('https://i.imgur.com/cRNVEOI.jpg');

let rickroll = new Canvas(1192, 624)
    .printImage(background, 0, 0, 1192, 624)
    .printCircularImage(pfp, 607, 86, 100, 100)
    .toBuffer(); 



     interaction.followUp({content: `Rickrolled <@${user1}>`,  files: [rickroll]})




    }
}