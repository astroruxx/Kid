const { Client, Mess, MessageEmbed, Message, Interaction } = require('discord.js');
const axios = require("axios");
const client = require('../..');

module.exports = {
    name: 'meme',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let res = await axios.default.get(
            `https://www.reddit.com/r/memes/random/.json`
        );
        if(!res || !res.data || !res.data.length)
        message.reply('an error occured')
        res = res.data[0].data.children[0].data;
        const embed = new MessageEmbed()
        .setTitle(res.title)
        .setImage(res.url)
        .setURL(`https://www.reddit.com${res.permalink}`)
            .setFooter(`👍 ${res.up} 💬 ${res.num_comments}`);
        message.reply({
            embeds: [embed]
        })
    
    }
}