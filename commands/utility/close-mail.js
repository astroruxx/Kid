const { Message, Client } = require("discord.js");
const modmailClient = require("../../client/modmail");

module.exports = {
    name: "close",
    aliases: ['mod'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const reason = args.join(" ") || 'no reason';

        modmailClient.deleteMail({ channel: message.channel.id, reason})
    },
};