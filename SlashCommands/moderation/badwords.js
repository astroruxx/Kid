const schema = require('../../model/guild-schema')
const discord = require('discord.js')

module.exports.run = async (Client, inter) => {
    if(!inter.member.permissions.has(discord.Permissions.FLAGS.MANAGE_MESSAGES)) return inter.reply("You dont have enough permissions")

    const choice = inter.options.getString("action")
    const word = inter.options.getString('word')
    
    let data;
    try {
        data = await schema.findOne({ guildId: inter.guild.id })
        if(!data) {
            data = await schema.create({ guildId: inter.guild.id })
        }
    } catch (error) {
        console.log(error)
    }

    if(choice == 'add') {
        const wordToBeAdded = word.toLowerCase()
        if(data.BLW.includes(wordToBeAdded)) return inter.reply('This word is already in the bad words list!')

        inter.reply(`Successfully added \`${word}\` to the bad words list!`)
        data.BLW.push(wordToBeAdded)
        await data.save()
    }

    if(choice == 'remove') {
        const wordToBeAdded = word.toLowerCase()
        if(!data.BLW.includes(wordToBeAdded)) return inter.reply('This word is already not in the bad words list!')
        let array = data.BLW

        array = array.filter(x => x !== wordToBeAdded)
        data.BLW = array
        inter.reply(`Successfully remove \`${word}\` from the bad words list!`)

        await data.save()
    }


}

module.exports.help = {
   name: 'badwords'
}