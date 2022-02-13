const {
    MessageEmbed, User
} = require('discord.js')

module.exports = {
    name: 'nicknames',
    description: 'rules about nicknames',
    options: [{
        name: 'target',
        type: 'USER',
        description: 'Select a user',
        required: true,
    }],
    UserPerms: ['MANAGE MESSAGES'],
    run: async (client, interaction, options) => {
        const user = interaction.options.getUser('target')

        const embed = new MessageEmbed()
            .setTitle(`Nickname Rules`)
            .setColor('RANDOM')
            .setDescription(`
            No blank nicknames.
            No inappropriate nicknames.
            No sexually explicit nicknames.
            No offensive nicknames.
            No nicknames with unusual or unreadable Unicode.
            go to <#938485403437117494>`)
            .setFooter("@" + user.id)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
        
        await interaction.followUp({
            embeds: [embed]
        }); 
    }
}