const {MessageEmbed} = require('discord.js')


module.exports = {
    name: 'rules',
    UserPerms: ['MANAGE_MESSAGES'],

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Rules')
        .setDescription(`No blank nicknames.
        No inappropriate nicknames.
        No sexually explicit nicknames.
        No offensive nicknames.
        No nicknames with unusual or unreadable Unicode.
        No blank profile pictures.
        No inappropriate profile pictures.
        No sexually explicit profile pictures.
        No offensive profile pictures.
        No underaged individuals(under 13)
        Moderators reserve the right to change nicknames.
        Moderators reserve the right to use their own discretion regardless of any rule.
        No exploiting loopholes in the rules (please report them).
        No DMing other members of the server.
        Rules apply to DMing other members of the server.
        No inviting unofficial bots.
        No bugs, exploits, glitches, hacks, bugs, etc.
        Text chat rules
        No questioning the mods.
        No @mentioning the mods.
        No asking to be granted roles/moderator roles.
        @mention the moderators for support.
        Contact the moderators under #channel for support.
        No @everyone/@here mentioning without permission.
        No @mentioning spam.
        No NSFW content.
        No illegal content.
        No piracy.
        No modding.
        No homebrew.
        No hacking.
        No publishing of personal information (including real names, addresses, emails, passwords, bank account and credit card information, etc.).
        No personal attacks.
        No witch hunting.
        No harassment.
        No sexism.
        No racism.
        No hate speech.
        No offensive language/cursing.
        No religious discussions.
        No sexual discussions.
        No flirting.
        No trolling.
        No spamming.
        No excessive messaging (breaking up an idea in many posts instead of writing all out in just one post).
        No walls of text (either in separate posts or as a single post).
        Keep conversations in English.
        Moderators reserve the right to delete any post.
        Moderators reserve the right to edit any post.
        No advertisement.
        No advertisement without permission.
        No links.
        No linking to other servers.
        No memes.
        No pictures.
        No gifs.
        No bot commands.
        Bot commands only under #channel.
        List of allowed bot commands:
        No channel hopping.
        No offtopic/use the right text channel for the topic you wish to discuss.
        Voice chat rules
        No annoying, loud or high pitch noises.
        Reduce the amount of background noise, if possible.
        Moderators reserve the right to disconnect you from a voice channel if your sound quality is poor.
        Moderators reserve the right to disconnect, mute, deafen, or move members to and from voice channels.`)
       .setColor('NAVY')
       .setImage('https://i.imgur.com/g9TQKal.png')
        message.channel.send({
            embeds: [embed]
        })
    },
};

