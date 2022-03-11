const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: "userinfo",
  description: "User",
  cooldowns: 3000,
  aliases: ["ui"],
  botpermissions: ["EMBED_LINKS"],

  run: async (client, message, args) => {    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!user) return message.reply('Invalid user')
    const roles = user.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1)
    let oldStr = `${user.roles.highest.hexColor}`
    let hex = newStr = oldStr.substring(1);
    if (oldStr == '#000000') oldStr = '#4B0082';
    let bot = user.user.bot ? "<a:gearspinning:915029055034785803> Bot" : "<:members:915028797609353286> Human";

    const devices = user.presence?.clientStatus || {};
    const description = () => {
      const entries = Object.entries(devices)
      .map(
        (value, index) => 
        `${value[0][0].toUpperCase()}${value[0].slice(1)}`
        )
      .join(" | ");
      const appareil = entries ? `\n[${Object.entries(devices).length}] **Devices:** ${entries}` : ""
      return `${appareil}`;
    };

    async function getUserBannerUrl(userId) {
      const user = await client.api.users(userId).get();
      return user.banner ? `https://cdn.discordapp.com/banners/${userId}/${user.banner}.${user.banner.startsWith("a_") ? "gif" : "png"}?size=4096` : null;
  }
  
      let mentionedUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
   
      const bannerUrl = await getUserBannerUrl(mentionedUser.id,({dynamic: true,  size: 4096 }));

      const banner = bannerUrl ? ` | [**Banner link**](${bannerUrl})` : ``;

    const status = {
      "online": '<:en_ligne:915024656426217542> Online',
       "idle": '<:inactif:915024656145199155> Idle',
       "dnd": '<:ne_pas_deranger:915024656195534859> DND',
       "offline": '<:hors_ligne:915024655620907010> Offline'
     }

     const badges = {
      DISCORD_EMPLOYEE: `<:staff_badge:915024656250044457>`,
      PARTNERED_SERVER_OWNER: `<:partner_badge:915024655641886790>`,
      BUGHUNTER_LEVEL_1: `<:discord_bug_hunter_lv1:915024656224886834>`,
      BUGHUNTER_LEVEL_2: `<:discord_bug_hunter_lv2:915024656346521620>`,
      HYPESQUAD_EVENTS: `<:badge_hypesquad:915024655776096307>`,
      HOUSE_BRAVERY: `<:hypesquad_bravery:915024656224911360>`,
      HOUSE_BRILLIANCE: `<:hypesquad_briliance:915024655880970281>`,
      HOUSE_BALANCE: `<:hypesquad_balance:915024656245878816>`,
      EARLY_SUPPORTER: `<:discord_early_supporter:915024655998402590`,
      TEAM_USER: `Team User`,
      SYSTEM: `<:verified_system:915024655859990568>`,
      VERIFIED_BOT: `<:bot_tag:915024656510119936>`,
      EARLY_VERIFIED_BOT_DEVELOPER: `<:bot_developpeur_verifie:915024656052924536>`
    };
         
    const UserFlags = (await user.user.fetchFlags()).toArray().map(flag => badges[flag]).join("\n ")
    const UserBadges = UserFlags ? `**Badges:** ${UserFlags}` : "\n";
        var permissions = [];

    if(user.permissions.has("KICK_MEMBERS")){
     permissions.push("Kick Members");
 }
 
 if(user.permissions.has("BAN_MEMBERS")){
     permissions.push("Ban Members");
 }
 
 if(user.permissions.has("ADMINISTRATOR")){
     permissions.push("Administrator");
 }

 if(user.permissions.has("MANAGE_MESSAGES")){
     permissions.push("Manage Messages");
 }
 
 if(user.permissions.has("MANAGE_CHANNELS")){
     permissions.push("Manage Channels");
 }
 
 if(user.permissions.has("MENTION_EVERYONE")){
     permissions.push("Mention Everyone");
 }

 if(user.permissions.has("MANAGE_NICKNAMES")){
     permissions.push("Manage Nicknames");
 }

 if(user.permissions.has("MANAGE_ROLES")){
     permissions.push("Manage Roles");
 }

 if(user.permissions.has("MANAGE_WEBHOOKS")){
     permissions.push("Manage Webhooks");
 }

 if(user.permissions.has("MANAGE_EMOJIS_AND_STICKERS")){
     permissions.push("Manage Emojis");
 }

let compte = user.user.bot ? "of the bot" : `of the user` 
const pseudo = user.user.displayName ? `(${user.user.displayName})` : "";

    const permission = permissions.join(', ') ? `**Permissions:** ${permissions.join(', ')}` : "\n";

    const Reponse = new MessageEmbed()
    .setAuthor({ name: `Information about ${user.user.username}`, iconURL: `${user.user.displayAvatarURL({ dynamic: true, size: 1024 })}`})
    .setThumbnail(user.user.displayAvatarURL({ size: 2048, dynamic: true}))
    .setImage(bannerUrl)
    .setColor(`${oldStr}`)
    .addFields(
      {
        name: `<:info:935670309091176518> **Information ${compte}:**`, 
        value: `**Username:** ${
          user.user.username
        }${pseudo}\n**Tag:** ${
          user.user.discriminator
        }\n**Mention:**<@${
          user.user.id
        }>\n**User ID ${compte}:** ${
          user.user.id
        }\n**Account type:** ${
          bot
        }\n**Links:** [**Avatar link**](${user.user.displayAvatarURL({ size: 2048, dynamic: true})})${banner}\n**Account creation:** 
<t:${Math.floor(user.user.createdTimestamp / 1000)}:D> <t:${Math.floor(user.user.createdTimestamp / 1000)}:R>\n**Statut:** ${
          status[user.presence?.status] || "<:hors_ligne:915024655620907010> Offline"
        }${description()}
        ${UserBadges}\n` 
      },
      {
        name: `<:info:935670309091176518> **Information ${compte} on the server**`,
        value: `**Server member since:** 
<t:${Math.floor(user.joinedTimestamp / 1000)}:D> <t:${Math.floor(user.joinedTimestamp / 1000)}:R>\n**Highest role:** ${
          user.roles.highest
        }\n**Role color:** [${
          user.roles.highest.hexColor}](https://www.color-hex.com/color/${hex
          })\n`},{
          name: `[${user.roles.cache.size - 1}] **Rôle(s):**`,
    value: `${roles.length == 0 ? "Rien" : roles.length < 10 ? roles.join('') : roles.length > 10 ? trimArray(roles) : roles
         }\n\n${permission}\n\n`
     })    
    .setTimestamp()   
        .setFooter({ text: `Userinfo`})

        const row = new MessageActionRow()
        
                .addComponents(
                    new MessageButton()
                        .setLabel('Avatar')
                        .setStyle('LINK')
                        .setURL(user.user.displayAvatarURL({ size: 2048, dynamic: true }))
                       )
                       if(bannerUrl) { row.addComponents(
                        new MessageButton()
                        .setLabel('Banner')
                        .setStyle('LINK')
                        .setURL(`${bannerUrl}`)
                       )}

    message.reply({ embeds: [Reponse], components: [row] });
    
    function trimArray(arr, maxLen = 10){
        if(arr.length > maxLen){
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(` **${len} other...**`);
        }
        return arr;
    }
  }
}
