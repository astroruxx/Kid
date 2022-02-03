const client = require("../index");
const {Discord, MessageEmbed} = require('discord.js')

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    let command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    
    if (!command) command = client.commands.get(client.aliases.get(cmd)) // I have already added it, then add
    if (command) {
        const embed = new MessageEmbed()
        .setTitle('You do not have the permissions required')
        .setDescription(`You need \`${command.UserPerms || []}\` Permissions`)
        // User Perms
        if (!message.member.permissions.has(command.UserPerms || [])) return message.reply({embeds: [embed]}) // Added this

        // Bot Perms
        if (!message.guild.me.permissions.has(command.BotPerms || [])) return message.channel.send(`I need \`${command.BotPerms || []}\` Permissions`)

        await command.run(client, message, args, Discord) // <= discord over there
    }

})

