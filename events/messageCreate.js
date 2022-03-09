const client = require("../index");
const {MessageEmbed, Discord} = require("discord.js")
const guildData = require('../model/guildlogs')

client.on("messageCreate", async (message) => {
    try{
        guildData = await guildModel.findOne({ Guild: message.guild.id });
        if(!guildData) { 
          let guild = await guildModel.create({
              Guild: message.guild.id,
              GuildName: message.guild.name,
              LogChannel: Disabled
        });
        guild.save();
        }
        
        } catch (err) {
        return console.log(err);
        }
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

        
       
    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
    if (!command) return 
    if (command) {
        
        if (!message.member.permissions.has(command.UserPerms || [])) return message.channel.send(`You need \`${command.UserPerms || []}\` Permissions`) 

       
        if (!message.guild.me.permissions.has(command.BotPerms || [])) return message.channel.send(`I need \`${command.BotPerms || []}\` Permissions`)

        await command.run(client, message, args, Discord)
    } 
})