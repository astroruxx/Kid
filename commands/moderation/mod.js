const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "mod",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    function generateRandomString(length) {
        var chars =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
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
      const random = generateRandomString(11); 
      password = `modded ${random}`;
    if (!member) return message.reply({embeds: [membernotfound]})

      const membernotfound = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle('Api Error')
      .setDescription('```Error was caught```')
      .addField('Reason', '```Member Not Specified```')
      const nicknameset = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle('The nickname was set')
      .setDescription('Nickname: ```' + password + '```')
    try {
      member.setNickname(password);
      message.reply({embeds: [nicknameset]});
    } catch (err) {
      console.log(err);
      message.reply(
        "I do not have permission to set " + member.toString() + " nickname!"
      );
    }
  },
};