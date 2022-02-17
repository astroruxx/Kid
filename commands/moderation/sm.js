const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission('MANAGE_MESSAGES')) 
        return message.channel.send("You need `MANAGE_MESSAGES` permission to execute this command.");
    const messageArray = message.content.split(' ');
    const args = messageArray.slice(1);

    if (!args[1] == null) {
        message.channel.setRateLimitPerUser(args[0])
        message.channel.send(`Slowmode is now ${args[0]}s`)
    }
    if (args[1] == null) {
        return message.channel.send("You need to specify time in seconds!")
    };
};

module.exports.config = {
    name: "sm",
    aliases: []
}
