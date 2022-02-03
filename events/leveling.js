const Levels = require('discord-xp');
const { MessageFlags, MessageEmbed, Role } = require('discord.js');
const {
    mongooseConnectionString
} = require("../config.json");
const { user } = require('../index');
Levels.setURL(mongooseConnectionString);
const client = require('../index');

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    const randomxp = Math.floor(Math.random() * 10) + 1; // this is the amoumt of xp it will give.. so it will give random number from 0 to 10 multiple by 10 and adding 1.. u can reduce this.. by changing the 12 to smth else..
    const hasLevelUp = await Levels.appendXp(message.author.id, message.guild.id, randomxp);
    if (hasLevelUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        if(user.level == 1){
            message.member.roles.add('938527120295092294')
        }
        if(user.level == 5){
            message.member.roles.add('938530276160716820')
            message.member.roles.remove('938527120295092294')
        }
        if(user.level == 10){
            message.member.roles.remove('938530276160716820')
            message.member.roles.add('938526979420995615')
        }

        if(user.level == 15){
            message.member.roles.remove('938526979420995615')
            message.member.roles.add('938531722813923338')
        }
        if(user.level == 20){
            message.member.roles.add('938526979420995615')
            message.member.roles.remove('938531723510157352')
        }
        if(user.level == 30){
            message.member.roles.remove('938526979420995615')
            message.member.roles.add('938531724160286790')
        }
        const embed = new MessageEmbed()
    .setTitle(`${message.author.id}`)
    .setDescription(`Congrats you have leveled up to **\`${user.level}\`**🎉`)
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        message.reply({ embeds: [embed]})
        }
}) 
