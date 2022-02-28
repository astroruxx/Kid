const {MessageEmbed} = require('discord.js');

module.exports = {
name: 'unlock',
UserPerms: ['MANAGE_CHANNELS'],
/**
 * 
 * @param {Client} client 
 * @param {Message} message
 * @param {String[]} args 
 */

run: async(client, message, args) => {
    const role = message.guild.roles.everyone; 

    if (!args.length) return message.reply('Mention a channel!');
    if(!message.mentions.channels.first()) message.reply("Please specify a valid channel!")

    await message.mentions.channels.forEach(async channel => {

        if(!channel.name.startsWith('🔒')) return message.reply(`**${channel.name}** is already unlocked!`)

        await channel.setName(`${channel.name.substring(1)}`)

        try {

            channel.permissionOverwrites.create(role, {

                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,

            })
            const embed = new MessageEmbed()
            .setTitle('Channel Unlocked')
            .setColor('GREEN')
       
            .addField(`${channel.name} | \`${channel.id}\` was unlocked`, 'ㅤ')
           
            .addField(`This channel was unlocked by:`, `${message.author}`)
            .setFooter(`channel has been unlocked`)
            
            message.channel.send({embeds: [embed]})
           
        } catch (err) {
            console.log(err)
            message.reply('Unlock failed, something went wrong.')
        }
        }
    )}}