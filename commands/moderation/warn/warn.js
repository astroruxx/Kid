const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const warndb = require('../../../model/warndb');
const fs = require('fs')
const ms = require('ms')

module.exports = {
    name: 'warn',
    UserPerms: ['MODERATE_MEMBERS'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!user) return message.reply('Mention a valid user')
        const reason = args.slice(1).join(" ")
        if (!reason) return message.reply('Tell me a reason')

        warndb.findOne({
            guild: message.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new warndb({
                    guild: message.guild.id,
                    user: user.user.id,
                    content: [{
                        moderator: message.author.id,
                        reason: reason
                    }]
                })
            } else {
                const object = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.content.push(object)
            }
            data.save()

        })
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${user.user.username} you have been warned for ${reason}`)
        .setDescription('if you keep up this behavior you will be kicked or banned')
        const channelembed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`${user.displayName}, warned by ${message.author.tag}`)
        .setDescription(`Reason: ${reason}`)
        const dmembed = new MessageEmbed()
        .setColor('YELLOW')
        .setTitle(`${message.author.tag} has warned you`)
        .setDescription(`You have been warned`)
        .addField('Reason', `${reason}`)
        const SendEm = await message.channel.send({embeds: [embed]});
        message.delete()
        setTimeout(() => {
            SendEm.delete()
             }, 10000);
        client.channels.fetch('938485405429411906').then(channel => channel.send({embeds: [channelembed]}))
        await user.send({embeds: [dmembed]})
        
    var warnsJSON = JSON.parse(fs.readFileSync('/Users/someone/Documents/GitHub/Captain-America/warnInfo.json'))
            

        if(!warnsJSON[message.author.id]) {
            warnsJSON[message.author.id] = {
                warns: 0
            }

            fs.writeFileSync('/Users/someone/Documents/GitHub/Captain-America/warnInfo.json' , JSON.stringify(warnsJSON))
        }

        warnsJSON[message.author.id].warns += 1
        fs.writeFileSync('/Users/someone/Documents/GitHub/Captain-America/warnInfo.json' , JSON.stringify(warnsJSON))


        setTimeout(function() {

            warnsJSON[message.author.id].warns -= 1
            fs.writeFileSync('/Users/someone/Documents/GitHub/Captain-America/warnInfo.json' , JSON.stringify(warnsJSON))
        }, ms('24h')) 

        if(Number.isInteger(warnsJSON[message.author.id].warns / 3)) {
            const mutedEm = new MessageEmbed()
            .setColor('RED')
            .setDescription(`**${message.member.user.username}** has been muted.`)
            .addField('**Reason**', 'continous infractions')
            msg.channel.send({embeds: [mutedEm]})

            const muteRole = message.guild.roles.cache.find(r => r.name.toString() === '『🔇』Muted')
            const user = message.member
            user.roles.add(muteRole.id)

            const yougotmuted = new MessageEmbed()
            .setColor('RED')
            .setTitle(`You have been muted in ${message.guild.name}`)
            .setDescription('[AutoMod] You have been muted')
            .addField('Reason' , 'Multiple AutoMod Infractions')
            .addField('Expires' , '2h')

            try {

                message.author.send({embeds: [yougotmuted]})

            }catch(err) {

            }

            setTimeout(function () {
                user.roles.remove(muteRole.id)
            }, ms('2h'));
        
        }
    return;
    }
    }