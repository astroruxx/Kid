const Discord = require("discord.js");
const { MessageEmbed, Permissions } = require("discord.js");
let xp = require('simply-xp')
let db = require("quick.db")

module.exports = {
  name: "levelrewards",
  category: "configuraton",
  aliases: ["rolerewards"],
  description: 'add level up roles',
  usage: '<level number> <role id>',
  run: async (client, message, args) => {
    if (db.has(`lvllol_${message.guild.id}`)) {

     const hehe = new MessageEmbed()
     .setDescription("This Server Currently Does Not Have Any Level Roles")
     .setColor("RANDOM")

      xp.roleSetup.fetch(client, message.guild.id).catch(err => {
        message.channel.send({ embeds: [hehe] })
      })
      xp.roleSetup.fetch(client, message.guild.id).then((data) => {

        const roleData = data.map((e) => `${message.guild.roles.cache.get(e.role)} • ${e.lvl}`).join("\n")

        const reward = new MessageEmbed()
          .setTitle("[ Role Rewards ]")
          .setDescription(`${roleData}`)
          .setColor("RANDOM")

        message.channel.send({ embeds: [reward] })

      })

    } else {
      let WrongEmbed = new MessageEmbed()
        .setDescription("This server does not have levelling enabled.")
        .setColor("#F04A47")
      return message.channel.send({ embeds: [WrongEmbed] })
    }
  }
}