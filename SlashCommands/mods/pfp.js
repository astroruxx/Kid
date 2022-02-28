const {
    MessageEmbed, User
} = require('discord.js')

module.exports = {
    name: 'pfps',
    description: 'rules about pfps',
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
            <a:developer_badge1:809416687207710760> No blank profile pictures.
            No inappropriate profile pictures.
            No sexually explicit profile pictures.
            No offensive profile pictures.
            go to <#938485403437117494>`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
        
        await interaction.followUp({
            embeds: [embed]
        }); 
    }
}