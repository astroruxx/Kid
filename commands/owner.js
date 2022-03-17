const { Message, Client, MessageEmbed, MessageButton, MessageActionRow, MessageFlags } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ['setup'],
    UserPerms: ['MUTE_MEMBERS'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const admin = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('ADMIN COMMANDS')
        .setDescription('The main focus of this bot was functionality and moderation, The owner personaly has take responsibility\nto **make one of the best anti link and raid systems**')
        const util = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('UTILITY COMMANDS')
        .setDescription('**Here at astroruxx.github.io we care about acesibility and we thrive for the succesion of our supporters, The owner and his developers have made utility commands\nPress the button to see all the information on the commands**')

        const adminrow = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Commands Help')
            .setStyle('LINK')
            .setURL('https://astroruxx.github.io/admin.html')

        )
        const utilrow = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Commands Help')
            .setStyle('LINK')
            .setURL('https://astroruxx.github.io/utility.html')

        )
            if(message.content.toLowerCase().includes('admin')) return message.reply({embeds: [admin], components: [adminrow]})
            if(message.content.toLowerCase().includes('mod')) return message.reply({embeds: [admin], components: [adminrow]})
            if(message.content.toLowerCase().includes('utility')) return message.reply({embeds: [util], components: [utilrow]})
            message.reply('Please specify a categoty for me to search the results of') 
    }
};



