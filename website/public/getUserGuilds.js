const Client = require("../../index")
const schema = require('../../model/dashboard')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require("../../config.json");
const { Permissions } = require('discord.js');

module.exports = {
    name: "/getUserGuilds/",
    run: async (req, res) => {
        delete require.cache[require.resolve("../html/getUserGuilds.ejs")];

        if (!req.cookies.token) return res.redirect('/login')
        let decoded;
        try {
            decoded = jwt.verify(req.cookies.token, jwt_secret);
        } catch (e) {}
        if (!decoded) res.redirect("/login");

        let data = await schema.findOne({
            _id: decoded.uuid,
            userID: decoded.userID
        });
        if (!data) res.redirect("/login");

        let guildArray = await process.oauth.getUserGuilds(data.access_token);
        let mutualArray = [];
        guildArray.forEach(g => {
            g.avatar = `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`;
            if (Client.guilds.cache.get(g.id)) {
                const bitPermissions = new Permissions(g.permissions_new);
                if (bitPermissions.has(Permissions.FLAGS.MANAGE_GUILD) || bitPermissions.has(Permissions.FLAGS.ADMINISTRATOR) || Client.guilds.cache.get(g.id).ownerId == data.userID) g.hasPerm = true
                mutualArray.push(g);
            } else g.hasPerm = false;
        });
        let args = {
            avatar: `https://cdn.discordapp.com/avatars/${data.userID}/${data.user.avatar}.png`,
            username: data.user.username,
            discriminator: data.user.discriminator,
            id: data.user.userID,
            loggedIN: true,
            guilds: guildArray,
            adminGuilds: mutualArray
        };

        res.render("./website/html/getUserGuilds.ejs", args);

    }
}