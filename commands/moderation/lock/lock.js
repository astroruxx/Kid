const {MessageEmbed} = require('discord.js');

module.exports = {
name: 'lock',
UserPerms: ['MANAGE_CHANNELS'],
/**
 * 
 * @param {Client} client 
 * @param {Message} message
 * @param {String[]} args 
 */

run: async(client, message, args) => {
    const role = message.guild.roles.everyone; 
    let reason = args.slice(2).join(' ');
    if (!reason) reason = "no reason specified"; 
    if (!args.length) return message.reply('Mention a channel!');
    if(!message.mentions.channels.first()) message.reply("Please specify a valid channel!")

    await message.mentions.channels.forEach(async channel => {

        if(channel.name.startsWith('🔒')) return message.reply(`**${channel.name}** is already locked!`)

        await channel.setName(`🔒${channel.name}`)

        try {

            channel.permissionOverwrites.create(role, {

                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: false,

            })
            const embed = new MessageEmbed()
            .setTitle('Channel Locked')
            .setColor('GREEN')
            .addField(`${channel.name} | \`${channel.id}\` was locked`, 'ㅤ')
            .addField(`The reason for this was:`, `${reason}`)
            .addField(`This channel was locked by:`, `${message.author}`)
            .setFooter(`You are not muted, please wait a bit for staff to unlock channel`)
            
            message.channel.send({embeds: [embed]})
            
        } catch (err) {
            console.log(err)
            message.reply('Lockdown failed, something went wrong.')
        }
    })}}