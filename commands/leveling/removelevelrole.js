const Discord = require("discord.js");
const { MessageEmbed, Permissions } = require("discord.js");
let xp = require('simply-xp')
let db = require("quick.db")

module.exports = {
  name: "removelevelrole",
  category: "configuration",
    aliases: ["xp-r-r"],
    description: 'remove level up roles',
    usage:'<leveling role name>',
  run: async (client, message, args) => {
 if (db.has(`lvllol_${message.guild.id}`)){

if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
        let embed = new MessageEmbed()
        .setDescription(`You dont have the \`MANAGE_CHANNELS\` permission`)
        .setColor("#F04A47")
    return message.channel.send({ embeds: [embed] })
      }

      if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      const embed = new MessageEmbed()
        .setDescription(`**I do not have \`MANAGE_ROLES\` permissions**`)
        .setColor(red)
      return message.channel.send({ embeds: [embed] })
      }
   
if(!args[0]){
  let WrongEmbed = new MessageEmbed()
        .setDescription("Please Provide the level number")
        .setColor("#F04A47")
    return message.channel.send({ embeds: [WrongEmbed] })
}

if(!Number(args[0])) {
  let embed = new MessageEmbed()
        .setDescription(`Please provide a valid level number`)
        .setColor("#F04A47")
    return message.channel.send({ embeds: [embed] })
}

xp.lvlRole(message, message.author.id, message.guild.id) 

  xp.roleSetup
    .remove(client, message.guild.id, {
      level: args[0]
    })
    .then((l) => {
      if (l) {
         let RightEmbed = new MessageEmbed()
      .setDescription(`Successfully removed role`)
.setColor("#43B581")
      message.channel.send({embeds:[RightEmbed]})
      }
    })
    .catch((e) => {
      message.reply({ content: `Error: ${e}` })
    })
 }else{
    let WrongEmbed = new MessageEmbed()
        .setDescription("This server does not have levelling set up")
        .setColor("#F04A47")
    return message.channel.send({ embeds: [WrongEmbed] })
 }
  }
}