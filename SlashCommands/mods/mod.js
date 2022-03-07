const { Client, Message, MessageEmbed, Interaction, CommandInteraction } = require("discord.js");
const { Command } = require("reconlx");
module.exports = {
  name: "mod",
    description: 'if a user has a unpingable username use this command',
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'the user thats username will be changed',
            required: true
        }
    ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.options.getUser('user');
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
    if (!member) return message.followUp({embeds: [membernotfound]})

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
      message.member.setNickname(password);
      message.followUp({embeds: [nicknameset]});
    } catch (err) {
      console.log(err);
      message.followUp(
        "I do not have permission to set " + member.toString() + " nickname!"
      );
    }
  },
};