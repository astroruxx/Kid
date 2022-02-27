const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "nickmod",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    function generateRandomString(length) {
        var chars =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.-";
        var random_string = "";
        if (length > 0) {
          for (var i = 0; i < length; i++) {
            random_string += chars.charAt(
              Math.floor(Math.random() * chars.length)
            );
          }
        }
        return random_string;
      }
      
      const random = generateRandomString(9); // how long your password will be -> it is now 9 characters long
      
      password = `mod${random}`;
    if (!member) return message.reply("Please specify a member!");

    try {
      member.setNickname(password);
      message.reply('Nick name was set')
    } catch (err) {
      console.log(err);
      message.reply(
        "I do not have permission to set " + member.toString() + " nickname!"
      );
    }
  },
};