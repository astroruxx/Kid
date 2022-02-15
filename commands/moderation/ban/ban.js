const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'execute',
    UserPerms: ['MODERATE_MEMBERS'],
    aliases: ['ban', 'destroy'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {

        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ');
        const embedd = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('I need the id or <@> of  user and a reason of why you would like me to execute them')
        .setDescription('execute format: `>execute <@user> <reason>`')
        if (!reason || !user) return message.channel.send({embeds: [embedd]});
        const embed = new MessageEmbed()
        .setTitle(`${user.displayName} was banned`)
        .setDescription(`reason: ${reason}`)
        .setColor('RANDOM')
        .setImage(`${user.displayAvatarURL({dynamic: true})}`)
        const send = user.send({embeds: [embed]})
        if (user) {

            await user.ban({
                reason: reason,
            }).then(() => {
                message.reply({embeds: [embed]})
                send
            })
            if (!send) {
                return ('could not send message.this user')
            }
            }

        }  
        }


